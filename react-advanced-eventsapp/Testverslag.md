# Testverslag

Project: Winc Events — React Events App Project.

Laatste uitgebreide functionele controle: **17 november 2026**. Laatste productiebuild en visuele eindcontrole: **26 november 2026**.

Laatste handmatige bevestiging: **26 november 2026**. Toevoegen, bewaren na vernieuwen, bewerken, categorie wijzigen, sorteren, categoriefilter en verwijderen zijn door de leerling getest en als werkend bevestigd. De verwijdertest omvat annuleren, bevestigd verwijderen, de succesmelding en wegblijven na vernieuwen. Ook de productiebuild en visuele eindcontrole na de centrale huisstijlaanpassingen zijn nu afgerond; zie de eindcontrole van 26 november onderaan. Eerdere vermeldingen van openstaande controles beschrijven de historische status.

## Uitkomst

De functionele tests zijn afgerond en succesvol: **14 testgroepen slagen**. Zes automatische toegankelijkheidschecks vinden geen overtredingen binnen de gecontroleerde regels. ESLint, productiebuild en HTTP-controles van de productieversie slagen. Er zijn bij deze testronde geen nieuwe functionele fouten gevonden en geen applicatiecode gewijzigd.

De afgesproken handmatige screenshotronde is **afgerond op 18 november 2026**. De aangeleverde beelden van het overzicht, de detailpagina en de drie modals laten geen opmaakproblemen zien die aanpassingen vereisen. Scrollbereikbaarheid van de lange pagina en formulieren is door de leerling bevestigd. Dit is geen volledige controle van fysieke apparaten of alle browsers; de resterende beperkingen staan hieronder.

## Testmethode

De daadwerkelijke componenten, Chakra-provider, React Router, Context en React Hook Form zijn gemount in JSDOM met React Testing Library en user-event. Tests bedienen de gerenderde velden, links, checkboxen en knoppen. Ze controleren de DOM, API en navigatiestatus. JSDOM berekent geen echte schermindeling; dit zijn componentintegratietests, geen echte browsertests.

Succesvolle POST-, PATCH- en DELETE-verzoeken zijn tegen de lokale JSON Server uitgevoerd. Fouten en vertragingen zijn nagebootst in de test. Alle mutaties betroffen een eigen evenement met een unieke QA-titel. Dat is opgeruimd. De negen oorspronkelijke evenementen zijn inhoudelijk behouden en er staan geen QA-testrecords meer in de API.

De testhulpmiddelen en scripts staan tijdelijk in de Windows-tempmap. Er zijn geen testdependencies aan het cursusproject toegevoegd. De eerste testpoging raakte een geheugenlimiet. Na aanpassing van de testomgeving en uitschakelen van niet-uitgevoerde JSDOM-animaties zijn de volledige tests geslaagd. Een verband met het door de leerling gemelde vastlopen van VS Code is niet vastgesteld.

## Functionele controles

| Testgroep | Gecontroleerd | Resultaat |
| --- | --- | --- |
| 1. Overzicht | Alle negen evenementen en toegankelijke detail-links laden | Geslaagd |
| 2. Zoeken/filteren | Titel, beschrijving, hoofdletters, spaties, meerdere categorieën, combinaties, geen resultaten en filter opheffen | Geslaagd |
| 3. Navigatie/details | Drie pagina's, detailgegevens, locatie, teruglink en onbekend evenement | Geslaagd |
| 4. Validatie | Leeg formulier, zes required-velden, geen categorie, ongeldige URL en eindtijd vóór begintijd versturen geen POST | Geslaagd |
| 5. Toevoegen | POST-fout toont foutmelding/toast en behoudt invoer; retry slaat op en werkt Context en overzicht bij | Geslaagd |
| 6. Opslag loopt | Invoer en annuleren zijn geblokkeerd; Escape sluit niet tijdens opslaan | Geslaagd |
| 7. Toevoegen annuleren | Opnieuw openen geeft lege velden; annuleren verstuurt geen POST | Geslaagd |
| 8. Bewerken | Velden/categorieën vooraf ingevuld; PATCH-fout behoudt invoer; retry werkt detail/server bij met behoud van maker | Geslaagd |
| 9. Bewerken heropenen | Actuele waarden verschijnen; annuleren wijzigt opgeslagen gegevens niet | Geslaagd |
| 10. Verwijderen | Bevestiging, annuleren zonder DELETE, fout zonder redirect, retry, succesmelding en terugkeer naar overzicht | Geslaagd |
| 11. Direct detailadres | /event/3 laadt gedeelde data en vervangt skeletons door details | Geslaagd |
| 12. Toetsenbord | Een gefocuste evenementlink opent met Enter de juiste pagina | Geslaagd |
| 13. Lege database | Een lege evenementenlijst geeft een duidelijke melding | Geslaagd |
| 14. Laadfout/herstel | GET-fout geeft foutpagina; opnieuw ophalen na herstel toont overzicht | Geslaagd |

