// ---------- variables ----------
const $ = (sel) => document.querySelector(sel);
const toastEl = $("#toast");

const themeToggle = $("#themeToggle");

// ---------- utility ----------
function showToast(msg, dur = 2000) {
    if (!toastEl) {
      console.log("[toast]", msg);
      return;
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove("show"), dur);
}

/* ---------- dark mode ---------- */
function applyTheme() {
    const saved = localStorage.getItem("vt-theme");
    const isDark = saved === "dark";
    document.body.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }
applyTheme();
  
themeToggle?.addEventListener("click", () => {
    const dark = !document.body.classList.contains("dark");
    document.body.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("vt-theme", dark ? "dark" : "light");
  });

let games = {};

async function loadGames() {
  try {
    const res = await fetch(
      "data.json"
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    games = await res.json();
    populateGames();
  } catch (err) {
    console.error("Failed to load data.json", err);
    showToast("Failed to load data.");
  }
}

function populateGames() {
  const container = document.getElementById("gamesDisplay"); // parent element

  if (!container) return;
  container.innerHTML = ""; // clear existing content

  Object.keys(games).forEach((game) => {
    // --- Create images of each game ---
    const panel = document.createElement("div");
    panel.className = "panel glass";
    const name = document.createElement("h3");
    name.textContent = games[game].name;
    const img = document.createElement("img");
    img.src = "assets/" + games[game].image;
    img.height = 250;
    panel.appendChild(name);
    panel.appendChild(img); 
    container.appendChild(panel);

/*
    // --- Add interaction logic ---
    checkbox.addEventListener("change", () => {
      //clear select a subject error message
      const formMessage = document.getElementById('formMessage');
      formMessage.textContent = '';

      if (checkbox.checked) {
        // Create a subject box
        const box = document.createElement("div");
        box.className = "subject-box";
        box.id = `box-${subject}`;

        const title = document.createElement("h3");
        title.textContent = subject;
        box.appendChild(title);

        // Create class list from levelsBySubject[subject]
        const classList = document.createElement("div");
        classList.className = "class-list";

        (levelsBySubject[subject] || []).forEach((className) => {
          const classLabel = document.createElement("label");
          const classInput = document.createElement("input");
          classInput.type = "checkbox";
          classInput.value = className;

          classLabel.appendChild(classInput);
          classLabel.appendChild(document.createTextNode(className));
          classList.appendChild(classLabel);
        });

        box.appendChild(classList);
        subjectBoxesContainer.appendChild(box);
      } else {
        // Remove box when unchecked
        const box = document.getElementById(`box-${subject}`);
        if (box) box.remove();
      }
    });*/
  });
}



document.addEventListener("DOMContentLoaded", loadGames);