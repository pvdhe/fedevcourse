// De hoofdroute voert deze loader uit voor de gedeelde evenementen- en categoriegegevens.
export const eventsLoader = async ({ request }) => {
    // Beide GET-verzoeken kunnen tegelijk lopen: de lijsten zijn onafhankelijk van elkaar.
    // Het signaal breekt achterhaalde verzoeken af als de gebruiker verder navigeert.
    const [eventsResponse, categoriesResponse] = await Promise.all([
        fetch('http://localhost:3000/events', { signal: request.signal }),
        fetch('http://localhost:3000/categories', { signal: request.signal }),
    ]);

    // fetch geeft bij een HTTP-fout niet vanzelf een foutmelding; controleer daarom de status.
    if (!eventsResponse.ok || !categoriesResponse.ok) {
        throw new Error('De evenementen of categorieën konden niet worden opgehaald.');
    }

    // Geef de arrays aan Root door; EventsProvider bewaart ze daarna in gedeelde state.
    const [events, categories] = await Promise.all([
        eventsResponse.json(),
        categoriesResponse.json(),
    ]);

    return { events, categories };
};
