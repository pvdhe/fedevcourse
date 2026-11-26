import { Tooltip as ChakraTooltip, Portal } from '@chakra-ui/react'
import * as React from 'react'

// Meegeleverd hulpmiddel voor een tekstballon bij aanwijzen of toetsenbordfocus.
// De pagina's gebruiken dit onderdeel nog niet; ref verwijst naar de tekstballon.
export const Tooltip = React.forwardRef(function Tooltip(props, ref) {
  // Haal de eigen opties uit de props; de overige opties gaan naar ChakraTooltip.Root.
  const {
    showArrow,
    children,
    disabled,
    portalled = true,
    content,
    contentProps,
    portalRef,
    ...rest
  } = props

  // Zonder tooltip blijft alleen het oorspronkelijke onderliggende element zichtbaar.
  if (disabled) return children

  return (
    <ChakraTooltip.Root {...rest}>
      {/* Gebruik het onderliggende element zelf als aanleiding om de tooltip te openen. */}
      <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
      {/* Een Portal kan de tekstballon buiten de normale componentpositie plaatsen. */}
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content ref={ref} {...contentProps}>
            {/* Toon alleen een pijltje wanneer de aanroeper daarom vraagt. */}
            {showArrow && (
              <ChakraTooltip.Arrow>
                <ChakraTooltip.ArrowTip />
              </ChakraTooltip.Arrow>
            )}
            {content}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </Portal>
    </ChakraTooltip.Root>
  )
})
