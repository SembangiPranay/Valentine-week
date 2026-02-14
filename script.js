const specialDates = [
  { day: 7, month: 1, label: "FEB 07", title: "Rose Day 🌹", link: "day7.html" },
  { day: 8, month: 1, label: "FEB 08", title: "Propose Day 💍", link: "day08.html" },
  { day: 9, month: 1, label: "FEB 09", title: "Chocolate Day 🍫", link: "day09.html" },
  { day: 10, month: 1, label: "FEB 10", title: "Teddy Day 🧸", link: "day10.html" },
  { day: 11, month: 1, label: "FEB 11", title: "Promise Day 🤝", link: "day11.html" },
  { day: 12, month: 1, label: "FEB 12", title: "Hug Day 🫂", msg: "Warmest hugs for you today." },
  { day: 13, month: 1, label: "FEB 13", title: "Kiss Day 💋", msg: "Thinking of you and sending a kiss!" },
  { day: 14, month: 1, label: "FEB 14", title: "VALENTINE 💖", link: "day14.html" },
  { day: 4, month: 2, label: "MAR 04", title: "Special Day ✨", msg: "Another beautiful day with you." },
  { day: 27, month: 2, label: "MAR 27", title: "The Grand Finale 👑", msg: "The most special day of all. I love you!" }
];

const SECRET_PASSCODE = "1403";
const now = new Date();

function renderGrid(forceUnlock = false) {
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;

  grid.innerHTML = "";

  specialDates.forEach(date => {
    const isUnlocked =
      forceUnlock ||
      now.getMonth() > date.month ||
      (now.getMonth() === date.month && now.getDate() >= date.day);

    const card = document.createElement("div");
    card.className = `card ${isUnlocked ? "unlocked" : "locked"}`;

    card.innerHTML = `
      <div class="date">${date.label}</div>
      <div class="text-3xl">${isUnlocked ? "🎁" : "🔒"}</div>
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

function updateProgress() {
  const start = new Date(2026, 1, 7);
  const end = new Date(2026, 2, 27);
  const progress = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));

  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("percentText").innerText = Math.floor(progress) + "% JOURNEY";
}

window.adminUnlock = function () {
  if (prompt("Passcode:") === SECRET_PASSCODE) {
    renderGrid(true);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  updateProgress();
});







