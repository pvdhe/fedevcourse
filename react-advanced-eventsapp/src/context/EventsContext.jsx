import { createContext, useContext, useEffect, useState } from 'react';
import { saveEvent as saveEventOnServer } from '../utils/eventForm';
import { deleteEvent as deleteEventOnServer } from '../utils/deleteEvent';

// De Context maakt dezelfde gegevens beschikbaar voor pagina's en formulieren.
export const EventsContext = createContext(null);

export const EventsProvider = ({ initialData, children }) => {
    // De router levert de beginwaarden; state laat alle afnemers opnieuw renderen na een wijziging.
    const [events, setEvents] = useState(initialData.events);
    const [categories, setCategories] = useState(initialData.categories);

    // Als React Router de gegevens opnieuw ophaalt, neem die servergegevens over.
    useEffect(() => {
        setEvents(initialData.events);
        setCategories(initialData.categories);
    }, [initialData]);

    // Geen ID betekent toevoegen; met een ID vervangen we alleen het bijbehorende evenement.
    const saveEvent = async (values, eventId) => {
        const savedEvent = await saveEventOnServer(values, categories, eventId);
        // Pas state pas aan na een geslaagd verzoek. Gebruik het volledige serverantwoord, inclusief ID.
        setEvents((currentEvents) => eventId === undefined
            ? [...currentEvents, savedEvent]
            : currentEvents.map((event) => String(event.id) === String(eventId) ? savedEvent : event));
    };

    const deleteEvent = async (eventId) => {
        await deleteEventOnServer(eventId);
        // Alle componenten die de Context lezen zien meteen dat het evenement verdwenen is.
        setEvents((currentEvents) => currentEvents.filter((event) => String(event.id) !== String(eventId)));
    };

    // children omvat de navigatie en huidige pagina; value deelt data en acties zonder propketens.
    return (
        <EventsContext.Provider value={{ events, categories, saveEvent, deleteEvent }}>
            {children}
        </EventsContext.Provider>
    );
};

// Deze custom hook voorkomt herhaling van useContext en geeft een duidelijke fout zonder Provider.
export const useEvents = () => {
    const context = useContext(EventsContext);
    if (!context) throw new Error('useEvents moet binnen EventsProvider worden gebruikt.');
    return context;
};
