const specialDates = [
  { day: 7, month: 1, label: "FEB 07", title: "Rose Day 🌹", link: "day7.html" },
  { day: 8, month: 1, label: "FEB 08", title: "Propose Day 💍", msg: "I'd choose you in every lifetime." },
  { day: 9, month: 1, label: "FEB 09", title: "Chocolate Day 🍫", msg: "Sweet treats for my sweetest person." },
  { day: 10, month: 1, label: "FEB 10", title: "Teddy Day 🧸", msg: "Sending you a digital bear hug!" },
  { day: 11, month: 1, label: "FEB 11", title: "Promise Day 🤝", msg: "I promise to always be by your side." },
  { day: 12, month: 1, label: "FEB 12", title: "Hug Day 🫂", msg: "Warmest hugs for you today." },
  { day: 13, month: 1, label: "FEB 13", title: "Kiss Day 💋", msg: "Thinking of you and sending a kiss!" },
  { day: 14, month: 1, label: "FEB 14", title: "VALENTINE 💖", msg: "Happy Valentine's Day, my love!" },
  { day: 4, month: 2, label: "MAR 04", title: "Special Day ✨", msg: "Another beautiful day with you." },
  { day: 27, month: 2, label: "MAR 27", title: "The Grand Finale 👑", msg: "The most special day of all. I love you!" }
];

const SECRET_PASSCODE = "1403";
const now = new Date();

/* Render cards */
function renderGrid(forceUnlock = false) {
  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";

  specialDates.forEach(date => {
    const isUnlocked =
      forceUnlock ||
      now.getMonth() > date.month ||
      (now.getMonth() === date.month && now.getDate() >= date.day);

    const card = document.createElement("div");
    card.classList.add("card");

    if (isUnlocked) {
      card.classList.add("unlocked", "unlock");
    } else {
      card.classList.add("locked");
    }

    card.innerHTML = `
      <div class="date">${date.label}</div>
      <div class="text-3xl">${isUnlocked ? "🎁" : "🔒"}</div>
      <div class="status">${isUnlocked ? "Open" : "Locked"}</div>
    `;

    card.onclick = () => {
      if (!isUnlocked) return;

      if (date.link) {
        window.location.href = date.link;
      } else {
        alert(`${date.title}\n\n${date.msg}`);
      }

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    };

    grid.appendChild(card);
  });
}

/* Progress */
function updateProgress() {
  const start = new Date(2026, 1, 7);
  const end = new Date(2026, 2, 27);
  const progress = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));

  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("percentText").innerText = Math.floor(progress) + "% JOURNEY";
}

/* Admin unlock */
window.adminUnlock = function () {
  if (prompt("Passcode:") === SECRET_PASSCODE) {
    renderGrid(true);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  updateProgress();
});

throw new Error("Test error");