De toastcontrole registreert aanroepen aan de echte gedeelde toaster in de gerenderde componenttest. Dit controleert de gekozen melding, maar niet de visuele weergave op een fysiek scherm.

## Overige controles

| Onderdeel | Uitkomst |
| --- | --- |
| ESLint | Geslaagd zonder fouten of waarschuwingen |
| Productiebuild | Geslaagd; bestaande waarschuwing over JavaScript-bundel groter dan 500 kB |
| Productieserver | HTTP 200 voor /, /event/3, /about en JavaScript-bundel |
| Externe afbeeldingen | Alle negen oorspronkelijke afbeeldingsadressen geven HTTP 200 en image/jpeg of image/png |
| Data | Negen unieke IDs, gevulde detailvelden, geldige tijden en bestaande categorie-koppelingen |
| Tijdzone | UTC naar lokale tijd en terug klopt voor zomer- en wintertijd in Europe/Amsterdam |

Een bereikbaar afbeeldingsadres bewijst niet dat de afbeelding in de browser correct wordt weergegeven. De 404 die bij een tijdelijke testafbeelding op example.com werd gevonden, hoorde uitsluitend bij het verwijderde QA-evenement.

## Geautomatiseerde toegankelijkheid

Axe-core is uitgevoerd op het overzicht, About Us, de detailpagina, het toevoegformulier, het formulier met validatiefouten en de verwijderbevestiging. Alle zes controles vinden **0 overtredingen** binnen de geselecteerde WCAG 2/2.1 A/AA-regels.

