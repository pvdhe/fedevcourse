import { Box, Text } from '@chakra-ui/react';
import { PageContainer, PageIntro } from '../components/PageLayout';

// Eenvoudige derde pagina op /about, bereikbaar via de gedeelde navigatie.
// Voor dit checklistpunt is alleen een informatieve tekst nodig.
export const AboutPage = () => (
    <PageContainer>
        {/* Dezelfde component voorkomt afwijkende marges en titelopmaak tussen de pagina's. */}
        <PageIntro kicker="A little about Winc Events" title="About Us" />
        {/* De informatiekaart gebruikt dezelfde kleuren, rand en afronding als de overzichtskaarten. */}
        <Box
            bg="bg.panel"
            p={{ base: '6', md: '8' }}
            borderWidth="1px"
            borderColor="border"
            borderRadius="2xl"
            maxW="720px"
            shadow="sm"
        >
            <Text color="fg.muted" fontSize="lg">
                This page is currently under construction.
            </Text>
        </Box>
    </PageContainer>
);
