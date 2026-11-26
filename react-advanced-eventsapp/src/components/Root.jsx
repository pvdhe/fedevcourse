import { Outlet, useLoaderData, useNavigation, useRevalidator } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Box, Text } from '@chakra-ui/react';
import { Toaster } from './ui/toaster';
import { EventsProvider } from '../context/EventsContext';
import { EventsPageLoading } from './EventsLoading';

// Gedeelde indeling voor het overzicht, de detailpagina en de informatiepagina.
export const Root = () => {
    // De hoofdroute heeft de evenementen en categorieën opgehaald, ook bij een direct geopend detailadres.
    const initialData = useLoaderData();
    const navigation = useNavigation();
    const { state: revalidationState } = useRevalidator();
    // Ook bij opnieuw ophalen blijven er placeholders zichtbaar in plaats van een lege pagina.
    const loading = navigation.state === 'loading' || revalidationState === 'loading';
    return (
        // De navigatiemodal en alle pagina's vallen binnen dezelfde gegevensprovider.
        <EventsProvider initialData={initialData}>
            {/* De dynamische schermhoogte volgt ook de beschikbare ruimte op mobiele browsers. */}
            <Box minH="100dvh" display="flex" flexDirection="column" bg="bg" color="fg" colorPalette="blue">
                <Navigation />
                {/* Outlet toont de onderliggende pagina die bij het huidige adres hoort. */}
                <Box flex="1">{loading ? <EventsPageLoading /> : <Outlet />}</Box>
                {/* Net als in de receptenapp sluit een rustige footer iedere pagina af. */}
                <Box
                    as="footer"
                    borderTopWidth="1px"
                    borderColor="border"
                    mt="8"
                    py="6"
                    px="4"
                    textAlign="center"
                >
                    <Text fontSize="sm" color="fg.muted">
                        Winc Events · 2026
                    </Text>
                </Box>
                {/* De gedeelde Toaster toont onder andere de bevestiging na het toevoegen. */}
                <Toaster />
            </Box>
        </EventsProvider>
    );
};
