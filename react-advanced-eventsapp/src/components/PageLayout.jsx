import { Box, Heading, Text } from '@chakra-ui/react';

// Alle pagina's, laadschermen en foutweergaven delen dezelfde breedte en responsive marges.
export const PageContainer = ({ children, ...props }) => (
    <Box
        as="main"
        maxW="1200px"
        mx="auto"
        px={{ base: '4', md: '8' }}
        py={{ base: '6', md: '10' }}
        overflowWrap="anywhere"
        {...props}
    >
        {children}
    </Box>
);

// Het overzicht en About Us gebruiken precies dezelfde introductie, ook op mobiel.
// De beschrijving is optioneel; titelruimte en typografie blijven centraal bepaald.
export const PageIntro = ({ kicker, title, children }) => (
    <Box py={{ base: '4', md: '8' }} mb="6" maxW="720px">
        <Text color="brand.fg" textStyle="kicker" mb="4">{kicker}</Text>
        <Heading as="h1" textStyle="pageTitle" mb="5">{title}</Heading>
        {children}
    </Box>
);
