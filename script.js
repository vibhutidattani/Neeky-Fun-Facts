(function () {
  var facts = Array.isArray(window.NEEKY_FACTS) ? window.NEEKY_FACTS : [];
  var config = window.NEEKY_CONFIG || {};
  var categories = {
    maths: "Maths",
    physics: "Physics",
    psychology: "Psychology"
  };

  document.querySelectorAll("#year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  document.querySelectorAll("[data-submit-link]").forEach(function (link) {
    if (config.submissionFormUrl) {
      link.href = config.submissionFormUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = link.classList.contains("button") ? "Submit a fact ↗" : "submit a fact ↗";
    }
  });

  function categoryName(category) {
    return categories[category] || category.charAt(0).toUpperCase() + category.slice(1);
  }

  function factCard(fact) {
    var article = document.createElement("article");
    article.className = "fact-card";
    var credit = fact.credit ? '<p class="credit">Submitted by ' + escapeHtml(fact.credit) + '</p>' : "";
    article.innerHTML =
      '<p class="fact-meta"><span class="tag">' + escapeHtml(categoryName(fact.category)) + '</span></p>' +
      '<h3><a href="fact.html?id=' + encodeURIComponent(fact.id) + '">' + escapeHtml(fact.title) + '</a></h3>' +
      '<p>' + escapeHtml(fact.summary) + '</p>' + credit +
      '<a class="read-link" href="fact.html?id=' + encodeURIComponent(fact.id) + '">Read the note →</a>';
    return article;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  }

  function renderIndex(category) {
    var container = document.getElementById("facts");
    var empty = document.getElementById("empty-state");
    var count = document.getElementById("fact-count");
    if (!container) return;
    container.innerHTML = "";
    var filtered = category === "all" ? facts : facts.filter(function (fact) { return fact.category === category; });
    filtered.forEach(function (fact) { container.appendChild(factCard(fact)); });
    empty.hidden = filtered.length > 0;
    count.textContent = filtered.length ? filtered.length + (filtered.length === 1 ? " fact" : " facts") : "";
  }

  function renderSingleFact() {
    var article = document.getElementById("single-fact");
    if (!article) return;
    var id = new URLSearchParams(window.location.search).get("id");
    var fact = facts.find(function (item) { return item.id === id; });
    if (!fact) {
      article.innerHTML = '<p class="eyebrow">Missing page</p><h1>That fact has not been written yet.</h1><p>Try the notebook index for the latest notes.</p>';
      return;
    }
    document.title = fact.title + " — Neeky Fun Facts";
    article.innerHTML =
      '<p class="fact-meta"><span class="tag">' + escapeHtml(categoryName(fact.category)) + '</span></p>' +
      '<h1>' + escapeHtml(fact.title) + '</h1>' +
      '<p class="fact-body">' + escapeHtml(fact.body) + '</p>' +
      (fact.credit ? '<p class="credit">Submitted by ' + escapeHtml(fact.credit) + '</p>' : "") +
      (fact.source ? '<p class="source">Source: <a href="' + escapeHtml(fact.source) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(fact.sourceLabel || fact.source) + '</a></p>' : '<p class="source source-reminder">Source to be added before publishing.</p>');
  }

  document.querySelectorAll(".filter").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll(".filter").forEach(function (item) {
        var selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      renderIndex(button.dataset.category);
    });
  });

  renderIndex("all");
  renderSingleFact();
})();
