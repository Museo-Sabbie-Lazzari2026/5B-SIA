## Modifiche

1. **Rimuovere link Erjon**
   - In `public/museo/index.html`: ripristinare "Erjon" come testo semplice nel footer crediti.
   - Eliminare `public/museo/erjon.html`.

2. **Salvare il video**
   - Copiare il video caricato in `public/museo/videos/easter-egg.mp4`.

3. **Bottone easter egg sul campione 667**
   - Modificare `public/dettaglio.js`: se `c.id === 667`, aggiungere un piccolo bottone a forma di uovo (forma ovale CSS, emoji 🥚, posizionato in alto a destra dell'header del dettaglio o accanto al titolo) che linka a `easter-egg.html`.
   - Stile discreto ma visibile, con leggera animazione hover.

4. **Pagina easter-egg**
   - Creare `public/museo/easter-egg.html` con:
     - Domanda: *"Chi è la bidella migliore del Lazzari?"*
     - Input testo + bottone "Sblocca"
     - Validazione client: se `risposta.trim().toLowerCase() === "maria"` → mostra `<video controls autoplay>` con `videos/easter-egg.mp4`
     - Altrimenti messaggio "Risposta sbagliata, riprova"
     - Link "← Torna al campione" che riporta a `dettaglio.html?id=667`
   - Stile coerente con il resto del museo (CSS inline come fatto per le altre pagine).
