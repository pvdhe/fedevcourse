import { Box, SimpleGrid, Skeleton, SkeletonText, Text } from '@chakra-ui/react';
import { PageContainer } from './PageLayout';

// De router toont deze placeholders zolang de evenementen worden opgehaald.
// Hulptechnologie leest alleen de laadmelding, niet de decoratieve skeleton-vlakken.
export const EventsPageLoading = () => (
    // De laadweergave gebruikt dezelfde buitenmarges als de pagina die straks verschijnt.
    <PageContainer>
        <Text role="status" mb="4">
            Loading events...
        </Text>
        {/* De placeholders volgen hetzelfde responsive raster en dezelfde kaarten als het overzicht. */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6" aria-hidden="true">
            {[1, 2, 3].map((placeholder) => (
                <Box
                    key={placeholder}
                    p="4"
                    bg="bg.panel"
                    borderWidth="1px"
                    borderColor="border"
                    borderRadius="2xl"
                >
                    <Skeleton h="240px" borderRadius="md" mb="4" />
                    <Skeleton h="6" w="65%" mb="3" />
                    <SkeletonText noOfLines={3} />
                </Box>
            ))}
        </SimpleGrid>
    </PageContainer>
);
