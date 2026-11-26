import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { EventDialog } from "../components/EventDialog";
import { DeleteEventDialog } from "../components/DeleteEventDialog";
import { useEvents } from "../context/EventsContext";
import { PageContainer } from "../components/PageLayout";

// Detailpagina op /event/:eventId, bedoeld voor één specifiek evenement.
// Gebruik het eventId uit de route om het evenement in de gedeelde Context te vinden.
export const EventPage = () => {
  const { events, categories } = useEvents();
  const { eventId } = useParams();
  // Routeparameters zijn tekst; String laat ook numerieke JSON Server-IDs correct overeenkomen.
  const event = events.find((item) => String(item.id) === eventId);

  // Een onbekend of inmiddels verwijderd evenement krijgt de bestaande foutweergave.
  if (!event) return <EventPageError />;

  // Koppel de categorie-IDs van het evenement aan de namen uit de API.
  const eventCategories = categories.filter((category) =>
    event.categoryIds.includes(category.id),
  );

  // Net als in het overzicht tonen we UTC-tijden in de lokale tijdzone van de browser.
  const formatDateTime = (value) =>
    new Date(value).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    // Het detail deelt de paginamarges met het overzicht en About Us.
    <PageContainer>
      {/* De teruglink gebruikt React Router, zonder de hele pagina opnieuw te laden. */}
      <Link
        asChild
        mb="8"
        px="5"
        minH="44px"
        bg="bg.panel"
        borderWidth="1px"
        borderColor="border"
        borderRadius="full"
        color="brand.fg"
        fontWeight="medium"
      >
        <RouterLink to="/">Back to events</RouterLink>
      </Link>
      {/* Op mobiel en tablet blijft de inhoud ruim onder elkaar; vanaf desktop naast elkaar. */}
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        gap={{ base: "6", lg: "10" }}
        alignItems="start"
      >
        <Image
          src={event.image}
          alt={event.title}
          w="100%"
          h={{ base: "240px", sm: "320px", lg: "460px" }}
          objectFit="cover"
          borderRadius="2xl"
        />
        <Box minW="0">
          <Text color="brand.fg" textStyle="kicker" mb="3">
            From the Winc Events collection
          </Text>
          <Heading
            as="h1"
            // Een detailtitel is compacter dan de introductietitel en gebruikt een vaste themastijl.
            textStyle="detailTitle"
            mb="4"
          >
            {event.title}
          </Heading>
          <Text color="fg.muted" fontSize="lg" lineHeight="tall" mb="6">
            {event.description}
          </Text>
          {/* Geef het evenement door om hetzelfde formulier met bestaande gegevens te openen.
              De key maakt bij een ander evenement ook een nieuwe modalinstantie aan. */}
          {/* Mobiele actieknoppen vullen de breedte en staan vanaf sm naast elkaar. */}
          <Flex
            gap="3"
            direction={{ base: "column", sm: "row" }}
            flexWrap="wrap"
            mb="6"
          >
            <EventDialog key={event.id} event={event} />
            {/* Verwijderen heeft een eigen bevestigingsmodal en werkt met hetzelfde evenement-ID. */}
            <DeleteEventDialog key={`delete-${event.id}`} event={event} />
          </Flex>
          {/* Oudere gegevens kunnen een lege locatie hebben; geef dat duidelijk aan. */}
          <Box
            bg="bg.panel"
            p="5"
            borderWidth="1px"
            borderColor="border"
            borderRadius="xl"
            mb="4"
          >
            <Text fontSize="xs" color="fg.muted" mb="1">
              Location
            </Text>
            <Text fontWeight="medium">
              {event.location?.trim() || "Not specified"}
            </Text>
          </Box>

          {/* De leesbare tekst gebruikt lokale tijd; dateTime bewaart de oorspronkelijke API-waarde. */}
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mb="3">
            <Box
              bg="bg.panel"
              p="4"
              borderWidth="1px"
              borderColor="border"
              borderRadius="xl"
            >
              <Text fontSize="xs" color="fg.muted" mb="1">
                Start
              </Text>
              <Box as="time" dateTime={event.startTime} fontWeight="medium">
                {formatDateTime(event.startTime)}
              </Box>
            </Box>
            <Box
              bg="bg.panel"
              p="4"
              borderWidth="1px"
              borderColor="border"
              borderRadius="xl"
            >
              <Text fontSize="xs" color="fg.muted" mb="1">
                End
              </Text>
              <Box as="time" dateTime={event.endTime} fontWeight="medium">
                {formatDateTime(event.endTime)}
              </Box>
            </Box>
          </SimpleGrid>
          <Text fontSize="sm" color="fg.muted" mb="6">
            Times are shown in your local time.
          </Text>

          {/* Dezelfde zachte categoriebadges als op het overzicht houden de stijl consequent. */}
          <Text fontSize="sm" fontWeight="medium" mb="2">
            Categories
          </Text>
          <Flex gap="2" flexWrap="wrap">
            {eventCategories.map((category) => (
              <Badge
                key={category.id}
                bg="brand.subtle"
                color="brand.fg"
                px="3"
                py="1"
                borderRadius="full"
              >
                {category.name}
              </Badge>
            ))}
            {eventCategories.length === 0 && (
              <Text color="fg.muted">None listed</Text>
            )}
          </Flex>
        </Box>
      </SimpleGrid>
    </PageContainer>
  );
};

// Deze weergave verschijnt wanneer het route-ID ontbreekt in de geladen evenementenlijst.
// Fouten bij het ophalen van die lijst worden door EventsPageError op de hoofdroute afgehandeld.
export const EventPageError = () => (
  // Dezelfde foutopmaak als bij een onbereikbare evenementenlijst.
  <PageContainer role="alert">
    <Heading as="h1" textStyle="detailTitle" mb="4">
      Unable to load event
    </Heading>
    <Text color="fg.muted" mb="4">
      The event may no longer exist. Check that JSON Server is running and try
      again.
    </Text>
    {/* De terugactie heeft dezelfde ronde vorm en aanraakhoogte als de normale detailpagina. */}
    <Link
      asChild
      px="5"
      minH="44px"
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border"
      borderRadius="full"
      color="brand.fg"
      fontWeight="medium"
    >
      <RouterLink to="/">Back to events</RouterLink>
    </Link>
  </PageContainer>
);
