import { useRef, useState } from 'react';
import { Button, Dialog, Portal, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import { toaster } from './ui/toaster';

// Vraag eerst bevestiging en noem het evenement, zodat duidelijk is wat wordt verwijderd.
export const DeleteEventDialog = ({ event }) => {
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const cancelRef = useRef(null);
    const navigate = useNavigate();
    // Verwijderen via de Provider werkt na serversucces ook de gedeelde evenementenlijst bij.
    const { deleteEvent } = useEvents();

    const handleDelete = async () => {
        setDeleting(true);
        setError('');
        try {
            await deleteEvent(event.id);
            setOpen(false);
            // Bevestig verwijderen alleen wanneer het DELETE-verzoek en de state-update zijn geslaagd.
            toaster.create({ title: 'Event deleted successfully.', type: 'success', closable: true });
            // Open het overzicht opnieuw en vervang de verwijderde detailpagina in de geschiedenis.
            navigate('/', { replace: true });
        } catch {
            // Laat de modal open bij een fout, zodat opnieuw proberen of annuleren mogelijk is.
            setError('Unable to delete the event. Check JSON Server and try again.');
            // Meld de fout ook als toast; de waarschuwing in de modal blijft staan.
            toaster.create({
                title: 'Unable to delete event.',
                description: 'Check JSON Server and try again.',
                type: 'error',
                closable: true,
            });
        } finally {
            setDeleting(false);
        }
    };

    return (
        // Begin met focus op Cancel. Tijdens het DELETE-verzoek is sluiten geblokkeerd.
        <Dialog.Root
            role="alertdialog"
            open={open}
            onOpenChange={({ open: nextOpen }) => {
                if (!deleting) {
                    setError('');
                    setOpen(nextOpen);
                }
            }}
            initialFocusEl={() => cancelRef.current}
            closeOnEscape={!deleting}
            closeOnInteractOutside={!deleting}
            lazyMount
            unmountOnExit
            scrollBehavior="inside"
        >
            {/* De knopvorm volgt de huisstijl; rood blijft herkenbaar als verwijderactie. */}
            <Dialog.Trigger asChild>
                <Button colorPalette="red" variant="outline" bg="bg.panel" borderRadius="full" minH="44px" w={{ base: '100%', sm: 'auto' }}>
                    Delete Event
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    {/* De bevestiging blijft ook op smalle en lage schermen binnen het venster. */}
                    <Dialog.Content
                        w="calc(100% - 2rem)"
                        mx="auto"
                        minW="0"
                        overflowWrap="anywhere"
                        borderRadius="2xl"
                        bg="bg.panel"
                        color="fg"
                        // De bevestiging blijft bereikbaar in een laag mobiel of liggend venster.
                        my={{ base: '4', md: '12' }}
                        maxH={{ base: 'calc(100dvh - 2rem)', md: 'calc(100dvh - 6rem)' }}
                    >
                        <Dialog.Header px={{ base: '4', md: '6' }}>
                            {/* De centrale Dialog-stijl geeft iedere modal dezelfde titelopmaak. */}
                            <Dialog.Title>Delete event?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body px={{ base: '4', md: '6' }} minH="0">
                            <Dialog.Description>
                                Delete &quot;{event.title}&quot;? This cannot be undone.
                            </Dialog.Description>
                            {error && (
                                <Text role="alert" color="fg.error" mt="4">
                                    {error}
                                </Text>
                            )}
                        </Dialog.Body>
                        {/* Op mobiel krijgen de twee bevestigingsacties elk een eigen volle regel. */}
                        <Dialog.Footer flexDirection={{ base: 'column', sm: 'row' }} px={{ base: '4', md: '6' }}>
                            {/* Annuleren sluit alleen de modal en verstuurt geen verzoek. */}
                            <Button
                                ref={cancelRef}
                                variant="outline"
                                borderRadius="full"
                                minH="44px"
                                w={{ base: '100%', sm: 'auto' }}
                                onClick={() => setOpen(false)}
                                disabled={deleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorPalette="red"
                                borderRadius="full"
                                minH="44px"
                                w={{ base: '100%', sm: 'auto' }}
                                onClick={handleDelete}
                                loading={deleting}
                                loadingText="Deleting..."
                                disabled={deleting}
                            >
                                Delete event
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
