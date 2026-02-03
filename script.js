const specialDates = [
    { day: 7, month: 1, label: "Feb 7", title: "Rose Day 🌹", video: "rose.mp4", link: "day7.html" },
    { day: 8, month: 1, label: "Feb 8", title: "Propose Day 💍", video: "propose.mp4", link: "day8.html" },
    { day: 9, month: 1, label: "Feb 9", title: "Chocolate Day 🍫", video: "choc.mp4", link: "day9.html" }
    // Add all your other days here...
];

const SECRET_PASSCODE = "1403";
const now = new Date();
const curDate = now.getDate();
const curMonth = now.getMonth();

function renderWaterfall(forceUnlock = false) {
    const container = document.getElementById('waterfall-container');
    container.innerHTML = '';

    specialDates.forEach((dateObj) => {
        const isUnlocked = forceUnlock || (curMonth > dateObj.month) || (curMonth === dateObj.month && curDate >= dateObj.day);
        
        const section = document.createElement('section');
        
        section.innerHTML = `
            <video autoplay muted loop playsinline class="video-bg">
                <source src="${dateObj.video}" type="video/mp4">
            </video>
            
            <div class="content-overlay text-center max-w-md mx-6 fade-in">
                <p class="text-orange-300 tracking-[0.3em] uppercase text-sm mb-2">${dateObj.label}</p>
                <h2 class="text-5xl font-bold mb-6">${dateObj.title}</h2>
                
                ${isUnlocked ? 
                    `<button onclick="window.location.href='${dateObj.link}'" class="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-orange-300 transition">Enter Experience</button>` : 
                    `<div class="text-pink-300 italic">Locked until ${dateObj.label} 🔒</div>`
                }
            </div>
        `;
        container.appendChild(section);
    });
}

window.adminUnlock = function() {
    if (prompt("Passcode:") === SECRET_PASSCODE) renderWaterfall(true);
};

document.addEventListener('DOMContentLoaded', () => renderWaterfall(false));
