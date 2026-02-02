const specialDates = [
    { 
        day: 7, month: 1, label: "Feb 7", title: "Rose Day 🌹", type: "video",
        videoSrc: "rose-video.mp4", 
        msg: "Niku entha varaku nenu rose evvaledu, but rose and you are very similar in my life. Starting lo hate chesevadini slow ga prema lo padipoya" 
    },
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

// Initialize variables
const grid = document.getElementById('calendarGrid');
const now = new Date();

// 1. Countdown Logic
function updateCountdown() {
    const target = new Date("February 7, 2026 00:00:00").getTime();
    const nowTime = new Date().getTime();
    const diff = target - nowTime;
    const cdEl = document.getElementById('countdown');

    if (diff > 0) {
        if(document.getElementById('days')) {
            document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        }
    } else if (cdEl) {
        cdEl.innerHTML = "<p class='text-pink-500 animate-bounce'>The Magic Has Begun! ✨</p>";
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 2. Rose Petal Animation
function triggerRoseRain() {
    if (typeof confetti !== 'function') return;
    var end = Date.now() + 3000;
    (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff0000', '#ffccd5'] });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff0000', '#ffccd5'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

// 3. Modal Control
function openModal(data) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;

    if(data.day === 7 && data.month === 1) triggerRoseRain();

    let mediaHTML = '';
    if (data.type === "video") {
        mediaHTML = `
            <div class="rounded-2xl overflow-hidden shadow-lg bg-black mb-4 aspect-video">
                <video id="v-player" controls autoplay playsinline class="w-full h-full">
                    <source src="${data.videoSrc}" type="video/mp4">
                </video>
            </div>`;
    }

    content.innerHTML = `
        <h2 class="title-font text-4xl text-pink-500 mb-4">${data.title}</h2>
        ${mediaHTML}
        <p class="text-pink-800 italic leading-relaxed text-lg px-2">"${data.msg}"</p>
        <button onclick="closeModal()" class="mt-6 bg-pink-400 text-white px-8 py-2 rounded-full font-bold shadow-md hover:bg-pink-500 transition">Close</button>
    `;
    modal.classList.remove('hidden');
}

function closeModal() {
    const video = document.getElementById('v-player');
    if(video) video.pause();
    document.getElementById('modal').classList.add('hidden');
}
function openModal(data) {
    // 1. Redirect for Feb 7
    if(data.day === 7 && data.month === 1) {
        window.location.href = "day7.html";
        return;
    }

    // 2. Standard Modal for other days
    const modal = document.getElementById('modal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;

    content.innerHTML = `
        <h2 class="title-font text-4xl text-pink-500 mb-4">${data.title}</h2>
        <p class="text-pink-800 leading-relaxed text-lg">${data.msg}</p>
        <button onclick="closeModal()" class="mt-8 bg-pink-400 text-white px-8 py-3 rounded-full font-bold shadow-lg">Close</button>
    `;
    modal.classList.remove('hidden');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#ffb6c1', '#ff69b4'] });
}
// --- ADMIN & LOCK LOGIC ---

// 1. Set your secret passcode here
const SECRET_PASSCODE = "1403"; 

function renderGrid(forceUnlock = false) {
    grid.innerHTML = ''; // Clear existing cards
    
    specialDates.forEach(dateObj => {
        // REAL LOGIC: Is it the right date? 
        // OR: Is Admin mode active?
        const isUnlocked = forceUnlock || (curMonth > dateObj.month) || (curMonth === dateObj.month && curDate >= dateObj.day);
        
        const card = document.createElement('div');
        // If locked, it gets the 'locked' class, otherwise 'unlocked'
        card.className = `h-40 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-pink-100 cursor-pointer p-4 text-center transition-all ${isUnlocked ? 'unlocked pink-glass shadow-sm' : 'locked text-pink-200'}`;
        
        card.innerHTML = `
            <span class="text-xs font-bold opacity-60 uppercase mb-1">${dateObj.label}</span>
            <span class="text-3xl">${isUnlocked ? '🎁' : '🔒'}</span>
            <p class="text-sm font-semibold mt-2">${isUnlocked ? 'Open Me' : 'Locked'}</p>
        `;

        card.onclick = () => {
            if (isUnlocked) {
                openModal(dateObj);
            } else {
                card.classList.add('shake');
                setTimeout(() => card.classList.remove('shake'), 400);
            }
        };
        grid.appendChild(card);
    });
}

// 2. Secret Unlock Function
window.adminUnlock = function() {
    const pw = prompt("Enter Admin Passcode:");
    if (pw === SECRET_PASSCODE) {
        alert("Admin Access Granted. All dates unlocked!");
        renderGrid(true); // Re-render with forceUnlock = true
    } else {
        alert("Wrong code, lover boy!");
    }
};

// 3. Initial Load (Locked based on date)
renderGrid(false);
// 4. Grid Generation (TEST MODE)
if (grid) {
    specialDates.forEach(dateObj => {
        const card = document.createElement('div');
        card.className = `h-40 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-pink-100 cursor-pointer p-4 text-center unlocked pink-glass shadow-sm`;
        card.innerHTML = `
            <span class="text-xs font-bold opacity-60 uppercase mb-1">${dateObj.label}</span>
            <span class="text-3xl">🎁</span>
            <p class="text-sm font-semibold mt-2 text-pink-500">Check Me!</p>
        `;
        card.onclick = () => openModal(dateObj);
        grid.appendChild(card);
    });
}


