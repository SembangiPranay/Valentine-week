const specialDates = [
    { day: 7, month: 1, label: "Feb 07", title: "Rose Day", video: "rose.mp4", link: "day7.html" },
    { day: 8, month: 1, label: "Feb 08", title: "Propose Day", video: "propose.mp4", link: "day8.html" },
    { day: 9, month: 1, label: "Feb 09", title: "Chocolate Day", video: "chocolate.mp4", link: "day9.html" },
    { day: 10, month: 1, label: "Feb 10", title: "Teddy Day", video: "teddy.mp4", link: "day10.html" },
    { day: 11, month: 1, label: "Feb 11", title: "Promise Day", video: "promise.mp4", link: "day11.html" },
    { day: 12, month: 1, label: "Feb 12", title: "Hug Day", video: "hug.mp4", link: "day12.html" },
    { day: 13, month: 1, label: "Feb 13", title: "Kiss Day", video: "kiss.mp4", link: "day13.html" },
    { day: 14, month: 1, label: "Feb 14", title: "VALENTINE", video: "valentine.mp4", link: "day14.html" }
];

const SECRET_PASSCODE = "1403";
const now = new Date();
const curDate = now.getDate();
const curMonth = now.getMonth();

function renderWaterfall(forceUnlock = false) {
    const container = document.getElementById('waterfall-container');
    if (!container) return;
    
    container.innerHTML = ''; // Clear previous

    specialDates.forEach((date) => {
        // Date Check: Months are 0-indexed (Jan=0, Feb=1)
        const isUnlocked = forceUnlock || (curMonth > date.month) || (curMonth === date.month && curDate >= date.day);
        
        const section = document.createElement('section');
        
        section.innerHTML = `
            <video autoplay muted loop playsinline class="bg-video">
                <source src="${date.video}" type="video/mp4">
            </video>
            
            <div class="glass-box max-w-lg mx-6 fade-in">
                <p class="text-orange-300 tracking-[0.4em] uppercase text-xs mb-4">${date.label}</p>
                <h2 class="text-6xl md:text-8xl font-bold text-white mb-10 tracking-tighter">${date.title}</h2>
                
                ${isUnlocked ? 
                    `<button onclick="window.location.href='${date.link}'" class="bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-orange-300 transition-all duration-300 scale-110">Open Surprise</button>` : 
                    `<div class="text-white/50 flex flex-col items-center gap-2">
                        <span class="text-3xl">🔒</span>
                        <p class="italic tracking-wide text-sm uppercase">Locked until ${date.label}</p>
                    </div>`
                }
            </div>
            
            <div class="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
                <span>SCROLL DOWN</span>
            </div>
        `;
        container.appendChild(section);
    });
}

// Global Admin Function
window.adminUnlock = function() {
    const code = prompt("Enter Secret Code:");
    if (code === SECRET_PASSCODE) {
        renderWaterfall(true);
        // Scroll to top after unlocking
        window.scrollTo(0, 0);
    } else {
        alert("Access Denied.");
    }
};

// Start when page is ready
document.addEventListener('DOMContentLoaded', () => {
    renderWaterfall(false);
});
