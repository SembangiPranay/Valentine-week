const specialDates = [
  { day: 7, month: 1, label: "FEB 07", title: "Rose Day 🌹", link: "day7.html" },
  { day: 8, month: 1, label: "FEB 08", title: "Propose Day 💍", link: "day08.html" },
  { day: 9, month: 1, label: "FEB 09", title: "Chocolate Day 🍫", link: "day09.html" },
  { day: 10, month: 1, label: "FEB 10", title: "Teddy Day 🧸", link: "day10.html" },
  { day: 11, month: 1, label: "FEB 11", title: "Promise Day 🤝", link: "day11.html" },

  // Under Maintenance
  { day: 12, month: 1, label: "FEB 12", title: "Under Maintenance 🛠️", msg: "Still building something special 💕" },
  { day: 13, month: 1, label: "FEB 13", title: "Under Maintenance 🚧", msg: "Love loading... please wait 💗" },

  { day: 14, month: 1, label: "FEB 14", title: "VALENTINE 💖", link: "heart.html" },
  { day: 4, month: 2, label: "MAR 04", title: "Special Day ✨", msg: "Another beautiful day with you." },
  { day: 27, month: 2, label: "MAR 27", title: "The Grand Finale 👑", msg: "The most special day of all. I love you!" }
];

const SECRET_PASSCODE = "1403";

function renderGrid(forceUnlock = false) {

  const grid = document.getElementById("calendarGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const now = new Date();

  specialDates.forEach(date => {

    const isUnlocked =
      forceUnlock ||
      now.getMonth() > date.month ||
      (now.getMonth() === date.month && now.getDate() >= date.day);

    const card = document.createElement("div");
    card.className = `card ${isUnlocked ? "unlocked" : "locked"}`;

    // Special icons for 12 & 13
    let icon = "🎁";
    if (date.day === 12) icon = "🛠️";
    if (date.day === 13) icon = "🚧";

    card.innerHTML = `
      <div class="date">${date.label}</div>
      <div class="text-3xl">${isUnlocked ? icon : "🔒"}</div>
      <div class="status">${isUnlocked ? "Open" : "Locked"}</div>
    `;

    if (isUnlocked) {
      card.onclick = () => {

        if (date.link) {
          window.location.href = date.link;
        } else {
          alert(`${date.title}\n\n${date.msg}`);
        }

        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      };
    }

    grid.appendChild(card);
  });
}


/* ---------------------------
   Valentine Week Progress
   (Feb 7 → Feb 14)
---------------------------- */

function updateProgress() {

  const now = new Date();

  const start = new Date(2026, 1, 7);  // Feb 7
  const end = new Date(2026, 1, 14);   // Feb 14

  const progress = Math.max(
    0,
    Math.min(100, ((now - start) / (end - start)) * 100)
  );

  const bar = document.getElementById("progressBar");
  const text = document.getElementById("percentText");

  if (bar) bar.style.width = progress + "%";
  if (text) text.innerText = Math.floor(progress) + "% VALENTINE WEEK";
}


/* ---------------------------
   Countdown Logic
---------------------------- */

function updateCountdowns() {

  const now = new Date();

  const march4 = new Date(2026, 2, 4);
  const march27 = new Date(2026, 2, 27);

  function formatCountdown(target) {

    const diff = target - now;

    if (diff <= 0) return "It’s today ❤️";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    return `${days} days ${hours} hrs remaining`;
  }

  const m4 = document.getElementById("march4Countdown");
  const m27 = document.getElementById("march27Countdown");

  if (m4) m4.innerText = formatCountdown(march4);
  if (m27) m27.innerText = formatCountdown(march27);
}


/* ---------------------------
   Admin Unlock
---------------------------- */

window.adminUnlock = function () {
  if (prompt("Passcode:") === SECRET_PASSCODE) {
    renderGrid(true);
  }
};


/* ---------------------------
   Init
---------------------------- */

document.addEventListener("DOMContentLoaded", () => {

  renderGrid();
  updateProgress();
  updateCountdowns();

  // Live update countdown every hour
  setInterval(updateCountdowns, 60 * 60 * 1000);

});
