(function () {
  "use strict";

  var SESSION_KEY = "museo-auth-session";
  var config = window.MUSEO_AUTH_CONFIG || {};

  function readSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch (error) {
      return null;
    }
  }

  function writeSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function parseJwt(token) {
    try {
      var payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(decodeURIComponent(escape(atob(payload))));
    } catch (error) {
      return {};
    }
  }

  function buildSession(provider, profile) {
    return {
      provider: provider,
      name: profile.name || "Studente",
      email: profile.email || "",
      picture: profile.picture || "",
      loginAt: new Date().toISOString(),
    };
  }

  function login(provider, profile) {
    var session = buildSession(provider, profile || {});
    writeSession(session);
    return session;
  }

  function getNextUrl() {
    var next = new URLSearchParams(window.location.search).get("next") || "gioco.html";
    if (/^https?:\/\//i.test(next)) return "gioco.html";
    return next;
  }

  function redirectAfterLogin() {
    window.location.href = getNextUrl();
  }

  function requireAuth() {
    if (readSession()) return true;
    var current = window.location.pathname.split("/").pop() + window.location.search;
    window.location.href = "login.html?next=" + encodeURIComponent(current || "quiz.html");
    return false;
  }

  function renderUserBox(root) {
    var session = readSession();
    if (!root) return;

    if (!session) {
      root.innerHTML = "";
      return;
    }

    root.innerHTML =
      '<div class="auth-user-card">' +
      (session.picture
        ? '<img class="auth-avatar" src="' + escapeHtml(session.picture) + '" alt="">'
        : '<div class="auth-avatar auth-avatar-fallback">' +
          escapeHtml(session.name.charAt(0) || "S") +
          "</div>") +
      "<div><strong>" +
      escapeHtml(session.name) +
      "</strong><span>" +
      escapeHtml(session.email || session.provider) +
      "</span></div>" +
      '<button type="button" class="auth-logout-btn" data-auth-logout>Esci</button>' +
      "</div>";

    var logoutBtn = root.querySelector("[data-auth-logout]");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        clearSession();
        window.location.href = "login.html";
      });
    }
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

  function showAuthMessage(message, type) {
    var box = document.getElementById("auth-message");
    if (!box) return;
    box.textContent = message;
    box.className = "auth-message " + (type || "info");
  }

  function initGoogleLogin() {
    var slot = document.getElementById("google-login-button");
    if (!slot) return;

    if (!config.googleClientId) {
      slot.innerHTML =
        '<button type="button" class="login-provider-btn" disabled>Google non configurato</button>';
      return;
    }

    function renderGoogle() {
      if (!window.google || !window.google.accounts || !window.google.accounts.id) {
        showAuthMessage("Google Login non e disponibile in questo momento.", "error");
        return;
      }
      window.google.accounts.id.initialize({
        client_id: config.googleClientId,
        callback: function (response) {
          var profile = parseJwt(response.credential || "");
          login("Google", {
            name: profile.name,
            email: profile.email,
            picture: profile.picture,
          });
          redirectAfterLogin();
        },
      });
      window.google.accounts.id.renderButton(slot, {
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "pill",
        width: Math.min(320, slot.clientWidth || 320),
      });
    }

    if (window.google && window.google.accounts) {
      renderGoogle();
    } else {
      window.addEventListener("load", renderGoogle, { once: true });
    }
  }

  function initAppleLogin() {
    var btn = document.getElementById("apple-login-button");
    if (!btn) return;

    if (!config.appleClientId || !config.appleRedirectURI) {
      btn.disabled = true;
      btn.textContent = "Apple non configurato";
      return;
    }

    btn.addEventListener("click", async function () {
      try {
        if (!window.AppleID || !window.AppleID.auth) {
          showAuthMessage("Apple Login non e disponibile in questo momento.", "error");
          return;
        }
        window.AppleID.auth.init({
          clientId: config.appleClientId,
          scope: "name email",
          redirectURI: config.appleRedirectURI,
          usePopup: true,
        });
        var response = await window.AppleID.auth.signIn();
        var profile = parseJwt(response.authorization && response.authorization.id_token);
        login("Apple", {
          name: profile.email ? profile.email.split("@")[0] : "Studente",
          email: profile.email || "",
        });
        redirectAfterLogin();
      } catch (error) {
        showAuthMessage("Accesso Apple annullato o non riuscito.", "error");
      }
    });
  }

  function initLoginPage() {
    renderUserBox(document.getElementById("auth-user"));

    var session = readSession();
    var alreadyLogged = document.getElementById("already-logged");
    var loginChoices = document.getElementById("login-choices");

    if (session) {
      if (alreadyLogged) alreadyLogged.hidden = false;
      if (loginChoices) loginChoices.hidden = true;
    } else {
      if (alreadyLogged) alreadyLogged.hidden = true;
      if (loginChoices) loginChoices.hidden = false;
      initGoogleLogin();
      initAppleLogin();
      if (!config.googleClientId && !config.appleClientId) {
        showAuthMessage(
          "Per attivare accesso reale, inserisci Google Client ID e Apple Service ID in auth-config.js.",
          "info",
        );
      }
    }

    document.querySelectorAll("[data-auth-next]").forEach(function (link) {
      link.setAttribute("href", getNextUrl());
    });
  }

  window.MuseoAuth = {
    readSession: readSession,
    clearSession: clearSession,
    requireAuth: requireAuth,
    renderUserBox: renderUserBox,
    initLoginPage: initLoginPage,
  };
})();
