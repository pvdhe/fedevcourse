import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from './components/ui/provider'
import { App } from './App.jsx'

// We koppelen React aan het root-element uit index.html en tonen daarin de app.
// StrictMode helpt tijdens ontwikkeling mogelijke problemen zichtbaar te maken.
// Provider geeft alle componenten toegang tot Chakra UI en de themakeuze.
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider>
            <App />
        </Provider>
    </StrictMode>,
);
