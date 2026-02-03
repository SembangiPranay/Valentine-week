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
    
    container.innerHTML = ''; 

    specialDates.forEach((date) => {
        // Date Check: Months are 0-indexed (Jan=0, Feb=1)
        const isUnlocked = forceUnlock || (curMonth > date.month) || (curMonth === date.month && curDate >= date.day);
        
        const section = document.createElement('section');
        // Adding a specific class for CSS Snapping
        section.className = "waterfall-slide w-screen h-screen relative flex items-center justify-center overflow-hidden";
        
        section.innerHTML = `
            <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover z-0 opacity-60">
                <source src="${date.video}" type="video/mp4">
            </video>
            
            <div class="glass-box relative z-10 max-w-lg mx-6 p-10 rounded-[3rem] text-center backdrop-blur-lg border border-white/20 bg-black/20 fade-in">
                <p class="text-orange-300 tracking-[0.5em] uppercase text-xs mb-4 font-bold">${date.label}</p>
                <h2 class="text-6xl md:text-8xl font-bold text-white mb-10 tracking-tighter leading-none">${date.title}</h2>
                
                ${isUnlocked ? 
                    `<button onclick="window.location.href='${date.link}'" class="bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-orange-300 hover:scale-110 transition-all duration-500 shadow-xl">Start Journey</button>` : 
                    `<div class="text-white/40 flex flex-col items-center gap-3 animate-pulse">
                        <span class="text-4xl">🔒</span>
                        <p class="italic tracking-widest text-xs uppercase font-medium">Coming Soon</p>
                    </div>`
                }
            </div>
            
            <div class="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2 z-10">
                <span class="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                <div class="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        alert("Access Denied.");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderWaterfall(false);
});
