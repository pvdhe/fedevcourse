'use client'

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'

// Deze gedeelde instantie beheert korte meldingen, bijvoorbeeld na het opslaan.
// Meldingen staan bovenaan in het midden en blijven acht seconden leesbaar.
// Hun timer pauzeert als de pagina niet actief is.
export const toaster = createToaster({
  placement: 'top',
  duration: 8000,
  pauseOnPageIdle: true,
})

// Dit starteronderdeel moet in de app worden geplaatst om meldingen te tonen.
// Root plaatst dit onderdeel eenmaal, zodat meldingen vanaf elke pagina zichtbaar zijn.
export const Toaster = () => {
  return (
    // Plaats meldingen via een Portal buiten de gewone pagina-indeling.
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          // Houd de melding op mobiel binnen de schermbreedte, ook bij lange tekst.
          // Een rustige kaart past bij de huisstijl; de statuskleur zit in het pictogram.
          <Toast.Root
            width={{ base: 'calc(100vw - 2rem)', md: 'sm' }}
            maxW="100%"
            overflowWrap="anywhere"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="border"
            pe="14"
            css={{ '&[data-type]': { bg: 'bg.panel', color: 'fg' } }}
          >
            {/* Een laadmelding krijgt een spinner; andere meldingen krijgen een statuspictogram. */}
            {toast.type === 'loading' ? (
              <Spinner size='sm' color='blue.solid' />
            ) : (
              <Toast.Indicator color={toast.type === 'success' ? 'green.fg' : toast.type === 'error' ? 'red.fg' : 'orange.fg'} />
            )}
            {/* Titel en beschrijving worden alleen getoond als ze zijn meegegeven. */}
            <Stack gap='1' flex='1' minW="0" maxWidth='100%'>
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {/* Een actieknop en sluitknop zijn optioneel per melding. */}
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {/* Een ruime sluitknop blijft ook op een aanraakscherm goed bereikbaar. */}
            {toast.closable && <Toast.CloseTrigger aria-label="Close notification" minW="44px" minH="44px" />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
