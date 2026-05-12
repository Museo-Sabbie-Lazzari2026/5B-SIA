## Schede tecniche più compatte (tablet + mobile)

File: `public/museo/index.html` (CSS inline)

1. **Tablet (≤768px)** — riga 1812-1814: rimuovere l'override che imposta `.metadata-grid` a `1fr`. Mantenere 2 colonne (`1fr 1fr`) come desktop, ma con `gap` più stretto (`0.5rem`).

2. **Mobile (≤640px)**: aggiungere blocco dedicato per `.metadata-grid` e `.metadata-item`:
   - `grid-template-columns: 1fr 1fr` (2 colonne → 4 a sinistra, 4 a destra)
   - `gap: 6px`
   - `.metadata-item` / `.metadata-item--colored`: padding ridotto (`0.55rem 0.65rem`), border-radius più piccolo
   - `.metadata-label`: font-size `0.58rem`
   - `.metadata-value`: font-size `0.78rem`, line-height compatta
   - Eventuali immagini di sfondo (`metadata-item__bg`) restano ma con item più basso.

3. Nessuna modifica a struttura HTML né JS.