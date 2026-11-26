import React from 'react';
import ReactDOM from 'react-dom/client';
import { EventPage } from './pages/EventPage';
import { AboutPage } from './pages/AboutPage';
import { EventsPage, EventsPageError } from './pages/EventsPage';
import { EventsPageLoading } from './components/EventsLoading';
import { Provider } from './components/ui/provider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import { eventsLoader } from './loaders/eventsLoader';

// De router kiest een pagina op basis van het adres in de browser.
// Root blijft als gedeelde indeling zichtbaar rondom de onderliggende pagina's.
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        // Laad de gedeelde data voor alle pagina's en initialiseer daarmee de EventsProvider in Root.
        loader: eventsLoader,
        hydrateFallbackElement: <EventsPageLoading />,
        errorElement: <EventsPageError />,
        children: [
            {
                // De informatiepagina gebruikt dezelfde navigatie en indeling als de evenementenpagina's.
                path: '/about',
                element: <AboutPage />,
            },
            {
                path: '/',
                element: <EventsPage />,
            },
            {
                // eventId is het variabele deel van het adres, bijvoorbeeld 1 in /event/1.
                path: '/event/:eventId',
                element: <EventPage />,
                // De detailpagina kiest dit evenement uit de gedeelde Context.
            },
        ],
    },
]);

// Plaats de app in het root-element uit index.html.
// StrictMode helpt tijdens ontwikkeling om mogelijke problemen op te sporen.
// Provider levert het Chakra-thema en de kleurmodus aan de hele app.
// RouterProvider maakt de hierboven ingestelde routes beschikbaar.
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);
