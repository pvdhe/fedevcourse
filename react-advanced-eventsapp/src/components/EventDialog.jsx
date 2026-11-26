import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Checkbox, Dialog, Field, Input, Portal, Stack, Text, Textarea } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toaster } from './ui/toaster';
import { toLocalDateTime } from '../utils/eventForm';
import { useEvents } from '../context/EventsContext';

// Eén modal voor toevoegen en bewerken; een meegegeven evenement bepaalt de bewerkmodus.
export const EventDialog = ({ event }) => {
    const editing = event !== undefined;
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSaved = () => {
        setOpen(false);
        // Toon pas een succesmelding nadat de Provider het serverantwoord heeft verwerkt.
        toaster.create({
            title: editing ? 'Event updated successfully.' : 'Event added successfully.',
            type: 'success',
            closable: true,
        });
        // De Context is al bijgewerkt. Alleen bij toevoegen vanaf een detailpagina navigeren we terug.
        if (!editing && location.pathname !== '/') navigate('/');
    };

    return (
        // Sluiten is tijdens opslaan geblokkeerd, zodat de gebruiker de uitkomst kan zien.
        // Na sluiten wordt het formulier verwijderd; opnieuw openen gebruikt de actuele beginwaarden.
        <Dialog.Root
            open={open}
            onOpenChange={({ open: nextOpen }) => {
                if (!saving) setOpen(nextOpen);
            }}
            lazyMount
            unmountOnExit
            closeOnEscape={!saving}
            closeOnInteractOutside={!saving}
            scrollBehavior="inside"
            size="lg"
        >
            {/* De ronde accentknop volgt de huisstijl; bewerken krijgt een rustige rand. */}
            <Dialog.Trigger asChild>
                <Button
                    variant={editing ? 'outline' : 'solid'}
                    borderRadius="full"
                    minH="44px"
                    // Een volle breedte past zowel in de mobiele navigatie als bij gestapelde detailacties.
                    w={{ base: '100%', sm: 'auto' }}
                    minW="0"
                    px={{ base: '3', sm: '5' }}
                    bg={editing ? 'bg.panel' : 'brand.solid'}
                    color={editing ? 'brand.fg' : 'brand.contrast'}
                    borderColor={editing ? 'border' : 'brand.solid'}
                    _hover={{ bg: editing ? 'brand.subtle' : 'brand.hover' }}
                >
                    {editing ? 'Edit Event' : 'Add Event'}
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    {/* Reserveer schermruimte naast de modal, ook als een invoerveld lange tekst bevat. */}
                    <Dialog.Content
                        w="calc(100% - 2rem)"
                        mx="auto"
                        minW="0"
                        overflowWrap="anywhere"
                        borderRadius="2xl"
                        bg="bg.panel"
                        color="fg"
                        colorPalette="blue"
                        // Minder buitenruimte en een dynamische hoogte laten op mobiel meer formulier zien.
                        my={{ base: '4', md: '12' }}
                        maxH={{ base: 'calc(100dvh - 2rem)', md: 'calc(100dvh - 6rem)' }}
                    >
                        <Dialog.Header px={{ base: '4', md: '6' }}>
                            {/* Alle modaltitels, inclusief verwijderen, volgen de centrale Dialog-stijl. */}
                            <Dialog.Title>
                                {editing ? 'Edit event' : 'Add event'}
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body px={{ base: '4', md: '6' }} pb="6" minH="0">
                            <EventForm
                                event={event}
                                onSaved={handleSaved}
                                onSavingChange={setSaving}
                                onCancel={() => setOpen(false)}
                            />
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

// Het formulier is los van de modal gehouden: invoer, validatie en opslaan horen hier bij elkaar.
const EventForm = ({ event, onSaved, onSavingChange, onCancel }) => {
    // Categorieën en de opslagfunctie komen uit dezelfde Context als de pagina's.
    const { categories, saveEvent } = useEvents();
    const categoryError =
        categories.length === 0 ? 'No categories available. Try again when categories are available.' : '';
    const [saveError, setSaveError] = useState('');
    const {
        register,
        control,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm({
        // Vul bij bewerken de bestaande waarden in; een nieuw evenement begint met lege velden.
        defaultValues: {
            title: event?.title ?? '',
            description: event?.description ?? '',
            image: event?.image ?? '',
            location: event?.location ?? '',
            startTime: toLocalDateTime(event?.startTime),
            endTime: toLocalDateTime(event?.endTime),
            categoryIds: event?.categoryIds.map(String) ?? [],
        },
    });

    // Verplichte tekst mag ook na het verwijderen van spaties niet leeg zijn.
    const requiredText = (value) => value.trim().length > 0 || 'This field is required.';
    const validateImage = (value) => {
        try {
            return (
                ['http:', 'https:'].includes(new URL(value.trim()).protocol) ||
                'Use an http or https image URL.'
            );
        } catch {
            return 'Enter a valid image URL.';
        }
    };

    const submitEvent = async (values) => {
        setSaveError('');
        onSavingChange(true);
        try {
            // De Provider bewaart het serverantwoord en deelt de gewijzigde lijst met alle pagina's.
            await saveEvent(values, event?.id);
            onSaved();
        } catch {
            // Bij een fout blijven alle ingevulde velden staan, zodat opnieuw proberen mogelijk is.
            setSaveError('Unable to save the event. Check JSON Server and try again.');
            // De toast noemt de mislukte actie; de blijvende uitleg staat ook in het formulier.
            toaster.create({
                title: event ? 'Unable to update event.' : 'Unable to add event.',
                description: 'Check JSON Server and try again. Your input has been kept.',
                type: 'error',
                closable: true,
            });
        } finally {
            onSavingChange(false);
        }
    };

    return (
        // React Hook Form toont de validatiefouten; noValidate schakelt browser-pop-ups uit.
        <Box
            as="form"
            onSubmit={handleSubmit(submitEvent)}
            noValidate
            // Tekstgrootte, afronding en aanraakhoogte van velden komen centraal uit het thema.
        >
            <Stack gap="4">
                <Text fontSize="sm" color="fg.muted">
                    All fields are required. Choose at least one category. Times use your local time zone.
                    {!event && ' New events use demo creator Michael Turner.'}
                </Text>
                {/* Field koppelt elk zichtbaar label en de bijbehorende fouttekst aan het invoerveld. */}
                <Field.Root required invalid={!!errors.title} disabled={isSubmitting}>
                    <Field.Label>
                        Title <Field.RequiredIndicator />
                    </Field.Label>
                    <Input required {...register('title', { validate: requiredText })} />
                    <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root required invalid={!!errors.description} disabled={isSubmitting}>
                    <Field.Label>
                        Description <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea required {...register('description', { validate: requiredText })} />
                    <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root required invalid={!!errors.image} disabled={isSubmitting}>
                    <Field.Label>
                        Image URL <Field.RequiredIndicator />
                    </Field.Label>
                    <Input required type="url" {...register('image', { validate: validateImage })} />
                    <Field.HelperText>
                        Enter a link to an image, for example https://example.com/event.jpg.
                    </Field.HelperText>
                    <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
                </Field.Root>
                {/* Ook locatie is verplicht. Alleen spaties tellen niet als ingevulde tekst. */}
                <Field.Root required invalid={!!errors.location} disabled={isSubmitting}>
                    <Field.Label>
                        Location <Field.RequiredIndicator />
                    </Field.Label>
                    <Input required {...register('location', { validate: requiredText })} />
                    <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root required invalid={!!errors.startTime} disabled={isSubmitting}>
                    <Field.Label>
                        Start time <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        required
                        type="datetime-local"
                        step="1"
                        {...register('startTime', {
                            required: 'Choose a start date and time.',
                            validate: (value) =>
                                Number.isFinite(Date.parse(value)) || 'Enter a valid date and time.',
                        })}
                    />
                    <Field.ErrorText>{errors.startTime?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root required invalid={!!errors.endTime} disabled={isSubmitting}>
                    <Field.Label>
                        End time <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        required
                        type="datetime-local"
                        step="1"
                        {...register('endTime', {
                            required: 'Choose an end date and time.',
                            validate: (value) =>
                                new Date(value) > new Date(getValues('startTime')) ||
                                'End time must be after start time.',
                        })}
                    />
                    <Field.ErrorText>{errors.endTime?.message}</Field.ErrorText>
                </Field.Root>

                {/* Een fieldset groepeert de aankruisvakjes; Controller verbindt Chakra met React Hook Form. */}
                <Box as="fieldset" disabled={isSubmitting} minW="0">
                    {/* De centrale legenda-stijl komt overeen met de labels boven alle tekstvelden. */}
                    <Box as="legend" mb="2">
                        Categories (choose one or more)
                    </Box>
                    {categoryError && (
                        <Text role="alert" color="fg.error">
                            {categoryError}
                        </Text>
                    )}
                    <Controller
                        name="categoryIds"
                        control={control}
                        rules={{ validate: (value) => value.length > 0 || 'Choose at least one category.' }}
                        render={({ field }) => (
                            <Checkbox.Group
                                value={field.value}
                                onValueChange={field.onChange}
                                name={field.name}
                                invalid={!!errors.categoryIds}
                                disabled={isSubmitting}
                            >
                                {categories.map((category, index) => (
                                    // Zolang niets gekozen is, markeren we de opties als vereist.
                                    // Na één keuze vervalt required voor de losse vakjes; niet elke categorie is verplicht.
                                    <Checkbox.Root
                                        key={category.id}
                                        value={String(category.id)}
                                        required={field.value.length === 0}
                                        minH="44px"
                                    >
                                        <Checkbox.HiddenInput
                                            required={field.value.length === 0}
                                            ref={index === 0 ? field.ref : undefined}
                                            onBlur={field.onBlur}
                                            aria-describedby={
                                                errors.categoryIds ? 'event-form-category-error' : undefined
                                            }
                                        />
                                        <Checkbox.Control>
                                            <Checkbox.Indicator />
                                        </Checkbox.Control>
                                        <Checkbox.Label>{category.name}</Checkbox.Label>
                                    </Checkbox.Root>
                                ))}
                            </Checkbox.Group>
                        )}
                    />
                    {errors.categoryIds && (
                        <Text id="event-form-category-error" role="alert" color="fg.error" fontSize="sm">
                            {errors.categoryIds.message}
                        </Text>
                    )}
                </Box>

                {saveError && (
                    <Text role="alert" color="fg.error">
                        {saveError}
                    </Text>
                )}
                {/* Blokkeer opnieuw verzenden en sluiten zolang het opslagverzoek loopt. */}
                <Button
                    type="submit"
                    borderRadius="full"
                    minH="44px"
                    bg="brand.solid"
                    color="brand.contrast"
                    _hover={{ bg: 'brand.hover' }}
                    loading={isSubmitting}
                    loadingText="Saving..."
                    disabled={!!categoryError || isSubmitting}
                >
                    {event ? 'Save changes' : 'Save event'}
                </Button>
                <Button
                    type="button"
                    borderRadius="full"
                    minH="44px"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            </Stack>
        </Box>
    );
};
