import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// Net als in CSS-Advanced bewaren we gedeelde kleuren op één plek.
// Elke semantische kleur heeft een lichte en donkere variant.
const config = defineConfig({
    theme: {
        semanticTokens: {
            colors: {
                bg: {
                    DEFAULT: { value: { _light: '#f7f4ee', _dark: '#191816' } },
                    panel: { value: { _light: '#ffffff', _dark: '#24221f' } },
                    muted: { value: { _light: '#efebe3', _dark: '#302d28' } },
                },
                fg: {
                    DEFAULT: { value: { _light: '#292822', _dark: '#f6f1e8' } },
                    muted: { value: { _light: '#686359', _dark: '#bdb6aa' } },
                },
                border: {
                    DEFAULT: { value: { _light: '#e4ddd1', _dark: '#494238' } },
                },
            },
        },
    },
});

// We vullen het standaardthema aan; Chakra behoudt zijn componenten en breakpoints.
export const system = createSystem(defaultConfig, config);
