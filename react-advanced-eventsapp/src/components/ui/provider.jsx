'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';
import { system } from '../../theme';

// ChakraProvider levert het designsysteem met onze centrale helderblauwe huisstijl.
// ColorModeProvider beheert licht en donker voor de inhoud die via props wordt doorgegeven.
export function Provider(props) {
    return (
        <ChakraProvider value={system}>
            <ColorModeProvider {...props} />
        </ChakraProvider>
    );
}
