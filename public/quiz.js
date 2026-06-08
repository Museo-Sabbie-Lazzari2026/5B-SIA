(function () {
  "use strict";

  var PASS_KEY = "museo-quiz-pass";

  var QUESTIONS = [
    {
      question:
        "Che cosa rende una sabbia composta soprattutto da quarzo molto resistente nel tempo?",
      options: [
        "La durezza del quarzo",
        "La presenza di plastica",
        "Il colore chiaro",
        "La temperatura dell'acqua",
      ],
      answer: 0,
      note: "Il quarzo resiste bene all'alterazione e resta spesso nei sedimenti.",
    },
    {
      question: "Una sabbia nera vulcanica deriva spesso dall'erosione di quale roccia?",
      options: ["Basalto", "Gesso", "Marmo", "Sale"],
      answer: 0,
      note: "Molte sabbie nere vengono da minerali scuri presenti in rocce basaltiche.",
    },
    {
      question: "Quale ambiente produce dune mobili modellate soprattutto dal vento?",
      options: ["Deserto", "Lago profondo", "Grotta calcarea", "Ghiacciaio interno"],
      answer: 0,
      note: "Il vento seleziona e sposta i granelli formando dune.",
    },
    {
      question: "Perche alcune sabbie tropicali sono molto chiare?",
      options: [
        "Contengono frammenti di conchiglie e coralli",
        "Sono sempre artificiali",
        "Sono fatte solo di ferro",
        "Sono dipinte dal sole",
      ],
      answer: 0,
      note: "I frammenti carbonatici biogenici possono dare colori chiari o bianchi.",
    },
    {
      question: "Che cosa si osserva meglio con l'immagine al microscopio di un campione?",
      options: [
        "Forma, colore e composizione dei granelli",
        "Solo il peso della sabbia",
        "La profondita del mare",
        "Il meteo del luogo",
      ],
      answer: 0,
      note: "Il microscopio aiuta a distinguere granuli, minerali e frammenti biologici.",
    },
    {
      question:
        "Una sabbia rosa puo essere collegata alla presenza di frammenti di quali organismi?",
      options: ["Foraminiferi", "Api", "Foglie di quercia", "Batteri luminosi"],
      answer: 0,
      note: "In alcune spiagge i gusci di foraminiferi contribuiscono alla colorazione rosa.",
    },
    {
      question: "Quale forza naturale arrotonda spesso i granelli su una spiaggia marina?",
      options: ["Moto ondoso", "Magnetismo terrestre", "Luce lunare", "Rumore"],
      answer: 0,
      note: "Onde e correnti urtano e levigano i granelli.",
    },
    {
      question: "Quale dato geografico aiuta a localizzare un campione nel museo digitale?",
      options: [
        "Paese e continente",
        "Numero di scarpe",
        "Orario della campanella",
        "Marca del microscopio",
      ],
      answer: 0,
      note: "Paese, continente, bacino e provenienza descrivono l'origine del campione.",
    },
    {
      question: "Una sabbia fluviale viene trasportata principalmente da:",
      options: ["Acqua corrente", "Vento solare", "Lava solidificata", "Fulmini"],
      answer: 0,
      note: "I fiumi trasportano sedimenti lungo il loro corso.",
    },
    {
      question: "Perche due sabbie dello stesso colore possono essere molto diverse?",
      options: [
        "Perche possono avere minerali e forme dei granelli differenti",
        "Perche il colore dice sempre tutto",
        "Perche una sabbia non cambia mai",
        "Perche tutte vengono dallo stesso luogo",
      ],
      answer: 0,
      note: "Il colore e solo un indizio: forma, origine e composizione possono cambiare molto.",
    },
  ];

  function shuffleOptions(question, index) {
    var options = question.options.map(function (text, originalIndex) {
      return { text: text, correct: originalIndex === question.answer };
    });
    var shift = (index * 2 + 1) % options.length;
    return options.slice(shift).concat(options.slice(0, shift));
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (ch) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[ch];
    });
  }

  function renderQuiz() {
    if (!window.MuseoAuth || !window.MuseoAuth.requireAuth()) return;
    var form = document.getElementById("quiz-form");
    var result = document.getElementById("quiz-result");
    if (!form) return;

    window.MuseoAuth.renderUserBox(document.getElementById("auth-user"));

    form.innerHTML = QUESTIONS.map(function (question, qIndex) {
      var answers = shuffleOptions(question, qIndex);
      return (
        '<fieldset class="quiz-question">' +
        "<legend><span>Domanda " +
        (qIndex + 1) +
        "</span>" +
        escapeHtml(question.question) +
        "</legend>" +
        answers
          .map(function (answer, aIndex) {
            var id = "q" + qIndex + "-a" + aIndex;
            return (
              '<label class="quiz-option" for="' +
              id +
              '">' +
              '<input type="radio" id="' +
              id +
              '" name="q' +
              qIndex +
              '" value="' +
              (answer.correct ? "1" : "0") +
              '" required>' +
              "<span>" +
              escapeHtml(answer.text) +
              "</span></label>"
            );
          })
          .join("") +
        '<p class="quiz-note" hidden>' +
        escapeHtml(question.note) +
        "</p></fieldset>"
      );
    }).join("");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var score = 0;
      var missing = false;

      QUESTIONS.forEach(function (_, index) {
        var selected = form.querySelector('input[name="q' + index + '"]:checked');
        if (!selected) missing = true;
        if (selected && selected.value === "1") score += 1;
      });

      if (missing) {
        result.className = "quiz-result error";
        result.textContent = "Rispondi a tutte le domande prima di consegnare.";
        return;
      }

      form.querySelectorAll(".quiz-note").forEach(function (note) {
        note.hidden = false;
      });

      if (score === QUESTIONS.length) {
        var session = window.MuseoAuth.readSession();
        localStorage.setItem(
          PASS_KEY,
          JSON.stringify({
            score: score,
            total: QUESTIONS.length,
            completedAt: new Date().toISOString(),
            user: session,
          }),
        );
        result.className = "quiz-result success";
        result.innerHTML =
          "<strong>Perfetto: 10 su 10.</strong> Puoi scaricare l'attestato." +
          '<a class="btn" href="attestato.html">Vai all attestato</a>';
        setTimeout(function () {
          window.location.href = "attestato.html";
        }, 900);
      } else {
        localStorage.removeItem(PASS_KEY);
        result.className = "quiz-result error";
        result.innerHTML =
          "<strong>Punteggio: " +
          score +
          " su " +
          QUESTIONS.length +
          ".</strong> Per ottenere l'attestato devi farle tutte corrette. Rileggi le note e riprova.";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderQuiz);
  } else {
    renderQuiz();
  }
})();
