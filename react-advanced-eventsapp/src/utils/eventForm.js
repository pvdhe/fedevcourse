// datetime-local verwacht een lokale tijd zonder tijdzone; toISOString alleen zou UTC tonen.
// Gebruik de offset van de evenementdatum, zodat ook zomer- en wintertijd kloppen.
export const toLocalDateTime = (value) => {
    if (!value) return '';
    const date = new Date(value);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 19);
};

// Bouw voor toevoegen en bewerken dezelfde velden op in het formaat van JSON Server.
export const buildEventPayload = (values, categories) => ({
    title: values.title.trim(),
    description: values.description.trim(),
    image: values.image.trim(),
    location: values.location.trim(),
    startTime: new Date(values.startTime).toISOString(),
    endTime: new Date(values.endTime).toISOString(),
    // De checkboxwaarden zijn strings; behoud bij het opslaan de oorspronkelijke API-ID-types.
    categoryIds: categories.filter((category) => values.categoryIds.includes(String(category.id))).map((category) => category.id),
});

export const saveEvent = async (values, categories, eventId) => {
    const editing = eventId !== undefined;
    const payload = buildEventPayload(values, categories);
    // Alleen een nieuw evenement krijgt de demo-maker. PATCH laat bestaande velden zoals createdBy intact.
    if (!editing) payload.createdBy = 1;
    const url = editing
        ? `http://localhost:3000/events/${encodeURIComponent(eventId)}`
        : 'http://localhost:3000/events';
    const response = await fetch(url, {
        method: editing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Het evenement kon niet worden opgeslagen.');
    // De Provider gebruikt het serverantwoord om de gedeelde state bij te werken.
    return response.json();
};
