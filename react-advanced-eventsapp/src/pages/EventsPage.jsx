import { useState } from 'react';
import {
    Badge,
    Box,
    Checkbox,
    Field,
    Flex,
    Heading,
    Icon,
    Image,
    Input,
    Link,
    NativeSelect,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';
import { Link as RouterLink } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import { PageContainer, PageIntro } from '../components/PageLayout';

// Overzichtspagina op het adres /.
// De Context deelt de opgehaalde gegevens en verwerkt ook wijzigingen uit de modals.
export const EventsPage = () => {
    const { events, categories } = useEvents();
    const [searchText, setSearchText] = useState('');
    // Chakra Checkbox.Group bewaart de gekozen categorie-IDs als strings.
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    // Bij het openen staat het overzicht standaard op titel van A naar Z.
    const [sortOrder, setSortOrder] = useState('title-asc');

    // Filter de al opgehaalde evenementen tijdens het typen; er is geen extra API-verzoek nodig.
    // trim en toLowerCase negeren buitenste spaties en verschillen in hoofdletters.
    const searchTerm = searchText.trim().toLowerCase();
    const filteredEvents = events.filter((event) => {
        const matchesSearch =
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm);
        // Geen selectie laat alle categorieën toe. Bij meerdere keuzes is één overeenkomst genoeg.
        // String zorgt dat numerieke IDs uit de API overeenkomen met de checkboxwaarden.
        const matchesCategory =
            selectedCategoryIds.length === 0 ||
            event.categoryIds.some((id) => selectedCategoryIds.includes(String(id)));

        // Een evenement moet zowel aan de zoektekst als aan het categoriefilter voldoen.
        return matchesSearch && matchesCategory;
    });

    // Sorteer een kopie van de zoek-/filterresultaten; de gedeelde Context blijft ongewijzigd.
    // Vergelijk datums als tijdstempels en titels zonder verschil tussen hoofd- en kleine letters.
    // numeric sorteert getallen in titels natuurlijk: bijvoorbeeld Event 2 vóór Event 10.
    const sortedEvents = [...filteredEvents].sort((first, second) => {
        const titleOrder = first.title.localeCompare(second.title, 'en', { sensitivity: 'base', numeric: true });
        if (sortOrder === 'title-desc') return -titleOrder;
        // Gelijke starttijden krijgen een vaste alfabetische volgorde.
        if (sortOrder === 'start-asc') return Date.parse(first.startTime) - Date.parse(second.startTime) || titleOrder;
        if (sortOrder === 'start-desc') return Date.parse(second.startTime) - Date.parse(first.startTime) || titleOrder;
        return titleOrder;
    });

    // Zet de UTC-tijd uit de API om naar een leesbare datum en tijd in de tijdzone van de browser.
    // De Engelse notatie sluit aan op de taal van de interface.
    const formatDateTime = (value) =>
        new Date(value).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });

    return (
        // De gecentreerde inhoud, grote introductie en kaarten sluiten aan op de receptenapp.
        <PageContainer>
            {/* Deel de introductieopmaak met About Us; alleen de inhoud verschilt. */}
            <PageIntro
                kicker="The Winc Events collection"
                title={<>Good moments.<Box as="span" display="block" color="brand.fg">Great company.</Box></>}
            >
                <Text color="fg.muted" fontSize={{ base: 'md', md: 'lg' }} maxW="560px" lineHeight="tall">
                    Find something to enjoy together. Explore sports, games and relaxing activities, or share
                    an event of your own.
                </Text>
            </PageIntro>

            {/* Het filterpaneel heeft dezelfde rustige kaartopmaak als de eerdere projecten. */}
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap="6"
                mb="10"
                p={{ base: '5', md: '6' }}
                bg="bg.panel"
                borderWidth="1px"
                borderColor="border"
                borderRadius="2xl"
                shadow="sm"
            >
                {/* Zoeken en sorteren staan samen; op mobiel vult elk veld de beschikbare breedte. */}
                <Stack gap="5" minW="0">
                    {/* Een zichtbaar label maakt het doel van het zoekveld ook zonder placeholder duidelijk. */}
                    <Field.Root minW="0">
                        {/* De centrale Field-stijl maakt labels overal gelijk en selecteerbaar. */}
                        <Field.Label>
                            Search events
                        </Field.Label>
                        <Input
                            type="search"
                            bg="bg.panel"
                            minH="44px"
                            fontSize="md"
                            borderRadius="lg"
                            placeholder="Search by title or description"
                            value={searchText}
                            onChange={(event) => setSearchText(event.target.value)}
                        />
                    </Field.Root>
                    {/* Een gewone select via Chakra werkt ook met toetsenbord en mobiele keuzemenu's. */}
                    <Field.Root minW="0">
                        {/* Het label blijft aan de select gekoppeld en is ook als tekst selecteerbaar. */}
                        <Field.Label htmlFor="event-sort-order">
                            Sort events
                        </Field.Label>
                        <NativeSelect.Root w="100%" minW="0">
                            <NativeSelect.Field
                                id="event-sort-order"
                                value={sortOrder}
                                onChange={(event) => setSortOrder(event.target.value)}
                                bg="bg.panel"
                                minH="44px"
                                fontSize="md"
                                borderRadius="lg"
                            >
                                <option value="title-asc">Title: A–Z</option>
                                <option value="title-desc">Title: Z–A</option>
                                <option value="start-asc">Start date: earliest first</option>
                                <option value="start-desc">Start date: latest first</option>
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </Field.Root>
                </Stack>

                {/* fieldset en legend geven de aankruisvakjes een gezamenlijke, toegankelijke naam. */}
                <Box as="fieldset" minW="0">
                    {/* De centrale legenda-opmaak sluit aan op alle andere formulierlabels. */}
                    <Box as="legend" mb="2">
                        Filter by category
                    </Box>
                    <Text id="event-category-filter-help" fontSize="sm" color="fg.muted" mb="3">
                        Choose one or more. No selection shows all categories.
                    </Text>
                    <Checkbox.Group
                        value={selectedCategoryIds}
                        onValueChange={setSelectedCategoryIds}
                        name="event-category-filter"
                        display="flex"
                        flexDirection="row"
                        flexWrap="wrap"
                        gap="4"
                    >
                        {/* De opties komen uit dezelfde API-categorieën als de namen op de kaarten. */}
                        {categories.map((category) => (
                            <Checkbox.Root key={category.id} value={String(category.id)} minH="44px">
                                <Checkbox.HiddenInput aria-describedby="event-category-filter-help" />
                                <Checkbox.Control>
                                    <Checkbox.Indicator />
                                </Checkbox.Control>
                                <Checkbox.Label>{category.name}</Checkbox.Label>
                            </Checkbox.Root>
                        ))}
                    </Checkbox.Group>
                </Box>
            </SimpleGrid>

            <Flex justify="space-between" align="baseline" gap="3" flexWrap="wrap" mb="5">
                <Heading as="h2" fontSize="2xl" letterSpacing="tight">
                    Explore events
                </Heading>
                <Text color="fg.muted" fontSize="sm" role="status">
                    {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
                </Text>
            </Flex>
            <Text fontSize="sm" color="fg.muted" mb="5">
                Times are shown in your local time.
            </Text>

            {/* Maak onderscheid tussen een lege database en zoek- of filtercriteria zonder resultaten. */}
            {filteredEvents.length === 0 ? (
                <Box p="6" bg="bg.panel" borderWidth="1px" borderColor="border" borderRadius="2xl">
                    <Text role="status">
                        {events.length === 0
                            ? 'No events available.'
                            : 'No events match your search or selected categories.'}
                    </Text>
                </Box>
            ) : (
                // Eén kolom op mobiel, twee op tablets en drie op brede schermen.
                <SimpleGrid as="ul" columns={{ base: 1, md: 2, lg: 3 }} gap="6" listStyleType="none" p="0">
                    {/* map maakt voor elk evenement een lijstitem; id is de stabiele React-key. */}
                    {/* De kaarten volgen de gekozen sortering, na zoeken en filteren. */}
                    {sortedEvents.map((event) => {
                        // Bewaar de categorieën waarvan het ID in categoryIds van dit evenement staat.
                        // Een evenement kan bij meerdere categorieën horen.
                        const eventCategories = categories.filter((category) =>
                            event.categoryIds.includes(category.id)
                        );

                        return (
                            <Box
                                as="li"
                                key={event.id}
                                minW="0"
                                bg="bg.panel"
                                borderWidth="1px"
                                borderColor="border"
                                borderRadius="2xl"
                                overflow="hidden"
                                shadow="sm"
                                transition="box-shadow 0.2s"
                                _hover={{ shadow: 'md' }}
                                // De focusrand staat op de kaart, zodat overflow de toetsenbordfocus niet afsnijdt.
                                _focusWithin={{
                                    outline: '3px solid',
                                    outlineColor: 'brand.fg',
                                    outlineOffset: '4px',
                                }}
                            >
                                {/* asChild combineert Chakra-opmaak met een echte React Router-link.
                                    De hele inhoud is aanklikbaar; Tab en Enter werken ook. */}
                                <Link
                                    asChild
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="stretch"
                                    gap="0"
                                    h="100%"
                                    color="inherit"
                                    textDecoration="none"
                                    borderRadius="2xl"
                                    _hover={{ textDecoration: 'none' }}
                                >
                                    <RouterLink
                                        to={`/event/${event.id}`}
                                        aria-label={`View event: ${event.title}`}
                                    >
                                        {/* De kaart snijdt de hoeken af; de afbeelding heeft geen eigen afronding.
                                            Zo sluit de foto zonder witte hoekruimte aan op de binnenrand.
                                            display en flexShrink houden de foto als vast blok boven de tekst. */}
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            w="100%"
                                            h="220px"
                                            objectFit="cover"
                                            display="block"
                                            flexShrink="0"
                                        />
                                        <Flex direction="column" flex="1" p="5" minW="0">
                                            {/* Zachte badges brengen de categorienamen in de nieuwe accentkleur naar voren. */}
                                            <Flex gap="2" flexWrap="wrap" mb="3">
                                                {eventCategories.map((category) => (
                                                    <Badge
                                                        key={category.id}
                                                        bg="brand.subtle"
                                                        color="brand.fg"
                                                        borderRadius="full"
                                                        px="3"
                                                        py="1"
                                                        whiteSpace="normal"
                                                    >
                                                        {category.name}
                                                    </Badge>
                                                ))}
                                                {eventCategories.length === 0 && (
                                                    <Text fontSize="sm" color="fg.muted">
                                                        Categories: None listed
                                                    </Text>
                                                )}
                                            </Flex>
                                            <Heading
                                                as="h3"
                                                fontSize="xl"
                                                lineHeight="short"
                                                letterSpacing="tight"
                                                mb="3"
                                            >
                                                {event.title}
                                            </Heading>
                                            <Text color="fg.muted" mb="5">
                                                {event.description}
                                            </Text>

                                            {/* dateTime bewaart de oorspronkelijke waarde in semantische time-elementen. */}
                                            <Box bg="bg.muted" borderRadius="lg" p="3" fontSize="sm" mb="5">
                                                <Text>
                                                    Start:{' '}
                                                    <Box as="time" dateTime={event.startTime}>
                                                        {formatDateTime(event.startTime)}
                                                    </Box>
                                                </Text>
                                                <Text>
                                                    End:{' '}
                                                    <Box as="time" dateTime={event.endTime}>
                                                        {formatDateTime(event.endTime)}
                                                    </Box>
                                                </Text>
                                            </Box>

                                            {/* De lijnpijl gebruikt de huisstijlkleur, net als in het receptenproject. */}
                                            <Flex
                                                mt="auto"
                                                pt="4"
                                                borderTopWidth="1px"
                                                borderColor="border"
                                                justify="space-between"
                                                align="center"
                                                color="brand.fg"
                                                fontSize="sm"
                                                fontWeight="bold"
                                            >
                                                <Text>View event</Text>
                                                <Icon as={LuArrowRight} boxSize="5" aria-hidden="true" />
                                            </Flex>
                                        </Flex>
                                    </RouterLink>
                                </Link>
                            </Box>
                        );
                    })}
                </SimpleGrid>
            )}
        </PageContainer>
    );
};

// De router toont dit onderdeel wanneer de loader faalt, bijvoorbeeld bij een gestopte server.
export const EventsPageError = () => (
    // Ook foutmeldingen volgen de gedeelde paginamarges en compacte titelhiërarchie.
    <PageContainer role="alert">
        <Heading as="h1" textStyle="detailTitle" mb="4">
            Unable to load events
        </Heading>
        <Text color="fg.muted">Check that JSON Server is running on port 3000 and reload the page.</Text>
    </PageContainer>
);
