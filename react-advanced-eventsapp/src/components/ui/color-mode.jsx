'use client'

import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'

import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

// next-themes stelt een themaklasse in op het HTML-element.
// disableTransitionOnChange voorkomt kleurtransities tijdens het wisselen van thema.
export function ColorModeProvider(props) {
  return (
    <ThemeProvider attribute='class' disableTransitionOnChange {...props} />
  )
}

// Deze custom hook bundelt het actieve thema en de functies om het te wijzigen.
// Een afgedwongen thema krijgt voorrang op het door next-themes bepaalde thema.
export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const colorMode = forcedTheme || resolvedTheme
  const toggleColorMode = () => {
    // Wissel tussen een lichte en donkere kleurmodus.
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  return {
    colorMode: colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

// Kies een van twee waarden op basis van de kleurmodus, bijvoorbeeld voor een kleur.
export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

// Het pictogram geeft de huidige kleurmodus weer.
export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

// Deze meegeleverde themaknop wordt nog niet gebruikt in de navigatie of pagina's.
// forwardRef geeft een eventuele verwijzing van buitenaf door aan de knop.
export const ColorModeButton = React.forwardRef(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode()
    return (
      // Toon eerst een tijdelijke vorm totdat de inhoud in de browser beschikbaar is.
      <ClientOnly fallback={<Skeleton boxSize='9' />}>
        <IconButton
          onClick={toggleColorMode}
          variant='ghost'
          aria-label='Toggle color mode'
          size='sm'
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

// Optioneel starteronderdeel: geef een gedeelte van de interface een vast licht thema.
// display='contents' voorkomt dat de wrapper zelf een extra opmaakblok vormt.
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

// Optioneel starteronderdeel: geef een gedeelte van de interface een vast donker thema.
// LightMode en DarkMode worden momenteel niet in de pagina's gebruikt.
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
