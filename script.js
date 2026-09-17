const form = document.getElementById("appForm");
const appGrid = document.getElementById("appGrid");

function loadApps() {
  const apps = JSON.parse(localStorage.getItem("appforge_apps") || "[]");

  if (!appGrid) return;

  appGrid.innerHTML = "";

  if (apps.length === 0) {
    appGrid.innerHTML = "<p class='muted'>No apps published yet.</p>";
    return;
  }

  apps.forEach((app) => {
    const card = document.createElement("div");
    card.className = "app-card";

    card.innerHTML = `
      <h3>${escapeHTML(app.name)}</h3>
      <p><strong>Version:</strong> ${escapeHTML(app.version)}</p>
      <p><strong>Developer:</strong> ${escapeHTML(app.developer)}</p>
      <p>${escapeHTML(app.description)}</p>
      ${
        app.download
          ? `<a class="button" href="${escapeHTML(app.download)}" target="_blank">Download</a>`
          : ""
      }
    `;

    appGrid.appendChild(card);
  });
}

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const app = {
      name: document.getElementById("name").value.trim(),
      version: document.getElementById("version").value.trim(),
      developer: document.getElementById("developer").value.trim(),
      description: document.getElementById("description").value.trim(),
      download: document.getElementById("download").value.trim()
    };

    const apps = JSON.parse(localStorage.getItem("appforge_apps") || "[]");

    apps.push(app);

    localStorage.setItem("appforge_apps", JSON.stringify(apps));

    form.reset();
    loadApps();

    alert("✅ App published successfully!");
  });
}

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

loadApps();
