import { useState } from 'react';
import { Badge, Box, Button, Flex, Heading, Icon, Image, Input, NativeSelect, SimpleGrid, Text } from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';
import { data } from '../utils/data';

// Via deze prop geven we het gekozen recept door aan de state in App.
export const RecipeListPage = ({ onSelectRecipe }) => {
    // De state bewaart de tekst die de gebruiker in het zoekveld typt.
    const [searchTerm, setSearchTerm] = useState('');

    // Een lege keuze betekent dat er geen extra dieetfilter actief is.
    const [selectedDiet, setSelectedDiet] = useState('');

    // We negeren hoofdletters en spaties aan het begin en einde van de zoektekst.
    const searchText = searchTerm.trim().toLowerCase();

    // filter bewaart recepten waarvan de naam OF een gezondheidslabel overeenkomt.
    // includes zoekt ook op een deel van de tekst; een lege zoektekst past bij elke naam.
    const filteredRecipes = data.hits.filter((hit) => {
        const recipe = hit.recipe;
        const matchesName = recipe.label.toLowerCase().includes(searchText);

        // some geeft true terug zodra minstens één gezondheidslabel overeenkomt.
        // We doorzoeken alle gezondheidslabels, ook als de kaart ze niet toont.
        const matchesHealthLabel = recipe.healthLabels.some(
            (label) => label.toLowerCase().includes(searchText)
        );

        // Het dieetfilter vergelijkt een volledig gezondheidslabel, bijvoorbeeld Vegan.
        // De data gebruikt de Engelse spelling Pescatarian voor pescetarisch.
        const matchesDiet = selectedDiet === '' || recipe.healthLabels.includes(selectedDiet);

        // Het recept moet bij de zoektekst EN bij de gekozen dieetoptie passen.
        return (matchesName || matchesHealthLabel) && matchesDiet;
    });

    return (
        // base geldt ook op 320px; vanaf md gebruiken we ruimere marges.
        // anywhere laat uitzonderlijk lange woorden afbreken binnen de beschikbare breedte.
        <Box as="main" maxW="1200px" mx="auto" px={{ base: '4', md: '8' }} py={{ base: '6', md: '10' }} overflowWrap="anywhere" color="fg">
            {/* Een grotere introductie en oranje accent sluiten aan bij CSS-Advanced. */}
            <Box py={{ base: '4', md: '8' }} mb="6" maxW="720px">
                <Text color="orange.fg" fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" mb="4">
                    The Winc Recipes collection
                </Text>
                <Heading as="h1" fontSize={{ base: '4xl', md: '6xl' }} letterSpacing="tight" lineHeight="1.08" mb="5">
                    Good food.
                    <Box as="span" display="block" color="orange.fg">For every table.</Box>
                </Heading>
                <Text color="fg.muted" fontSize={{ base: 'md', md: 'lg' }} maxW="560px" lineHeight="tall">
                    Find your next favorite meal. Explore our recipes and discover something that suits your taste and dietary preferences.
                </Text>
            </Box>

            {/* Het label is gekoppeld aan het zoekveld. onChange werkt de state bij,
                waarna React de lijst opnieuw met de huidige zoektekst weergeeft. */}
            {/* Op desktop staan de velden naast elkaar; op mobiel onder elkaar. */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="5" mb="8" p={{ base: '5', md: '6' }} bg="bg.panel" borderWidth="1px" borderColor="border" borderRadius="2xl" shadow="sm">
                <Box minW="0">
                    <Text as="label" htmlFor="recipe-search" display="block" mb="2" fontWeight="medium">
                        Search by recipe name or health label
                    </Text>
                    <Input
                        id="recipe-search"
                        type="search"
                        placeholder="Try chicken or vegan"
                        bg="bg.panel"
                        minH="44px"
                        fontSize="md"
                        w="100%"
                        minW="0"
                        borderRadius="lg"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </Box>

                {/* Deze Chakra-keuzelijst werkt naast het bestaande zoekveld.
                    Ook de opties gebruiken een Chakra-component via as="option". */}
                <Box minW="0">
                    <Text as="label" htmlFor="diet-filter" display="block" mb="2" fontWeight="medium">
                        Filter by diet
                    </Text>
                    <NativeSelect.Root size="lg" w="100%">
                        <NativeSelect.Field
                            id="diet-filter"
                            value={selectedDiet}
                            onChange={(event) => setSelectedDiet(event.target.value)}
                            bg="bg.panel"
                            color="fg"
                            minW="0"
                            borderRadius="lg"
                        >
                            <Box as="option" value="">All recipes</Box>
                            <Box as="option" value="Vegan">Vegan</Box>
                            <Box as="option" value="Vegetarian">Vegetarian</Box>
                            <Box as="option" value="Pescatarian">Pescetarian</Box>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Box>
            </SimpleGrid>

            {/* Het aantal resultaten helpt bij het combineren van zoeken en filteren. */}
            <Flex align="baseline" justify="space-between" gap="3" flexWrap="wrap" mb="5">
                <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} letterSpacing="tight">Explore the recipes</Heading>
                {/* Bij één resultaat gebruiken we het enkelvoud van recipe. */}
                <Text fontSize="sm" color="fg.muted" role="status">
                    {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
                </Text>
            </Flex>

            {/* Geef uitleg wanneer geen enkel recept bij de zoektekst past. */}
            {filteredRecipes.length === 0 && (
                <Text role="status" p="4" bg="bg.muted" borderRadius="md">No recipes found. Try another search or diet filter.</Text>
            )}

            {/* Op kleine schermen staat er één kaart per rij, op grotere meer. */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '4', md: '6' }}>
                {/* map maakt alleen kaarten voor de recepten die door het filter komen. */}
                {filteredRecipes.map((hit) => {
                    const recipe = hit.recipe;

                    // We bewaren alleen de twee gezondheidslabels uit de opdracht.
                    const healthLabels = recipe.healthLabels.filter(
                        (label) => label === 'Vegan' || label === 'Vegetarian'
                    );

                    return (
                        // De receptnamen zijn uniek en dienen als key voor React.
                        // Kaarten in dezelfde rij zijn even hoog; de actie staat telkens onderaan.
                        <Box as="article" key={recipe.label} position="relative" display="flex" flexDir="column" minW="0" bg="bg.panel" borderWidth="1px" borderColor="border" borderRadius="2xl" overflow="hidden" shadow="sm" _hover={{ borderColor: 'orange.fg', shadow: 'md' }}>
                            {/* De alt-tekst beschrijft de afbeelding met de receptnaam. */}
                            <Image src={recipe.image} alt={recipe.label} w="100%" h={{ base: '210px', md: '230px' }} objectFit="cover" />

                            <Flex p={{ base: '5', md: '6' }} lineHeight="tall" flexDir="column" flex="1">
                                {/* Maaltijd- en gerechtsoort vormen een rustige regel boven de naam. */}
                                <Text fontSize="xs" color="fg.muted" textTransform="uppercase" letterSpacing="wide" mb="2">
                                    {recipe.mealType.join(', ')} · {recipe.dishType.join(', ')}
                                </Text>
                                <Heading as="h3" fontSize="xl" lineHeight="short" mb="4">{recipe.label}</Heading>

                                {/* Badges maken de dieet- en gezondheidslabels sneller scanbaar. */}
                                <Flex gap="2" flexWrap="wrap" mb="3">
                                    {recipe.dietLabels.map((label) => (
                                        <Badge key={label} colorPalette="orange" variant="subtle" borderRadius="full" px="3" py="1" whiteSpace="normal">{label}</Badge>
                                    ))}
                                    {healthLabels.map((label) => (
                                        <Badge key={label} colorPalette="green" variant="subtle" borderRadius="full" px="3" py="1" whiteSpace="normal">{label}</Badge>
                                    ))}
                                </Flex>
                                {recipe.cautions.length > 0 && (
                                    <Text mb="4" fontSize="sm" color="fg.muted">Cautions: {recipe.cautions.join(', ')}</Text>
                                )}

                                {/* Deze knop ligt transparant over de hele kaart.
                                    Een echte knop werkt ook met Tab, Enter en de spatiebalk. */}
                                <Button
                                    position="absolute"
                                    inset="0"
                                    w="100%"
                                    h="100%"
                                    variant="plain"
                                    borderRadius="2xl"
                                    cursor="pointer"
                                    aria-label={`View recipe: ${recipe.label}`}
                                    onClick={() => onSelectRecipe(recipe)}
                                    _focusVisible={{ outline: '3px solid', outlineColor: 'orange.fg', outlineOffset: '-3px' }}
                                />
                                <Flex mt="auto" pt="4" borderTopWidth="1px" borderColor="border" justify="space-between" align="center" color="orange.fg" fontWeight="bold" fontSize="sm">
                                    <Text>View recipe</Text>
                                    {/* Een lijnicoon gebruikt de huisstijlkleur en wordt niet als gekleurde emoji weergegeven. */}
                                    <Icon as={LuArrowRight} boxSize="5" color="orange.fg" aria-hidden="true" />
                                </Flex>
                            </Flex>
                        </Box>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};
