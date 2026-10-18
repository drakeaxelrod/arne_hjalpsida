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

  if (icons.search) document.getElementById("search-icon").innerHTML = svg(icons.search);
  buildTiles();
  updateClock();
  setInterval(updateClock, 1000);
})();
