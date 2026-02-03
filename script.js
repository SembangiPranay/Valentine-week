const specialDates = [
    { day: 7, month: 1, label: "Feb 07", title: "Rose Day 🌹", link: "day7.html" },
    { day: 8, month: 1, label: "Feb 08", title: "Propose Day 💍", msg: "I'd choose you in every lifetime." },
    { day: 9, month: 1, label: "Feb 09", title: "Chocolate Day 🍫", msg: "Sweet treats for my sweetest person." },
    { day: 10, month: 1, label: "Feb 10", title: "Teddy Day 🧸", msg: "Sending you a digital bear hug!" },
    { day: 11, month: 1, label: "Feb 11", title: "Promise Day 🤝", msg: "I promise to always be by your side." },
    { day: 12, month: 1, label: "Feb 12", title: "Hug Day 🫂", msg: "Warmest hugs for you today." },
    { day: 13, month: 1, label: "Feb 13", title: "Kiss Day 💋", msg: "Thinking of you and sending a kiss!" },
    { day: 14, month: 1, label: "Feb 14", title: "VALENTINE 💖", msg: "Happy Valentine's Day, my love!" },
    { day: 4, month: 2, label: "Mar 04", title: "Special Day ✨", msg: "Another beautiful day with you." },
    { day: 27, month: 2, label: "Mar 27", title: "The Grand Finale 👑", msg: "The most special day of all. I love you!" }
];

const SECRET_PASSCODE = "1403";
const now = new Date();

function renderGrid(forceUnlock = false) {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    grid.innerHTML = '';

    specialDates.forEach(date => {
        const isUnlocked = forceUnlock || (now.getMonth() > date.month) || (now.getMonth() === date.month && now.getDate() >= date.day);
        
        const card = document.createElement('div');
        card.className = `p-6 rounded-[2rem] text-center transition-all cursor-pointer border-2 ${isUnlocked ? 'bg-white/10 border-pink-500/50 shadow-lg' : 'bg-gray-800/50 border-gray-700 opacity-50'}`;
        
        card.innerHTML = `
            <p class="text-[10px] uppercase font-bold text-pink-400 mb-2">${date.label}</p>
            <span class="text-3xl">${isUnlocked ? '🎁' : '🔒'}</span>
            <p class="text-sm font-semibold mt-3 text-white">${isUnlocked ? 'Open' : 'Locked'}</p>
        `;

        card.onclick = () => {
            if (isUnlocked) {
                if (date.day === 7 && date.month === 1) {
                    window.location.href = date.link;
                } else {
                    alert(`${date.title}: ${date.msg}`);
                }
            }
        };
        grid.appendChild(card);
    });
}

function updateProgress() {
    const start = new Date(2026, 1, 7); // Feb 7
    const end = new Date(2026, 2, 27);  // Mar 27
    const progress = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
    
    document.getElementById('progressBar').style.width = progress + "%";
    document.getElementById('percentText').innerText = Math.floor(progress) + "% Journey";
}

window.adminUnlock = function() {
    if (prompt("Passcode:") === SECRET_PASSCODE) renderGrid(true);
};

document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    updateProgress();
});
