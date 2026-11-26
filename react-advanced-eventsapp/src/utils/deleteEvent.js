// Verwijder alleen het evenement bij dit ID; een HTTP-fout mag niet als succes worden getoond.
export const deleteEvent = async (eventId) => {
    const response = await fetch(`http://localhost:3000/events/${encodeURIComponent(eventId)}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Het evenement kon niet worden verwijderd.');
};
