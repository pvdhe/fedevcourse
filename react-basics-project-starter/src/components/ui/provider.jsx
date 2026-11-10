'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import { system } from '../../theme'

export function Provider(props) {
  return (
    // Ons thema voegt de warme kleuren van CSS-Advanced toe voor licht en donker.
    // ColorModeProvider maakt de themakeuze beschikbaar voor alle onderliggende componenten.
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
