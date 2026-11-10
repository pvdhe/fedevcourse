# Winc recipes

Een receptenapp voor het React Fundamentals-project, gemaakt met React, Vite en Chakra UI.

## Starten

Voer in de projectmap uit:

```bash
npm install
npm run dev
```

Open het lokale adres dat Vite in de terminal toont. Als PowerShell `npm.ps1` blokkeert, gebruik dan `npm.cmd` in plaats van `npm`.

## Functies

- Een overzicht van twintig recepten met afbeeldingen, dieetlabels en waarschuwingen.
- Zoeken op receptnaam of gezondheidslabel, zonder onderscheid tussen hoofdletters en kleine letters.
- Een extra filter voor veganistische, vegetarische en pescetarische recepten.
- Een detailpagina met ingrediënten, porties, bereidingstijd en totale voedingswaarden.
- Responsive opmaak en een knop voor licht en donker. Bij het eerste bezoek volgt het thema de systeemvoorkeur; een eigen keuze wordt lokaal bewaard.

De zoektekst en het dieetfilter werken samen. Bij teruggaan vanuit een recept wordt het overzicht opnieuw geopend met lege filters.

## Gegevens en opbouw

De meegeleverde Edamam-gegevens staan in `src/utils/data.js`. Er worden geen live receptgegevens uit een API opgehaald. De afbeeldingen komen wel van externe websites en vereisen een internetverbinding.

`App.jsx` bewaart het geselecteerde recept in state en toont `RecipeListPage` of `RecipePage`. Er wordt geen router gebruikt. De gedeelde kleuren staan in `src/theme.js`.

De voedingswaarden gelden voor het volledige recept, niet per portie. Een bereidingstijd van 0 wordt weergegeven als `N/A`. Aan de ingrediëntregels zijn vaste IDs toegevoegd voor stabiele React-keys.

## Code controleren en bouwen

```bash
npm run lint
npm run build
npm run preview
```

Lint controleert de broncode. Build maakt de productieversie in `dist`; preview laat deze versie lokaal zien.

## AI-verantwoording

Het gebruik van AI, de wijzigingen en de uitgevoerde controles staan in [AI-verantwoording.md](AI-verantwoording.md).
