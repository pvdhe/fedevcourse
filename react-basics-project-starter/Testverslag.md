# Testverslag

Gecontroleerd op 10 november 2026, na de laatste tekst- en codecorrecties.

De productiebuild is automatisch getest met Playwright en Google Chrome, met een tijdelijk testscript buiten de uiteindelijke projectbestanden. De screenshots zijn daarnaast visueel bekeken. Er zijn geen testpakketten aan de projectdependencies toegevoegd.

| Controle | Resultaat |
| --- | --- |
| Alle twintig recepten in het overzicht | Geslaagd |
| Zoeken op naam en gezondheidslabels, inclusief hoofdletters en spaties | Geslaagd |
| Vegan: 4, Vegetarian: 10 en Pescetarian: 12 recepten zonder zoektekst | Geslaagd |
| Combinatie van zoeken en dieetfilter; filters uitzetten | Geslaagd |
| Geen resultaten en enkelvoud bij één resultaat | Geslaagd |
| Alle twintig detailpagina's: juiste naam, alle ingrediëntregels en zes voedingswaarden met eenheden | Geslaagd |
| Bereidingstijd 0 weergegeven als N/A | Geslaagd |
| Recept openen via de fotopositie, Enter en spatie | Geslaagd |
| Terugknop en naar boven scrollen bij openen | Geslaagd |
| Overzicht en details op 320, 375, 768, 1024 en 1440px | Geen horizontale overflow |
| Eén, twee of drie overzichtskolommen op de juiste breedtes | Geslaagd |
| Licht/donker wisselen en keuze bewaren na herladen | Geslaagd |
| OS-thema bij eerste bezoek en systeemwijziging zonder opgeslagen eigen keuze | Geslaagd |
| Donker overzicht en details op 320, 768 en 1440px | Geen horizontale overflow |
| Alle twintig receptafbeeldingen geladen | Geslaagd |
| Browserconsole tijdens de functionele tests | Geen fouten of waarschuwingen |
| Code-, commentaar- en tekstcontrole | Uitgevoerd; kleine correcties verwerkt |
| ESLint | Geslaagd |
| Productiebuild | Geslaagd; waarschuwing over JavaScript-bundelgrootte |

De screenshots zijn bekeken op onder andere de mobiele overzichts- en detailpagina in donker thema en het desktopoverzicht in licht thema. De test simuleert schermbreedtes; er is niet op fysieke telefoons of in Safari en Firefox getest. Er is geen volledige toegankelijkheidsaudit uitgevoerd.

De receptafbeeldingen blijven afhankelijk van externe websites. De bundelgroottewaarschuwing is geen buildfout; optimalisatie daarvan is voor deze cursusopdracht niet toegevoegd.
