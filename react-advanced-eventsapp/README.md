# Winc Events

## Back-end starten voor de evenementenapp

De cursusgegevens staan in `events.json`, afkomstig uit de [WincAcademy-opdracht](https://github.com/WincAcademy/fe-react-advanced/blob/main/backend_data/events.json).

Op deze computer is JSON Server 0.17.4 globaal beschikbaar. Start vanuit deze projectmap in een aparte terminal:

```powershell
json-server.cmd --watch events.json --host 127.0.0.1
```

In PowerShell gebruiken we `.cmd` om blokkering van het PowerShell-script te voorkomen. `--watch` laat de server wijzigingen in het bestand volgen. Houd de terminal open zolang je de API gebruikt; stoppen kan met Ctrl+C.

De API-adressen zijn:

- Evenementen: http://127.0.0.1:3000/events
- Gebruikers: http://127.0.0.1:3000/users
- Categorieën: http://127.0.0.1:3000/categories

De starter bevat negen evenementen, drie gebruikers en drie categorieën. De evenementen met IDs 6 en 8 verwijzen naar gebruikers met IDs 5 en 6 die ontbreken in het bestand. De oorspronkelijke gegevens zijn behouden; de app moet bij het tonen van een organisator rekening houden met ontbrekende gebruikers.

Start de React-app in een andere terminal met `npm.cmd run dev` (voer bij een nieuwe installatie eerst `npm.cmd ci` uit). Open vervolgens het adres dat Vite toont.

De hoofdroute haalt evenementen en categorieën op met GET-verzoeken naar `http://localhost:3000/events` en `http://localhost:3000/categories`, ook bij het direct openen van een detailadres. Tijdens het ophalen verschijnen Chakra Skeleton-kaarten en een toegankelijke laadmelding; bij een fout verschijnt een foutmelding. Dezelfde placeholders worden gebruikt als de router opnieuw gegevens ophaalt.

`Root` plaatst `EventsProvider` rondom de navigatie en de pagina's. In `src/context/EventsContext.jsx` worden `events` en `categories` in state bewaard en via `EventsContext.Provider` gedeeld. De hook `useEvents()` geeft componenten toegang tot de gegevens en de opslag- en verwijderfuncties. Na een geslaagd serververzoek wordt de gedeelde lijst bijgewerkt. Als de router nieuwe gegevens ophaalt, neemt de Provider die over.

Het overzicht toont titel, beschrijving, afbeelding, begin- en eindtijd en categorienamen. Elk lijstitem linkt naar `/event/:eventId`. De detailpagina kiest met `useParams()` het juiste evenement uit de Context en toont daarnaast de locatie en een teruglink. Bij een lege locatie verschijnt Not specified; een onbekend evenement krijgt een foutmelding. Beide pagina's koppelen categorie-IDs aan de gedeelde categorienamen en tonen tijden in de lokale tijdzone van de browser.

## Evenementen zoeken

De navigatie bevat ook **About Us**, een derde pagina op `/about`. Deze gebruikt React Router en de gedeelde pagina-indeling en toont voorlopig: “This page is currently under construction.”

Op het overzicht filtert **Search events** tijdens het typen op titel of beschrijving. Hoofdletters en spaties aan het begin en einde worden genegeerd. Een leeg zoekveld legt geen beperking op aan de zoekresultaten. Zoeken gebeurt in de al opgehaalde gegevens en verstuurt geen extra API-verzoeken.

Onder **Filter by category** kun je meerdere categorieën aanvinken. Een evenement blijft zichtbaar als het bij minstens één geselecteerde categorie hoort én aan de zoektekst voldoet. Zonder aangevinkte categorieën zijn alle categorieën toegestaan. Vink de gekozen categorieën weer uit om het filter op te heffen. Zonder overeenkomsten verschijnt een melding; een evenement met meerdere passende categorieën wordt eenmaal getoond.

Onder **Sort events** kies je titel A–Z (standaard), titel Z–A, startdatum oplopend of startdatum aflopend. De sortering wordt toegepast op de zoek- en filterresultaten, zonder extra serververzoeken of wijziging van de gedeelde gegevens. De datumopties nemen ook evenementen uit het verleden mee. Bij gelijke starttijden volgt een alfabetische volgorde. Bij opnieuw openen van het overzicht staat de keuze weer op titel A–Z.

## Nieuw evenement toevoegen

Klik in de navigatie op **Add Event**. De Chakra UI-modal bevat een formulier met React Hook Form voor titel, beschrijving, een afbeeldings-URL, locatie, begin- en eindtijd en één of meer categorieën. Alle velden zijn verplicht en hebben expliciete `required`-attributen. Bij categorieën is minstens één keuze verplicht, zonder dat elk vakje aangevinkt moet worden. De eindtijd moet na de begintijd liggen. De afbeeldings-URL moet met http of https beginnen.

De categorieën komen uit de gedeelde Context; de modal doet daarvoor geen afzonderlijk GET-verzoek. De lokale datum- en tijdinvoer wordt voor opslag omgezet naar UTC. Omdat de app nog geen accounts heeft, gebruikt een nieuw evenement de bestaande demo-maker Michael Turner (`createdBy: 1`). Bij bewerken van een eerder evenement zonder locatie moet je nu een locatie invullen voordat je kunt opslaan.

**Save event** verstuurt een POST-verzoek naar `/events`. JSON Server kent een ID toe en bewaart het evenement in `events.json`. Na opslaan sluit de modal, verschijnt een bevestiging en wordt het overzicht vernieuwd. Bij een serverfout blijft de invoer behouden. Tijdens opslaan zijn invoer en sluiten geblokkeerd. **Cancel**, Escape en klikken buiten de modal sluiten het formulier wanneer er geen opslag loopt; bij opnieuw openen zijn de velden leeg.

## Een evenement bewerken

Op de detailpagina opent **Edit Event** hetzelfde formulier, vooraf ingevuld met de bestaande titel, beschrijving, afbeeldings-URL, locatie, tijden en categorieën. De tijden worden voor de invoervelden omgezet naar lokale tijd, met de juiste zomer- of wintertijd. **Save changes** verstuurt de gewijzigde velden met PATCH naar `/events/:eventId`. Het bestaande ID en de maker blijven behouden.

Na succesvol opslaan werkt de Provider de gedeelde lijst bij met het serverantwoord. De modal sluit en er verschijnt een bevestiging. De detailpagina leest de bijgewerkte gegevens direct uit de Context. Bij opnieuw openen gebruikt het formulier de actuele gegevens. Annuleren verstuurt geen opslagverzoek; bij een serverfout blijft de invoer staan. De gedeelde modal staat in `src/components/EventDialog.jsx`; omzetting van tijden en API-opslag staan in `src/utils/eventForm.js`.

## Een evenement verwijderen

Op de detailpagina opent **Delete Event** een bevestigingsmodal met de evenementtitel. **Cancel** sluit de modal zonder verzoek. Bevestigen verstuurt DELETE naar `/events/:eventId`. Na succes verschijnt een bevestiging en opent de router het vernieuwde overzicht. Het evenement is dan ook uit `events.json` verwijderd.

Tijdens verwijderen zijn bevestigen en sluiten geblokkeerd. Bij een fout blijft de modal open met een melding, zodat je opnieuw kunt proberen of annuleren. De modal geeft bij openen eerst focus aan **Cancel**.

## Meldingen bij wijzigingen

Toevoegen, bewerken en verwijderen tonen elk een sluitbare succes- of fouttoast via de gedeelde Chakra Toaster. Succes wordt pas gemeld na een geslaagd serververzoek. Bij een opslag- of verwijderfout blijft de uitleg ook in de modal zichtbaar; de ingevulde velden blijven behouden. Validatiefouten worden bij de betreffende formuliervelden getoond.

## Responsive opmaak en controles

De huisstijl volgt CSS-Advanced en de receptenapp: ruime witruimte, grote koppen, afgeronde witte panelen, ronde knoppen en een header en footer met de sitenaam. Het palet combineert helderblauw (`#2563eb`), zachte blauwe accenten (`#dbeafe`) en een licht blauwgrijze achtergrond (`#f3f7fc`). De gedeelde kleuren staan in `src/theme.js`; de sitenaam en browsertitel zijn Winc Events.

Het overzicht toont één kolom op mobiel, twee vanaf md (768px) en drie vanaf lg (1024px). De detailpagina houdt foto en informatie op mobiel en tablet onder elkaar en zet ze vanaf lg naast elkaar. Onder 640px opent een hamburgerknop het standaard gesloten navigatiemenu; vanaf 640px staan de links altijd zichtbaar in de header. De knop ondersteunt Enter en spatie; Escape sluit het geopende menu en herstelt de focus op de knop. Een navigatielink kiezen sluit het menu eveneens. Mobiele detailacties vullen de breedte. Pagina's gebruiken kleinere marges op mobiel, afbeeldingen schalen mee en lange woorden mogen afbreken. Modals hebben kleinere mobiele marges en een dynamische maximumhoogte; formulieren en de bevestigingsmodal kunnen intern scrollen. Tekstvelden gebruiken 16px tekst en minimaal 44px hoogte. De navigatie heeft een toegankelijke naam en ruime aanraakvlakken.

De uitgevoerde controles staan in [Testverslag.md](Testverslag.md). De productieversie is op 26 november 2026 in een geïsoleerde headless Chrome-sessie op zeven breedtes gecontroleerd, aangevuld met beoordeling van screenshots en contrastchecks. Dit vervangt geen controle op fysieke apparaten of in andere browsers.

## Code controleren en bouwen

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

De persoonlijke AI-verantwoording wordt lokaal in `AI-verantwoording.md` bijgehouden en is uitgesloten van Git.


## Beschikbare categorieën

De categorieën in events.json staan alfabetisch: art & culture (1), food & drinks (2), games (3), music (4), relaxation (5), sports (6) en workshops (7). Filters en de toevoeg-/bewerkformulieren halen deze lijst dynamisch van de server. Vernieuw de pagina nadat je de categorieën in het bestand wijzigt. Bij het hernummeren zijn de categorie-IDs van alle bestaande evenementen mee aangepast, zodat hun categorienamen behouden blijven.
