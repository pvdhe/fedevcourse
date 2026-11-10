'use client'

import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'

import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

export function ColorModeProvider(props) {
  return (
    // Chakra UI v3 gebruikt next-themes: de class light/dark stuurt de kleuren aan.
    // Eerst volgen we het systeemthema; een eigen keuze wordt lokaal bewaard.
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      storageKey='recipe-app-theme'
      disableTransitionOnChange
      {...props}
    />
  )
}

// Deze meegeleverde hook geeft het actieve thema en functies om het te veranderen.
// resolvedTheme vertaalt de systeemvoorkeur naar light of dark.
export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const colorMode = forcedTheme || resolvedTheme
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  return {
    colorMode: colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

// Hulpfunctie uit de starter: kies een waarde die past bij het actieve thema.
// Onze pagina's gebruiken hiervoor vooral de semantische kleuren uit theme.js.
export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

// Het pictogram laat het huidige thema zien; de knoptekst noemt het doelthema.
export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

// forwardRef geeft een eventuele verwijzing door aan de echte knop.
// ClientOnly wacht tot de component in de browser is geladen voordat de themaknop verschijnt.
export const ColorModeButton = React.forwardRef(
  function ColorModeButton(props, ref) {
    // De knop vertelt welk thema de gebruiker met de volgende klik kiest.
    const { colorMode, toggleColorMode } = useColorMode()
    const switchLabel = colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    return (
      <ClientOnly fallback={<Skeleton boxSize='11' />}>
        <IconButton
          onClick={toggleColorMode}
          variant='ghost'
          aria-label={switchLabel}
          title={switchLabel}
          size='md'
          minW='44px'
          minH='44px'
          ref={ref}
          {...props}
          css={{
            _icon: {
              width: '5',
              height: '5',
            },
          }}
        >
          <ColorModeIcon />
        </IconButton>
      </ClientOnly>
    )
  },
)

// Optionele startercomponent om een deel van de interface altijd licht weer te geven.
// Deze component wordt momenteel niet door de receptenpagina's gebruikt.
export const LightMode = React.forwardRef(function LightMode(props, ref) {
  return (
    <Span
      color='fg'
      display='contents'
      className='chakra-theme light'
      colorPalette='gray'
      colorScheme='light'
      ref={ref}
      {...props}
    />
  )
})

// Optionele startercomponent om een deel van de interface altijd donker weer te geven.
// Deze component wordt momenteel niet door de receptenpagina's gebruikt.
export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
  return (
    <Span
      color='fg'
      display='contents'
      className='chakra-theme dark'
      colorPalette='gray'
      colorScheme='dark'
      ref={ref}
      {...props}
    />
  )
})
