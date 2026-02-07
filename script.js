

const specialDates = [
  { day: 7, month: 1, label: "FEB 07", title: "Rose Day 🌹", link: "day7.html" },
  { day: 8, month: 1, label: "FEB 08", title: "Propose Day 💍", msg: "I'd choose you in every lifetime." },
  { day: 9, month: 1, label: "FEB 09", title: "Chocolate Day 🍫", msg: "Sweet treats for my sweetest person." },
  { day: 10, month: 1, label: "FEB 10", title: "Teddy Day 🧸", msg: "Sending you a digital bear hug!" },
  { day: 11, month: 1, label: "FEB 11", title: "Promise Day 🤝", msg: "I promise to always be by your side." },
  { day: 12, month: 1, label: "FEB 12", title: "Hug Day 🫂", msg: "Warmest hugs for you today." },
  { day: 13, month

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





