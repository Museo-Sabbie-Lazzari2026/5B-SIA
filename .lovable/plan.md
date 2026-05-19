## Piano confermato

1. Copiare le immagini caricate in `public/images/`:
   - `microscopio/491.jpg` ← Santo Domingo
   - `microscopio/87.jpg` e `microscopio/88.jpg` ← Casalabate (stessa foto)
   - `microscopio/556.jpg` ← Golfo di Procchio
   - `campioni/110.jpg` ← Budelli_1 (vista d'insieme)
   - `microscopio/110.jpg`, `microscopio/110-2.jpg`, `microscopio/110-3.jpg` ← Budelli 2/3/4

2. Aggiornare `public/dati.json` per i 5 campioni (491, 87, 88, 556, 110) sostituendo `images/coming-soon.jpg` con i nuovi path. Per il 110 aggiungere il campo `microscopio_extra: ["images/microscopio/110-2.jpg", "images/microscopio/110-3.jpg"]`.

3. Aggiornare `public/dettaglio.js` per renderizzare, se presente, `microscopio_extra` come piccola galleria di thumbnail sotto la foto al microscopio principale (click → ingrandimento/scambio con la principale).

Clicca "Implementa il piano" per procedere.