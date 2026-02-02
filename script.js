const specialDates = [
    { day: 7, month: 1, label: "Feb 7", title: "Rose Day 🌹", msg: "A fresh start to our week of love!" },
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

const grid = document.getElementById('calendarGrid');
const now = new Date();
const curDate = now.getDate();
const curMonth = now.getMonth(); 

function updateProgress() {
    const start = new Date(now.getFullYear(), 1, 7); 
    const end = new Date(now.getFullYear(), 2, 27); 
    const progress = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
    document.getElementById('progressBar').style.width = progress + "%";
    document.getElementById('percentText').innerText = Math.floor(progress) + "% Journey Complete";
}

specialDates.forEach(dateObj => {
    // Logic: Is current month/day past or equal to the special date?
    const isUnlocked = (curMonth > dateObj.month) || (curMonth === dateObj.month && curDate >= dateObj.day);
    
    const card = document.createElement('div');
    card.className = `h-40 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-pink-100 cursor-pointer p-4 text-center ${isUnlocked ? 'unlocked pink-glass' : 'locked text-pink-200'}`;
    
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

function openModal(data) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modalContent');
    content.innerHTML = `
        <h2 class="title-font text-4xl text-pink-500 mb-4">${data.title}</h2>
        <p class="text-pink-800 leading-relaxed text-lg">${data.msg}</p>
        <button onclick="closeModal()" class="mt-8 bg-pink-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-pink-500 transition">Close</button>
    `;
    modal.classList.remove('hidden');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#ffb6c1', '#ff69b4'] });
}

function closeModal() { document.getElementById('modal').classList.add('hidden'); }
updateProgress();