import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ColorModeButton } from './components/ui/color-mode';
import { RecipeListPage } from './pages/RecipeListPage';
import { RecipePage } from './pages/RecipePage';

export const App = () => {
    // null betekent dat de gebruiker nog geen recept heeft geselecteerd.
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    return (
        // Semantische kleuren zoals bg, fg en border passen zich aan het thema aan.
        // Deze achtergrond vult ook bij weinig inhoud minimaal het hele scherm.
        <Box minH="100vh" bg="bg" color="fg" colorPalette="orange">
            {/* De sitenaam Winc Recipes staat links en alleen de themaknop rechtsboven. */}
            <Box as="header" borderBottomWidth="1px" borderColor="border" bg="bg.panel">
                <Flex maxW="1200px" mx="auto" px={{ base: '4', md: '8' }} minH="76px" align="center" justify="space-between" gap="2">
                    <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
                        <Box as="span" color="orange.fg">Winc</Box> Recipes
                    </Text>
                    <ColorModeButton />
                </Flex>
            </Box>

            {/* Bij een selectie tonen we de details, anders het overzicht.
                onBack wist de selectie; onSelectRecipe bewaart het gekozen recept. */}
            {selectedRecipe ? (
                <RecipePage recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />
            ) : (
                <RecipeListPage onSelectRecipe={setSelectedRecipe} />
            )}

            {/* Een eenvoudige footer sluit beide pagina's visueel af. */}
            <Box as="footer" borderTopWidth="1px" borderColor="border" mt="8" py="6" px="4" textAlign="center">
                <Text fontSize="sm" color="fg.muted">Winc Recipes · A little inspiration for every table.</Text>
            </Box>
        </Box>
    );
};