Kleurcontrast is uitgesloten van deze DOM-audit omdat JSDOM geen betrouwbare visuele layout levert. Tijdens de eerdere kleurcontrole haalden de geselecteerde tekst-, knop- en badgekleurparen minimaal 4,5:1. Witte tekst op het huidige helderblauw (#2563eb) haalt 5,17:1. Axe gaf drie meldingen over de ontbrekende canvasfunctie van JSDOM; dat zijn testomgevingsbeperkingen. Dit is geen volledige toegankelijkheidsaudit of verklaring van WCAG-conformiteit.

## Nog open: visuele browsercontrole

De browserkoppeling meldt The browser access host is unavailable. De native Chrome-toegang meldde een geminimaliseerd venster; de beschikbare launch-functie verhielp dat niet. Er is gevraagd Chrome zichtbaar te maken. Tijdens deze testronde zijn geen geslaagde screenshots of echte browserinteracties verkregen.

Nog te beoordelen:

- Weergave op 320, 375, 768 en 1440px en afwezigheid van horizontale overflow.
- Aansluiting van afbeeldingen op de kaartrand en uitsnede van foto's.
- Modalhoogtes, scrollgedrag, focusverplaatsing en zichtbaarheid van toasts op een echt scherm.
- Browserconsole, daadwerkelijke afbeeldingsweergave en praktisch schermlezergebruik.
- Andere browsers en fysieke mobiele apparaten.

De functionele tests zijn dus succesvol afgerond; de visuele eindcontrole blijft open.

## Aanvullende responsive wijzigingen — 17 november 2026

De mobiele navigatie heeft nu drie gelijk verdeelde acties op een eigen regel. De detailpagina houdt foto en informatie op mobiel en tablet onder elkaar en plaatst ze vanaf lg naast elkaar. Mobiele detailacties en verwijderbevestigingsknoppen vullen de breedte. Modals hebben kleinere mobiele buitenmarges, een maximumhoogte op basis van 100dvh en krimpbare, scrollbare inhoud. Tekstvelden gebruiken 16px tekst en aanraakvlakken van minimaal 44px; formuliercheckboxen hebben eveneens een grotere aanklikbare hoogte.

Lint en productiebuild slagen na deze wijzigingen. De bestaande bundelgroottewaarschuwing blijft. De lokale Vite- en JSON Server-processen zijn na de herstart opnieuw gestart. Een eerdere native browserpoging werd door Computer Use gestopt omdat de huidige browser-URL niet betrouwbaar vastgesteld kon worden. Er was toen nog geen geslaagde screenshotcontrole; de responsive wijzigingen zijn dus nog niet visueel goedgekeurd.

Na de melding dat Chrome zichtbaar openstond, is de native browsertoegang opnieuw geprobeerd. De browserboom bevestigt dat http://127.0.0.1:5173/ is geladen en alle negen evenementen, navigatie, zoekveld en categorieën bevat. Beide schermopnamepogingen eindigden met window capture timed out. Dit bevestigt browserinhoud, maar levert geen visuele beoordeling van de indeling op.

Alle 14 componenttestgroepen en zes axe-checks zijn na de responsive wijzigingen opnieuw geslaagd. Deze testronde is uitgevoerd met begrensd geheugen en zonder een andere zware test tegelijk. Eigen QA-data is weer opgeruimd. Een aanvullende broncodecontrole met de echte Chakra-breakpoints bevestigt de beoogde instellingen:

| Breedte | Overzichtskolommen | Detailkolommen | Navigatie |
| --- | --- | --- | --- |
| 320px | 1 | 1 | Drie mobiele acties op een eigen regel |
| 375px | 1 | 1 | Drie mobiele acties op een eigen regel |
| 768px | 2 | 1 | Flexibele rij |
| 1024px | 3 | 2 | Flexibele rij |
| 1440px | 3 | 2 | Flexibele rij |

Deze tabel beschrijft gecontroleerde CSS-instellingen, geen gemeten browserlayout. Een eerste versie van het tijdelijke controlescript interpreteerde pixels ten onrechte als rem; na correctie van die testomrekening slagen de controles. De visuele controle op overflow, fotoaansluiting en kleine schermen blijft open.

## Mobiele hamburgernavigatie — 17 november 2026

De eerdere mobiele rij met drie acties is vervangen door een hamburgerknop onder 768px. De knop opent en sluit een verticaal menu, toont bij openen een sluitpictogram en heeft aria-expanded en aria-controls. Vanaf 768px blijft de navigatie zichtbaar. Een gekozen navigatielink sluit het mobiele menu; Escape sluit het met focusherstel naar de knop. De eerdere tabel beschrijft dus de navigatie vóór deze vervanging.

Een gerichte test met de werkelijke componenten slaagt voor: standaard gesloten toestand, openen/sluiten, aria-attributen, Tab naar de eerste link, Enter op de knop, Escape met focusherstel, sluiten na navigatie en het openen/annuleren van Add Event vanuit het menu. Twee axe-checks voor gesloten en geopend menu vinden nul overtredingen binnen de geselecteerde regels, exclusief kleurcontrast. Lint en productiebuild slagen; de bestaande bundelgroottewaarschuwing blijft. Er is geen serverdata gewijzigd. De visuele schermcontrole blijft open.

De hamburgergrens is daarna op verzoek verlaagd van 768px naar 640px, zodat ook smallere tablets de gewone navigatie krijgen. Het centrale thema bevat daarvoor een aanvullend tablet-breakpoint; de bestaande Chakra-breakpoints zijn behouden. Controle van de gegenereerde Chakra-CSS bevestigt dat de hamburger vanaf 40rem (640px) wordt verborgen. Lint en build slagen. Dit is een code-/CSS-controle, geen visuele browsercontrole.

## Handmatige visuele controle met de leerling — 18 november 2026

De leerling heeft Chrome Device Mode gebruikt en screenshots aangeleverd. AI heeft de zichtbare gedeelten beoordeeld. Deze controle vult de eerder geblokkeerde schermopnamecontrole gedeeltelijk aan; onderstaande bevindingen vervangen voor die onderdelen de eerdere status dat er nog geen visueel bewijs was.

| Scherm | Breedtes | Bevinding en bewijs |
| --- | --- | --- |
| Overzicht, bovenste gedeelte | 320, 375, 639, 640, 768px | Screenshots tonen passende koppen, tekst, zoekveld en filters zonder zichtbare horizontale overloop |
| Navigatiegrens | 639 en 640px | Screenshots bevestigen hamburger bij 639px en gewone navigatie bij 640px |
| Overzichtskolommen | 320, 375, 639, 640px | Leerling bevestigt één kolom |
| Overzichtskaarten | 768, 1024, 1440px | Screenshots bevestigen respectievelijk twee, drie en drie kolommen; zichtbare afbeeldingen sluiten aan op de kaartranden |
| Detailpagina | 375, 768, 1440px | Screenshots tonen passende inhoud, mobiele gestapelde knoppen en twee kolommen op desktop; leerling bevestigt dat de overige gegevens op 375px door scrollen bereikbaar zijn |
| Add Event | 375, 768, 1440px | Screenshots tonen passende modals en leesbare velden; leerling bevestigt dat op alle drie breedtes naar Save event en Cancel kan worden gescrold |

In deze aangeleverde beelden zijn geen aanpassingen nodig gebleken. Dit is een beoordeling van de zichtbare gedeelten, aangevuld met de expliciete scrollbevestigingen van de leerling; het is geen automatische overflowmeting of test op fysieke apparaten.

De Edit Event-modal is daarna eveneens beoordeeld op screenshots van 375, 768 en 1440px. De zichtbare vooraf ingevulde velden passen binnen de modal; op 1440px is ook de geselecteerde categorie games zichtbaar. De lange afbeeldings-URL blijft op mobiel binnen het invoerveld. De leerling bevestigt dat Save changes en Cancel op alle drie breedtes door scrollen bereikbaar zijn. Er is op basis van deze beelden geen aanpassing nodig.

Tot slot is de Delete Event-bevestiging beoordeeld op screenshots van 375, 768 en 1440px. De evenementtitel, waarschuwing en beide knoppen zijn volledig zichtbaar. Op 375px staan de acties over de volle breedte onder elkaar; op tablet en desktop staan ze naast elkaar. De modal blijft binnen het scherm. Er is geen opmaakaanpassing nodig op basis van deze beelden.

De afgesproken screenshotronde voor overzicht, detailpagina, Add Event, Edit Event en Delete Event is hiermee afgerond. Dit is gebaseerd op screenshots en de expliciete scrollbevestigingen van de leerling. De beelden bewijzen niet dat daadwerkelijk verwijderen, opslaan of annuleren tijdens deze handmatige ronde is uitgevoerd; deze acties zijn eerder functioneel getest. Browserconsole, fysiek schermtoetsenbord, daadwerkelijk schermlezergebruik en andere browsers zijn hiermee niet gecontroleerd.

### Aanvullende huisstijlcontrole — 18 november 2026

De leerling heeft daarna screenshots van Events en About Us op 1024px vergeleken. Daaruit bleek een verschil in bovenruimte dat tijdens de eerdere ronde niet was opgemerkt. About Us gebruikte 64px bovenruimte, het overzicht 72px; ook de regelhoogte van de hoofdtitel verschilde. About Us gebruikt nu dezelfde buitenmarges en introductieruimte als Events: 40px totaal op mobiel en 72px vanaf 768px. Titelgrootte, regelhoogte (1.08), afstand tussen de blauwe tekst en hoofdtitel en de marge onder de hoofdtitel zijn gelijkgetrokken.

Ook de code van de detailpagina, gedeelde navigatie/footer, laadweergave en beide modalcomponenten is op kleuren, marges, knoppen en responsive instellingen nagekeken. Daar zijn geen verdere onbedoelde stijlverschillen vastgesteld die een aanpassing vereisen. Compactere detailkoppen en rode verwijderacties passen bij hun functie.

`npm.cmd run lint` en `npm.cmd run build` zijn geslaagd. De build geeft de bekende waarschuwing over een JavaScriptbundel groter dan 500kB. De eerste buildpoging werd door sandboxrechten geblokkeerd; de herhaling met ruimere rechten slaagde. Dit is een codecontrole met lint en build, geen nieuwe visuele browsercontrole na de wijziging. De aanvullende handmatige eindtest van toevoegen, bewerken en verwijderen door de leerling is nog niet gerapporteerd.

### Handmatig toevoegen en duidelijkere meldingen — 18 november 2026

De leerling heeft bevestigd dat een evenement succesvol is toegevoegd en dat een groene succesmelding verscheen. Eerder verscheen bij de gestopte JSON Server een foutmelding terwijl de formulierinvoer behouden bleef (screenshot leerling). Behoud na vernieuwen, bewerken, annuleren van verwijderen en bevestigd verwijderen zijn in deze aanvullende handmatige ronde nog niet gerapporteerd.

De leerling vond de succesmelding te ver naar rechts geplaatst en te snel verdwenen. De gedeelde Toaster is daarom aangepast naar bovenaan gecentreerd, een duur van 8000ms, een afgeronde witte kaart met statusicoon en een sluitknop met toegankelijk label en minimaal 44px aanraakvlak. Dit geldt ook voor bewerk-, verwijder- en foutmeldingen. Zonder een screenshot van de oorspronkelijke melding kan niet worden vastgesteld of de tekst toen ontbrak of alleen niet opviel.

Lint en productiebuild zijn geslaagd (bestaande bundelgroottewaarschuwing). Een afzonderlijke tijdelijke DOM-test met de echte Toaster controleerde succesvol de succesmeldingtekst, plaatsing bovenaan, zichtbaarheid na 5,5 seconden, handmatig sluiten en de titel/beschrijving van een foutmelding. De test verstuurde geen back-endverzoeken. De eerste testpogingen hadden een te vroege toastaanmaak en een dubbelzinnige sluitknopselectie tijdens de uitstapstatus; na corrigeren van die testselectie en initialisatiewacht slaagde de test. De nieuwe opmaak is nog niet visueel in Chrome beoordeeld.

### Sorteerfunctie — 18 november 2026

De leerling bevestigt dat beide zelf toegevoegde evenementen na vernieuwen blijven staan. Een screenshot toont bovendien de aangepaste succesmelding met leesbare tekst, groen statusicoon en sluitknop. Dit vult de eerdere openstaande handmatige controle van toevoegen en bewaren aan; de eigen bewerk-/verwijdertest is nog niet gemeld.

Op verzoek is Sort events toegevoegd via Chakra NativeSelect. Standaard is titel A–Z; de andere keuzes zijn titel Z–A en startdatum oplopend/aflopend. Sorteren gebeurt na zoeken en categorieën filteren, op een kopie van de resultaten. De gedeelde Context en servervolgorde veranderen niet. De datumkeuzes bevatten ook oude evenementen; gelijke starttijden worden alfabetisch geordend. De keuze keert bij opnieuw openen van het overzicht terug naar A–Z. Nederlandse codeopmerkingen en README zijn bijgewerkt.

Een tijdelijke DOM-test met de echte EventsPage en vaste, bevroren testgegevens slaagde voor: standaard A–Z (inclusief kleine letters), Z–A, beide datumrichtingen over verschillende jaren, meerdere categorieën, zoeken in beschrijvingen, veranderen van sortering met actieve filters, geen resultaten en behoud van de oorspronkelijke Contextvolgorde. Een axe-controle leverde nul overtredingen op; kleurcontrast is uitgesloten omdat JSDOM geen echte browserlayout biedt. Geen back-endverzoeken of wijzigingen aan de evenementen tijdens deze test.

Lint en productiebuild zijn geslaagd. De bekende bundelgroottewaarschuwing blijft bestaan. De nieuwe bediening gebruikt volledige veldbreedte en de bestaande responsive paneelindeling (één kolom op mobiel, twee vanaf 768px), maar is nog niet opnieuw visueel in Chrome beoordeeld.

### Handmatige bevestiging sorteren en categoriefilter — 18 november 2026

De leerling meldt dat de sorteerfunctie handmatig is getest en werkt. Ook het categoriefilter is daarbij getest en werkt volgens de leerling. Dit is een gebruikersbevestiging van de werking; er zijn geen nieuwe screenshots, specifieke testcombinaties of schermbreedtes aangeleverd. De aanvullende eigen bewerk- en verwijdertest is nog niet gerapporteerd.

### Gelijke en selecteerbare paneellabels — 18 november 2026

De leerling toonde een screenshot waarop Search events en Sort events niet meeselecteren met de overige paginatekst. In de geïnstalleerde Chakra Field-recipe is vastgesteld dat labels standaard textStyle sm en userSelect none krijgen. De filterlegenda erfde de normale tekstgrootte. Alle drie hebben nu expliciet fontSize md, lineHeight 1.5, fontWeight medium en userSelect text. De semantische label- en legend-elementen en veldkoppelingen blijven behouden. Nederlandse opmerkingen lichten dit toe.

Lint en productiebuild zijn geslaagd, met de bestaande bundelgroottewaarschuwing. Dit is een codecontrole; selecteren met de muis en de nieuwe labelopmaak zijn na de wijziging nog niet visueel in Chrome gecontroleerd. Geen servergegevens gewijzigd.

### Handmatige bevestiging Edit Event — 18 november 2026

De leerling bevestigt dat Edit Event handmatig is getest en werkt. Er is niet afzonderlijk bevestigd dat de bewerking na vernieuwen behouden blijft of welke melding zichtbaar was. De eigen verwijdertest is nog niet gerapporteerd. Dit betreft een gebruikersbevestiging; er zijn hiervoor geen nieuwe automatische tests uitgevoerd.

### Handmatige vervolgcontrole Edit Event — 18 november 2026

De leerling bevestigt nu ook vernieuwen na Edit Event en Cancel te hebben getest. Daarmee zijn behoud van de opgeslagen bewerking na vernieuwen en annuleren van de bewerkmodal handmatig bevestigd door de leerling. De aanvullende eigen verwijdertest is nog niet gerapporteerd. Geen nieuwe automatische tests uitgevoerd voor deze bevestiging.

### Vier aanvullende categorieën — 18 november 2026

Op verzoek zijn music (4), food & drinks (5), art & culture (6) en workshops (7) toegevoegd aan events.json. De bestaande categorieën en evenementkoppelingen blijven behouden. De JSON is succesvol ingelezen en GET /categories geeft alle zeven categorieën terug. De bestaande dynamische filter- en formuliercode gebruikt deze API-lijst. Vernieuwen van de pagina haalt de nieuwe lijst op. Geen nieuwe visuele controle uitgevoerd; JSON ondersteunt geen commentaar, daarom staat de Nederlandse toelichting in de documentatie.

### Categorieën alfabetisch hernummeren — 18 november 2026

Op verzoek staan de categorieën nu alfabetisch met IDs: art & culture 1, food & drinks 2, games 3, music 4, relaxation 5, sports 6 en workshops 7. De categoryIds van alle twaalf aanwezige evenementen zijn via een oud-naar-nieuw-ID-koppeling aangepast. Een controle voor het schrijven bevestigde dat elk evenement exact dezelfde categorienamen en volgorde behoudt. GET /categories bevestigt de nieuwe alfabetische volgorde en IDs. README is bijgewerkt. JSON ondersteunt geen commentaar; de Nederlandse toelichting staat hier. Vernieuw de pagina voor het volgende gebruik van filters of formulieren, zodat de Context de nieuwe IDs ophaalt.

### Handmatige categorieaanpassing Tomorrowland — 18 november 2026

De leerling bevestigt dat het eigen Tomorrowland-evenement via Edit Event van relaxation naar music is gewijzigd en opgeslagen. Na vernieuwen wordt music nog steeds correct getoond. Daarmee zijn categorie wijzigen, opslaan en behoud na vernieuwen handmatig bevestigd. Dit is de melding van de leerling; geen nieuwe automatische tests of wijzigingen door AI uitgevoerd.

### Handmatige eindtest Delete Event — 26 november 2026

De leerling heeft een eigen evenement met titel Test en categorie workshops aangemaakt en screenshots van de overzichtskaart en detailpagina aangeleverd. Daarna is Delete Event geopend; de bevestiging noemt Test en toont de waarschuwing en beide knoppen. De leerling bevestigt dat Cancel de modal sluit en terugkeert naar de details, met behoud van het evenement.

Bij vervolgens bevestigd verwijderen verscheen de succesmelding Event deleted successfully. (screenshot leerling) en was Test uit het overzicht verdwenen. De leerling bevestigt dat Test ook na vernieuwen wegblijft. Daarmee is de volledige aanvullende handmatige verwijdertest geslaagd. AI heeft tijdens deze bevestiging alleen documentatie bijgewerkt en geen evenement verwijderd of nieuwe automatische tests uitgevoerd. De resterende productiebuild en visuele eindcontrole van de centrale huisstijlaanpassingen zijn hiermee niet uitgevoerd.

### Productiebuild en visuele eindcontrole — 26 november 2026

**Uitkomst: afgerond en geslaagd voor de hieronder beschreven scope.** De controle betrof de productiebuild na de centrale huisstijlaanpassingen. De koppeling met de zichtbare browser kon niet starten door een ontbrekend runtimepad (failed to write kernel assets). Daarom is de bestaande Chrome-installatie in een afzonderlijke headless sessie met Playwright Core gebruikt. De testhulpmiddelen staan uitsluitend in de tijdelijke map; er zijn geen projectdependencies toegevoegd.

| Controle | Resultaat |
| --- | --- |
| ESLint | Geslaagd |
| Productiebuild | Geslaagd; JS circa 776,50kB, gzip 233,71kB; bestaande waarschuwing boven 500kB |
| Productiepreview | Werkende productiepagina's op 127.0.0.1:4173 |
| Schermbreedtes | 320, 375, 639, 640, 768, 1024 en 1440px, elk 900px hoog |
| Lage schermen | Aanvullend 320, 375 en 768px breed bij 652px hoogte |
| Pagina's en modals | Overzicht, About Us, details, Add Event, Edit Event, Delete Event en onbekend evenement op alle bovengenoemde formaten |
| Responsive gedrag | Geen horizontale paginaoverloop; 1/2/3 overzichtskolommen en hamburgergrens op 640px bevestigd |
| Introducties | Overzicht en About Us hebben dezelfde berekende titeltypografie en dezelfde bovenpositie van het introductieblok |
| Labels | Search, Sort, Filter en Add-formulierlabels/legenda delen 16px, gewicht 500, 24px regelhoogte en user-select: text |
| Invoervelden | Add-velden zijn vereist, hebben 16px tekst, minimaal 44px hoogte en 8px afronding |
| Modaltitels | Add, Edit en Delete hebben dezelfde berekende titelopmaak |
| Modalbereikbaarheid | Modals passen binnen de viewport; Save/Cancel zijn ook op 652px hoogte via intern scrollen bereikbaar |
| JavaScript | Geen pageerror-gebeurtenissen tijdens de zeven hoofdcontroles |
| Toegankelijkheid | 16 axe-checks in echt Chrome: 8 toestanden op 375 en 1440px, nul overtredingen binnen WCAG 2 A/AA en 2.1 AA-tags, inclusief kleurcontrast |

AI heeft screenshots van de mobiele, tablet- en desktopweergaven bekeken: overzicht, About Us, details, formulierboven- en onderkant, verwijderbevestiging, laadweergave, validatiefouten, serverfout en succesmelding. De titelposities, centrale formulieropmaak, afgeronde panelen en mobiele actieknoppen zijn consistent. Screenshotmeting gebeurde na afronding van de modalanimatie; de eerste meetpoging tijdens die animatie gaf een tijdelijk te kleine veldhoogte. De native Chrome-datumkiezer valt buiten de eigen componentopmaak, zoals eerder met de leerling besproken.

**Gevonden en opgelost:** de standaard fouttekstkleur #ef4444 had op wit een contrast van 3,76:1. In src/theme.js is fg.error centraal gewijzigd naar #b91c1c voor lichte modus en #fca5a5 voor donkere modus, met Nederlands commentaar. Daardoor volgen alle formulierfouten dezelfde beter leesbare kleur. Na de wijziging zijn lint, productiebuild en alle 16 browserchecks opnieuw geslaagd. Andere aanvankelijke contrastmeldingen verdwenen nadat de test expliciet op de eindtoestand van de modalanimatie wachtte. De volledige visuele controle betreft lichte modus; donkere modus is niet visueel goedgekeurd.

De 8 toegankelijkheidstoestanden per breedte waren: overzicht, Add met validatiefouten, detailpagina, Edit, Delete, succesmelding, About Us en serverfout. De laad- en fouttoestanden zijn via browserintercepties opgewekt. Het succesvolle PATCH-antwoord voor de toast is uitsluitend nagebootst binnen de testsessie; muterende verzoeken naar de echte server zijn geblokkeerd. Er zijn geen echte evenementen aangemaakt, bewerkt of verwijderd.

Bewijsbestanden en testscripts staan tijdelijk in %TEMP%\eventsapp-visual-check (results.json, results-short.json, audits.json en screenshots). Automatische controles en screenshotbeoordeling zijn aanvullend op de handmatige functietests van de leerling. Dit is geen volledige audit van fysieke apparaten, schermlezers, alle browsertypen of het besturingssysteemvenster van de datumkiezer. Voor de afgesproken productiebuild en visuele eindcontrole blijven geen punten open.

### Laatste controle aan de hand van de inleverchecklist — 26 november 2026

De aanvullende Winc-checklist is vergeleken met de eerdere functionele, handmatige en visuele controles: responsive opmaak zonder horizontale overloop, vooraf ingevulde bewerkvelden, succes-/foutmeldingen, zoeken op titel, categoriefilters, verwijderbevestiging en terugkeer naar het overzicht zijn gedekt. Verplichte invoer, geldige tijden, hoofdletterongevoelig zoeken en lege zoekresultaten zijn eveneens aanwezig en eerder getest.

Een extra gerichte consolecontrole is uitgevoerd op de productiepreview in geïsoleerd Chrome bij 375 en 1440px. Overzicht, About Us, details, Add met validatie, Edit/Cancel, Delete/Cancel, zoeken, categoriefilter en sortering leverden nul consolewaarschuwingen, consolefouten of pageerror-gebeurtenissen op. De eerste testactie op de verborgen checkbox-input is vervangen door een klik op het zichtbare label; daarna slaagde de controle. Muterende API-verzoeken waren geblokkeerd, er zijn geen servergegevens of applicatiecode aangepast. Het volledig invullen van het submissionformulier en opnieuw indienen na eventuele mentorfeedback blijven handelingen van de leerling.

### Eindcontrole Nederlands codecommentaar — 26 november 2026

De bronbestanden en configuratie zijn nagekeken op uitleg bij componentdoelen, datastroom, Context, API-verzoeken, formulieren, validatie, tijdzoneconversie, navigatie, sortering, huisstijl en foutweergaven. Ook de meegeleverde optionele kleurmodus- en tooltiponderdelen zijn toegelicht als starterhulpmiddelen.

In acht bronbestanden is commentaar aangevuld of verduidelijkt. Het foutcommentaar bij EventPageError noemt nu correct een ontbrekend route-ID in de opgehaalde lijst, en de navigatie na toevoegen noemt ook About Us. Verder zijn onder meer POST/PATCH, UTC-opslag, URL-validatie, formulierstatus, secondeninvoer, begin-/eindtijdvergelijking, Context-updates en toetsenbordfocus verduidelijkt. JSON-bestanden en het gegenereerde lockbestand bevatten geen commentaar, omdat JSON dat niet ondersteunt.

ESLint en git diff --check zijn geslaagd. Esbuild-verwerking zonder commentaar levert voor alle acht bestanden exact dezelfde JavaScript-code op als vóór de commentaarwijzigingen. De al aanwezige lokale formattering van EventPage.jsx was eveneens functioneel gelijk aan de GitHub-versie en is behouden. Er is geen functionele code gewijzigd; daarom zijn de functionele en visuele tests niet opnieuw uitgevoerd. De eerdere geslaagde eindcontroles blijven van toepassing.
