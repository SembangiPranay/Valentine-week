const specialDates = [
    { day: 7, month: 1, label: "Feb 7", title: "Rose Day 🌹", msg: "Redirecting to your surprise..." },
    { day: 8, month: 1, label: "Feb 8", title: "Propose Day 💍", msg: "I'd choose you in every lifetime." },
    { day: 9, month: 1, label: "Feb 9", title: "Chocolate Day 🍫", msg: "Sweet treats for my sweetest person." },
    { day: 10, month: 1, label: "Feb 10", title: "Teddy Day 🧸", msg: "Sending you a digital bear hug!" },
    { day: 11, month: 1, label: "Feb 11", title: "Promise Day 🤝", msg: "I promise to always be by your side." },
    { day: 12, month: 1, label: "Feb 12", title: "Hug Day 🫂", msg: "Warmest hugs for you today." },
    { day: 13, month: 1, label: "Feb 13", title: "Kiss Day 💋", msg: "Thinking of you and sending a kiss!" },
    { day: 14, month: 1, label: "Feb 14", title: "VALENTINE 💖", msg: "Happy Valentine's Day, my love!" },
    { day: 4, month: 2, label: "Mar 4", title: "March Surprise ✨", msg: "Even after Valentine's, you're my number one." },
    { day: 27, month: 2, label: "Mar 27", title: "Final Celebration 👑", msg: "The most special day of all. I love you!" }
];

const SECRET_PASSCODE = "1403";
const now = new Date();
const curDate = now.getDate();
const curMonth = now.getMonth(); 

// --- 1. RENDERING ENGINE ---
function renderGrid(forceUnlock = false) {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return; // Stop if grid doesn't exist yet
    
    grid.innerHTML = ''; // Clear it out
    
    specialDates.forEach(dateObj => {
        // Real-time lock logic: Is today >= the special date?
        const isUnlocked = forceUnlock || (curMonth > dateObj.month) || (curMonth === dateObj.month && curDate >= dateObj.day);
        
        const card = document.createElement('div');
        card.className = `h-40 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-pink-100 cursor-pointer p-4 text-center transition-all duration-300 ${isUnlocked ? 'unlocked pink-glass shadow-sm' : 'locked text-pink-200 bg-pink-50/50'}`;
        
        card.innerHTML = `
            <span class="text-xs font-bold opacity-60 uppercase mb-1">${dateObj.label}</span>
            <span class="text-3xl">${isUnlocked ? '🎁' : '🔒'}</span>
            <p class="text-sm font-semibold mt-2">${isUnlocked ? 'Open Me' : 'Locked'}</p>
        `;

        card.onclick = () => {
            if (isUnlocked) {
                if(dateObj.day === 7 && dateObj.month === 1) {
                    window.location.href = "day7.html";
                } else {
                    openModal(dateObj);
                }
            } else {
                card.classList.add('shake');
                setTimeout(() => card.classList.remove('shake'), 400);
            }
        };
        grid.appendChild(card);
    });
}

// --- 2. HELPERS ---
function updateCountdown() {
    const target = new Date("February 7, 2026 00:00:00").getTime();
    const currentTime = new Date().getTime();
    const diff = target - currentTime;
    const daysEl = document.getElementById('days');

    if (diff > 0 && daysEl) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    } else {
        const cd = document.getElementById('countdown');
        if(cd) cd.innerHTML = "<p class='text-pink-500 animate-bounce font-bold text-xl'>The Magic Has Begun! ✨</p>";
    }
}

function updateProgress() {
    const bar = document.getElementById('progressBar');
    const text = document.getElementById('percentText');
    if (!bar || !text) return;

    const start = new Date(now.getFullYear(), 1, 7); 
    const end = new Date(now.getFullYear(), 2, 27); 
    const progress = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
    
    bar.style.width = progress + "%";
    text.innerText = Math.floor(progress) + "% Journey Complete";
}

// --- 3. MODAL & ADMIN ---
window.openModal = function(data) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modalContent');
    content.innerHTML = `
        <h2 class="title-font text-4xl text-pink-500 mb-4">${data.title}</h2>
        <p class="text-pink-800 leading-relaxed text-lg font-medium">${data.msg}</p>
        <button onclick="closeModal()" class="mt-8 bg-pink-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-pink-500 transition">Close</button>
    `;
    modal.classList.remove('hidden');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#ffb6c1', '#ff69b4'] });
};

window.closeModal = function() { 
    document.getElementById('modal').classList.add('hidden'); 
};

window.adminUnlock = function() {
    const pw = prompt("Enter Admin Passcode:");
    if (pw === SECRET_PASSCODE) {
        renderGrid(true);
    } else {
        alert("Incorrect code!");
    }
};

// --- 4. STARTUP ---
document.addEventListener('DOMContentLoaded', () => {
    renderGrid(false); // Draw cards
    updateProgress();   // Set progress
    setInterval(updateCountdown, 1000);
    updateCountdown();
});
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

