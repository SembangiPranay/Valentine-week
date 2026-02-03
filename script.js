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
const curMonth = now.getMonth(); // Feb is 1

function renderWaterfall(forceUnlock = false) {
    const container = document.getElementById('waterfall-container');
    if (!container) return;
    
    container.innerHTML = ''; 

    specialDates.forEach((date) => {
        // Date Check: Months are 0-indexed
        const isUnlocked = forceUnlock || (curMonth > date.month) || (curMonth === date.month && curDate >= date.day);
        
        const section = document.createElement('section');
        section.className = "waterfall-slide";
        
        section.innerHTML = `
            <video autoplay muted loop playsinline class="bg-video">
                <source src="${date.video}" type="video/mp4">
            </video>
            
            <div class="glass-box fade-in">
                <p class="label-text">${date.label}</p>
                <h2 class="title-text">${date.title}</h2>
                
                ${isUnlocked ? 
                    `<button onclick="window.location.href='${date.link}'" class="action-btn">Open Surprise</button>` : 
                    `<div style="opacity: 0.5;">
                        <span style="font-size: 2rem;">🔒</span>
                        <p style="font-size: 0.7rem; margin-top: 10px; letter-spacing: 2px;">LOCKED</p>
                    </div>`
                }
            </div>
            
            <div class="scroll-line"></div>
        `;
        container.appendChild(section);
    });
}

// Global Admin Function
window.adminUnlock = function() {
    const code = prompt("Enter Admin Code:");
    if (code === SECRET_PASSCODE) {
        renderWaterfall(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        alert("Incorrect Code.");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderWaterfall(false);
});
