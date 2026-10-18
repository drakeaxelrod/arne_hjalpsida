// Builds the buttons from LINKS (links.js) and keeps the greeting, date and clock current.
// Written defensively: a typo in links.js or a missing icon should never leave a blank page.

(function () {
  var COLORS = ["blue", "red", "green", "purple", "orange", "teal", "brown", "gray"];
  // Every button opens in this one named tab, so tabs don't pile up.
  var TAB_NAME = "grandpa-tab";

  var icons = typeof ICONS === "object" && ICONS ? ICONS : {};

  function svg(markup) {
    return '<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">' + markup + "</svg>";
  }

  function iconElement(name) {
    var el = document.createElement("span");
    el.className = "tile-icon";
    el.setAttribute("aria-hidden", "true");
    if (name && Object.prototype.hasOwnProperty.call(icons, name)) {
      el.innerHTML = svg(icons[name]);
    } else if (name && !/^[a-z-]+$/.test(name)) {
      el.textContent = name; // an emoji or other character
    } else if (icons.web) {
      if (name) console.warn("Unknown icon in links.js:", name);
      el.innerHTML = svg(icons.web);
    } else {
      el.textContent = "🌐";
    }
    return el;
  }

  function isValid(link) {
    return link && typeof link.name === "string" && link.name.trim() &&
      typeof link.url === "string" && /^https?:\/\//i.test(link.url);
  }

  function buildTiles() {
    var list = document.getElementById("tiles");

    if (typeof LINKS === "undefined" || !Array.isArray(LINKS)) {
      console.error("links.js could not be loaded - check it for a missing comma or quote mark.");
      showNotice(list);
      return;
    }

    var shown = 0;
    LINKS.forEach(function (link) {
      if (!isValid(link)) {
        console.warn("Skipping invalid entry in links.js:", link);
        return;
      }

      var a = document.createElement("a");
      a.className = "tile " + (COLORS.indexOf(link.color) >= 0 ? link.color : "gray");
      a.href = link.url;
      a.target = TAB_NAME;
      a.addEventListener("click", function () {
        showToast("Nu öppnas: " + link.name);
      });

      var name = document.createElement("span");
      name.className = "tile-name";
      name.textContent = link.name;

      a.append(iconElement(link.icon), name);

      if (link.description) {
        var description = document.createElement("span");
        description.className = "tile-description";
        description.textContent = link.description;
        a.append(description);
      }

      var li = document.createElement("li");
      li.className = "tile-item";
      li.style.setProperty("--i", shown);
      li.append(a);
      list.append(li);
      shown++;
    });

    if (shown === 0) showNotice(list);
  }

  function showNotice(list) {
    var p = document.createElement("p");
    p.className = "notice";
    p.textContent = "Knapparna kunde inte visas just nu. Be någon i familjen om hjälp.";
    list.replaceWith(p);
  }

  var toastTimer;
  function showToast(text) {
    var toast = document.getElementById("toast");
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3500);
  }

  function setupSearch() {
    var form = document.getElementById("search");
    var box = document.getElementById("search-box");
    var input = document.getElementById("q");
    var clear = document.getElementById("search-clear");
    var mic = document.getElementById("search-mic");
    var hint = document.getElementById("search-hint");

    if (icons.search) {
      document.getElementById("search-icon").innerHTML = svg(icons.search);
      document.getElementById("search-button-icon").innerHTML = svg(icons.search);
    }
    clear.innerHTML = icons.clear ? svg(icons.clear) : "✕";
    mic.innerHTML = icons.microphone ? svg(icons.microphone) : "🎤";

    function syncClear() { clear.hidden = !input.value; }

    input.addEventListener("input", function () {
      syncClear();
      hint.textContent = "";
    });

    clear.addEventListener("click", function () {
      input.value = "";
      syncClear();
      hint.textContent = "";
      input.focus();
    });

    form.addEventListener("submit", function (event) {
      if (!input.value.trim()) {
        event.preventDefault();
        hint.textContent = "Skriv något i rutan först.";
        box.classList.remove("shake");
        void box.offsetWidth; // restart the animation
        box.classList.add("shake");
        input.focus();
        return;
      }
      hint.textContent = "";
      showToast("Nu öppnas: Google");
    });

    box.addEventListener("animationend", function () { box.classList.remove("shake"); });

    // Voice search, only where the browser supports it (Chrome, Edge, Safari).
    // It fills in the field but never submits on its own: opening a tab without
    // a click would be stopped by the browser's pop-up blocker.
    var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;

    var recognition;
    var listening = false;
    mic.hidden = false;

    mic.addEventListener("click", function () {
      if (listening) {
        recognition.stop();
        return;
      }
      try {
        recognition = new Recognition();
        recognition.lang = "sv-SE";
        recognition.interimResults = true;

        recognition.onresult = function (event) {
          var text = "";
          for (var i = 0; i < event.results.length; i++) text += event.results[i][0].transcript;
          input.value = text;
          syncClear();
          if (event.results[event.results.length - 1].isFinal) {
            hint.textContent = "Tryck på Sök för att söka.";
          }
        };
        recognition.onerror = function (event) {
          hint.textContent = event.error === "not-allowed" || event.error === "service-not-allowed"
            ? "Mikrofonen är avstängd. Skriv i rutan istället."
            : "Jag hörde inget. Försök igen, eller skriv i rutan.";
        };
        recognition.onend = function () {
          listening = false;
          mic.classList.remove("listening");
          if (hint.textContent === "Prata nu – jag lyssnar…") hint.textContent = "";
        };

        recognition.start();
        listening = true;
        mic.classList.add("listening");
        hint.textContent = "Prata nu – jag lyssnar…";
      } catch (e) {
        console.warn("Voice search failed to start:", e);
        hint.textContent = "Det gick inte att prata in. Skriv i rutan istället.";
      }
    });
  }

  function updateClock() {
    var now = new Date();
    var hour = now.getHours();
    var greeting =
      hour < 5  ? "God natt" :
      hour < 10 ? "God morgon" :
      hour < 18 ? "Hej" : "God kväll";

    setText("greeting", greeting + " Arne!");
    setText("date", "Idag är det " + now.toLocaleDateString("sv-SE", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    }));
    setText("clock", now.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" }));
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el.textContent !== text) el.textContent = text;
  }

  setupSearch();
  buildTiles();
  updateClock();
  setInterval(updateClock, 1000);
})();
