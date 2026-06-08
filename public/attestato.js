(function () {
  "use strict";

  var PASS_KEY = "museo-quiz-pass";

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

  function formatDate(value) {
    try {
      return new Intl.DateTimeFormat("it-IT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(value));
    } catch (error) {
      return "";
    }
  }

  function sanitizeFilename(value) {
    return String(value || "studente")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "");
  }

  function renderCertificate() {
    var data = null;
    try {
      data = JSON.parse(localStorage.getItem(PASS_KEY) || "null");
    } catch (error) {}

    if (!data || data.score !== 10) {
      window.location.href = "gioco.html";
      return;
    }

    var name = data.participantName || "Studente";
    var date = formatDate(data.completedAt);
    var code =
      "SABBIE-" +
      new Date(data.completedAt).getFullYear() +
      "-" +
      Math.random().toString(36).slice(2, 7).toUpperCase();

    document.getElementById("certificate-name").textContent = name;
    document.getElementById("certificate-bottom-name").textContent = name;
    document.getElementById("certificate-date").textContent = date;
    document.getElementById("certificate-code").textContent = code;

    var printBtn = document.getElementById("print-certificate");
    if (printBtn) {
      printBtn.addEventListener("click", function () {
        window.print();
      });
    }

    var downloadBtn = document.getElementById("download-certificate");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        var styles = Array.from(document.querySelectorAll("style"))
          .map(function (style) {
            return style.textContent;
          })
          .join("\n");
        var html =
          "<!doctype html><html><head><meta charset='utf-8'><title>Attestato Museo delle Sabbie</title><style>" +
          styles +
          "</style></head><body>" +
          document.querySelector(".certificate-sheet").outerHTML +
          "</body></html>";
        var blob = new Blob([html], { type: "text/html;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = "attestato-museo-sabbie-" + sanitizeFilename(name) + ".html";
        link.click();
        URL.revokeObjectURL(url);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderCertificate);
  } else {
    renderCertificate();
  }
})();
