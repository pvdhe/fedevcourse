import { useId, useRef, useState } from 'react';
import { Box, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import { LuMenu, LuX } from 'react-icons/lu';
import { EventDialog } from './EventDialog';
import { Link as RouterLink, NavLink } from 'react-router-dom';

// Deze navigatie staat via Root boven alle drie de pagina's.
export const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuId = useId();
    const menuButtonRef = useRef(null);

    // Escape sluit het mobiele menu en brengt toetsenbordfocus terug naar de hamburgerknop.
    const handleMenuKeyDown = (event) => {
        if (event.key === 'Escape' && menuOpen) {
            event.preventDefault();
            setMenuOpen(false);
            menuButtonRef.current?.focus();
        }
    };

    return (
        // De lichte header, compacte sitenaam en ronde knoppen volgen de eerdere projecten.
        <Box as="header" bg="bg.panel" borderBottomWidth="1px" borderColor="border">
            <Flex
                maxW="1200px"
                mx="auto"
                px={{ base: '4', md: '8' }}
                py="3"
                minH="80px"
                gap="3"
                justify="space-between"
                align="center"
                flexWrap="wrap"
            >
                <Link asChild textDecoration="none" minH="44px" aria-label="Winc Events home">
                    <RouterLink to="/" onClick={() => setMenuOpen(false)}>
                        <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
                            <Box as="span" color="brand.fg">
                                Winc
                            </Box>{' '}
                            Events
                        </Text>
                    </RouterLink>
                </Link>
                {/* Alleen onder 640px tonen we de hamburger; tablets krijgen de gewone navigatie. */}
                <IconButton
                    ref={menuButtonRef}
                    display={{ base: 'inline-flex', tablet: 'none' }}
                    minW="44px"
                    minH="44px"
                    variant="outline"
                    borderColor="border"
                    borderRadius="full"
                    color="brand.fg"
                    aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={menuOpen}
                    aria-controls={menuId}
                    onClick={() => setMenuOpen((current) => !current)}
                >
                    {menuOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
                </IconButton>
                <Flex
                    as="nav"
                    id={menuId}
                    aria-label="Main navigation"
                    // Mobiel is het menu standaard dicht; vanaf 640px zijn alle acties altijd zichtbaar.
                    display={{ base: menuOpen ? 'flex' : 'none', tablet: 'flex' }}
                    direction={{ base: 'column', tablet: 'row' }}
                    w={{ base: '100%', tablet: 'auto' }}
                    minW="0"
                    gap={{ base: '2', tablet: '3' }}
                    align={{ base: 'stretch', tablet: 'center' }}
                    flexWrap="wrap"
                    onKeyDown={handleMenuKeyDown}
                >
                    {/* React Router houdt de app en de gedeelde Context actief tijdens navigatie. */}
                    <Link
                        asChild
                        minH="44px"
                        px={{ base: '2', sm: '3' }}
                        justifyContent="center"
                        fontSize="sm"
                        borderRadius="full"
                        color="fg.muted"
                        _currentPage={{ bg: 'brand.subtle', color: 'brand.fg' }}
                    >
                        <NavLink to="/" end onClick={() => setMenuOpen(false)}>
                            Events
                        </NavLink>
                    </Link>
                    {/* De derde pagina is bereikbaar zonder de hele app opnieuw te laden. */}
                    <Link
                        asChild
                        minH="44px"
                        px={{ base: '2', sm: '3' }}
                        justifyContent="center"
                        fontSize="sm"
                        borderRadius="full"
                        color="fg.muted"
                        _currentPage={{ bg: 'brand.subtle', color: 'brand.fg' }}
                    >
                        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About Us</NavLink>
                    </Link>
                    {/* Deze knop opent het formulier voor een nieuw evenement in een modal. */}
                    <EventDialog />
                </Flex>
            </Flex>
        </Box>
    );
};
