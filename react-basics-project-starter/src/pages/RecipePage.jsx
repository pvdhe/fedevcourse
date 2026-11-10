import { useEffect } from 'react';
import { Badge, Box, Button, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';

// App geeft het geselecteerde recept en de functie voor teruggaan door via props.
export const RecipePage = ({ recipe, onBack }) => {
    // Na het openen van de detailpagina scrollen we naar de bovenkant.
    // De lege dependency-array laat dit effect bij het laden draaien.
    // StrictMode kan het effect tijdens ontwikkeling een extra keer uitvoeren.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Dit zijn de sleutels van de zes gevraagde voedingsstoffen in totalNutrients.
    const nutrientKeys = ['ENERC_KCAL', 'PROCNT', 'FAT', 'CHOCDF', 'CHOLE', 'NA'];

    return (
        // Op mobiel houden we meer ruimte over voor tekst; op desktop blijft de leesbreedte beperkt.
        <Box as="main" maxW="1200px" mx="auto" px={{ base: '4', md: '8' }} py={{ base: '6', md: '10' }} overflowWrap="anywhere" lineHeight="tall" color="fg">
            {/* De terugknop laat App de selectie weer op null zetten. */}
            <Button onClick={onBack} mb="8" minH="44px" w={{ base: '100%', sm: 'auto' }} colorPalette="orange" variant="outline" borderRadius="full" bg="bg.panel">← Back to recipes</Button>

            {/* Op desktop vormen de foto en receptinformatie samen een introductie in twee kolommen. */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '6', md: '10' }} alignItems="center" mb="10">
                {/* De afbeelding vult de breedte en krijgt op mobiel een lagere hoogte. */}
                <Image src={recipe.image} alt={recipe.label} w="100%" h={{ base: '260px', md: '420px' }} objectFit="cover" borderRadius="2xl" />

                <Box minW="0">
                    <Text color="orange.fg" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" mb="3">From the Winc kitchen</Text>
                    <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} letterSpacing="tight" lineHeight="short" mb="5">{recipe.label}</Heading>

                    {/* join maakt leesbare tekst van de arrays met maaltijd- en gerechtsoorten. */}
                    <Text color="fg.muted" mb="2">Meal type: {recipe.mealType.join(', ')}</Text>
                    <Text color="fg.muted" mb="5">Dish type: {recipe.dishType.join(', ')}</Text>

                    {/* Een tijd van 0 betekent dat de bereidingstijd niet beschikbaar is. */}
                    <SimpleGrid columns={2} gap="3" mb="5">
                        <Box p="4" bg="bg.panel" borderWidth="1px" borderColor="border" borderRadius="xl">
                            <Text fontSize="xs" color="fg.muted" mb="1">Total cooking time</Text>
                            <Text fontWeight="bold">{recipe.totalTime > 0 ? `${recipe.totalTime} minutes` : 'N/A'}</Text>
                        </Box>
                        <Box p="4" bg="bg.panel" borderWidth="1px" borderColor="border" borderRadius="xl">
                            <Text fontSize="xs" color="fg.muted" mb="1">Servings</Text>
                            <Text fontWeight="bold">{recipe.yield}</Text>
                        </Box>
                    </SimpleGrid>

                    {/* Bij ontbrekende dieetlabels of waarschuwingen tonen we een duidelijke melding. */}
                    <Text mb="2" fontSize="sm">Diet: {recipe.dietLabels.length > 0 ? recipe.dietLabels.join(', ') : 'N/A'}</Text>
                    <Box p="3" bg="orange.subtle" color="orange.fg" borderRadius="lg" fontSize="sm">
                        <Text fontWeight="medium">Cautions: {recipe.cautions.length > 0 ? recipe.cautions.join(', ') : 'None listed'}</Text>
                    </Box>
                </Box>
            </SimpleGrid>

            {/* Gezondheidslabels mogen doorlopen naar de volgende regel, ook op 320px. */}
            <Box mb="8" p={{ base: '5', md: '6' }} bg="bg.panel" borderWidth="1px" borderColor="border" borderRadius="2xl">
                <Heading as="h2" fontSize="lg" mb="4">Health labels</Heading>
                <Flex flexWrap="wrap" gap="2">
                    {recipe.healthLabels.map((label) => (
                        <Badge key={label} colorPalette="green" variant="subtle" px="3" py="1" borderRadius="full" whiteSpace="normal">{label}</Badge>
                    ))}
                    {recipe.healthLabels.length === 0 && <Text color="fg.muted">N/A</Text>}
                </Flex>
            </Box>

            {/* Ingrediënten en voedingswaarden staan op mobiel onder elkaar. */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="6" alignItems="start">
                <Box p={{ base: '5', md: '7' }} bg="bg.panel" borderWidth="1px" borderColor="border" borderRadius="2xl" minW="0">
                    <Heading as="h2" fontSize="2xl" letterSpacing="tight" mb="5">Ingredients</Heading>
                    {/* ingredientItems bevat de oorspronkelijke ingrediëntregels met vaste IDs.
                        Ook identieke regels hebben zo elk hun eigen stabiele React-key.
                        Box met as="ul" en as="li" maakt een lijst via Chakra-componenten. */}
                    <Box as="ul" pl="5" css={{ '& li': { marginBottom: '0.75rem' } }}>
                        {recipe.ingredientItems.map((ingredient) => (
                            <Box as="li" key={ingredient.id}>{ingredient.text}</Box>
                        ))}
                    </Box>
                </Box>

                <Box bg="bg.panel" borderWidth="1px" borderColor="border" borderRadius="2xl" p={{ base: '5', md: '7' }} minW="0">
                    <Heading as="h2" fontSize="2xl" letterSpacing="tight" mb="2">Total nutrients</Heading>
                    <Text mb="5" fontSize="sm" color="fg.muted">For the whole recipe ({recipe.yield} servings).</Text>
                    {/* De voedingswaarden zijn totalen voor het hele recept, niet per portie.
                        We tonen de eenheid uit de data en ronden de hoeveelheid af op één decimaal.
                        Ook deze lijst gebruikt uitsluitend Chakra-componenten. */}
                    <Box as="ul" listStyleType="none">
                        {nutrientKeys.map((key) => {
                            const nutrient = recipe.totalNutrients[key];

                            return (
                                <Flex as="li" key={key} justify="space-between" gap="3" flexWrap="wrap" py="3" borderBottomWidth="1px" borderColor="border">
                                    <Text color="fg.muted">{nutrient.label}</Text>
                                    <Text fontWeight="bold">{nutrient.quantity.toFixed(1)} {nutrient.unit}</Text>
                                </Flex>
                            );
                        })}
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
};
