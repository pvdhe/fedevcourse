import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// Dezelfde centrale thema-opbouw als de receptenapp, met helderblauw en zachte blauwe accenten.
// Semantische kleuren houden pagina's, kaarten en modals onderling consistent.
const config = defineConfig({
    globalCss: {
        body: { bg: 'bg', color: 'fg', lineHeight: '1.6' },
        // Een legenda hoort visueel bij de formulierlabels, met behoud van de fieldset-semantiek.
        legend: { textStyle: 'formLabel', userSelect: 'text' },
    },
    theme: {
        // Eén bron voor tekststijlen: gelijksoortige onderdelen gebruiken overal dezelfde hiërarchie.
        textStyles: {
            formLabel: { value: { fontSize: 'md', fontWeight: 'medium', lineHeight: '1.5' } },
            pageTitle: { value: { fontSize: { base: '4xl', md: '6xl' }, letterSpacing: 'tight', lineHeight: '1.08' } },
            detailTitle: { value: { fontSize: { base: '3xl', md: '4xl' }, letterSpacing: 'tight', lineHeight: 'short' } },
            kicker: { value: { fontSize: 'xs', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 'widest' } },
        },
        // Pas Chakra's standaardonderdelen centraal aan, ook in modals en portalen.
        slotRecipes: {
            field: {
                base: {
                    label: { textStyle: 'formLabel', userSelect: 'text' },
                    helperText: { textStyle: 'sm', color: 'fg.muted' },
                    errorText: { textStyle: 'sm' },
                },
            },
            checkbox: {
                base: { label: { userSelect: 'text' } },
            },
            dialog: {
                base: {
                    title: { fontSize: '2xl', lineHeight: 'short', letterSpacing: 'tight' },
                    description: { textStyle: 'sm', color: 'fg.muted' },
                },
            },
            nativeSelect: {
                base: { field: { borderRadius: 'lg', bg: 'bg.panel', minH: '44px' } },
            },
        },
        recipes: {
            // Alle tekstinvoer deelt dezelfde afronding, achtergrond en minimale aanraakhoogte.
            input: { base: { borderRadius: 'lg', bg: 'bg.panel', minH: '44px' }, variants: { size: { md: { textStyle: 'md' } } } },
            textarea: { base: { borderRadius: 'lg', bg: 'bg.panel', minH: '44px' }, variants: { size: { md: { textStyle: 'md' } } } },
            button: { base: { borderRadius: 'full', minH: '44px' } },
        },
        // De navigatie schakelt bij 640px over naar tabletweergave; bestaande Chakra-breakpoints blijven behouden.
        breakpoints: {
            ...defaultConfig.theme.breakpoints,
            tablet: '640px',
        },
        semanticTokens: {
            colors: {
                bg: {
                    DEFAULT: { value: { _light: '#f3f7fc', _dark: '#142033' } },
                    panel: { value: { _light: '#ffffff', _dark: '#1d2c43' } },
                    muted: { value: { _light: '#e8eff9', _dark: '#293d58' } },
                },
                fg: {
                    DEFAULT: { value: { _light: '#172b4d', _dark: '#edf3fc' } },
                    muted: { value: { _light: '#52657f', _dark: '#b8c9e1' } },
                    // Foutteksten moeten ook op witte formulieren voldoende leesbaar contrast hebben.
                    error: { value: { _light: '#b91c1c', _dark: '#fca5a5' } },
                },
                border: { DEFAULT: { value: { _light: '#d3dfef', _dark: '#425c7e' } } },
                brand: {
                    solid: { value: { _light: '#2563eb', _dark: '#93c5fd' } },
                    hover: { value: { _light: '#1d4ed8', _dark: '#bfdbfe' } },
                    contrast: { value: { _light: '#ffffff', _dark: '#172b4d' } },
                    fg: { value: { _light: '#1d4ed8', _dark: '#bfdbfe' } },
                    subtle: { value: { _light: '#dbeafe', _dark: '#263f65' } },
                },
            },
        },
    },
});

// Behoud Chakra-componenten en breakpoints en vul alleen de gedeelde huisstijl aan.
export const system = createSystem(defaultConfig, config);
