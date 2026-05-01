## Obiettivo
Nei crediti del footer del museo, rendere il nome **Erjon** un link cliccabile che apre una nuova pagina con scritto: *"Erjon ha svolto il 98% del lavoro"*.

## Modifiche

### 1. Creare una nuova pagina statica: `public/museo/erjon.html`
Pagina HTML autonoma, coerente con lo stile del museo (sfondo scuro, font sobrio), contenente:
- Titolo: "Erjon"
- Frase grande al centro: **"Erjon ha svolto il 98% del lavoro"**
- Un link "← Torna al museo" che riporta a `index.html`

### 2. Modificare `public/museo/index.html` (riga 2930)
Trasformare il testo "Erjon" in un link:

```html
<a href="erjon.html" style="color:inherit;text-decoration:underline;">Erjon</a>
&middot; Semir &middot; Emily &middot; Martina &middot; Anita
```

Il link apre la pagina nello stesso iframe (resta dentro `/museo/`), così tutto continua a funzionare con il setup attuale.

## Note
Nessuna modifica a route React, server o configurazione: si tratta solo di file statici dentro `public/museo/`.