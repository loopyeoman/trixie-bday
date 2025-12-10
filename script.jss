// ---------- BOOT typing + START ----------
const bootLines = [
    "Initializing Trixie.exe...",
    "Loading modules...",
    "Stabilizing circuits...",
    "Optimizing signal...",
    "Ready."
];

const bootTextEl = document.getElementById("boot-text");
const startBtn = document.getElementById("start-btn");
const bootScreen = document.getElementById("boot-screen");
const quizScreen = document.getElementById("quiz-screen");
const revealScreen = document.getElementById("reveal-screen");
const finishBtn = document.getElementById("finish-btn");
const bgm = document.getElementById("bgm");
const replayBtn = document.getElementById("replay-btn");

let bootIndex = 0;
function typeBoot() {
    if (bootIndex < bootLines.length) {
        bootTextEl.textContent += bootLines[bootIndex] + "\n";
        bootIndex++;
        setTimeout(typeBoot, 650);
    } else {
        bootTextEl.textContent += "\nPress START to begin stability test.";
        startBtn.classList.remove("hidden");
    }
}
typeBoot();

startBtn.addEventListener("click", () => {
    // small transition
    bootScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    // focus first input
    const first = document.querySelector(".ans-input");
    if (first) first.focus();
});

// ---------- QUIZ (all answers accepted) ----------
finishBtn.addEventListener("click", () => {
    // optional: you can read answers but we ignore correctness
    quizScreen.classList.add("hidden");
    revealScreen.classList.remove("hidden");

    // play music (user action triggered playback)
    try {
        bgm.volume = 0.15;
        bgm.play().catch(()=>{ /* ignore autoplay blocks */ });
    } catch(e){}

    startConfetti();
    startSlideshow();
});

// ---------- SLIDESHOW ----------
const pics = ["trixie1.jpg","trixie2.jpg","trixie3.jpg","trixie4.jpg"];
let slideI = 0;
function startSlideshow(){
    const slideEl = document.getElementById("slide");
    slideEl.src = pics[0];
    setInterval(()=>{
        slideI = (slideI + 1) % pics.length;
        slideEl.src = pics[slideI];
    }, 1900);
}

// ---------- CONFETTI ----------
function startConfetti(){
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    function resize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const pieces = [];
    const colors = ["#ffb3d9","#ff7db8","#ffd6e8","#fff0fc","#ff9ccf","#ffd1e6"];
    for(let i=0;i<250;i++){
        pieces.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height - canvas.height,
            r: 4 + Math.random()*6,
            vx: Math.random()*1 - 0.5,
            vy: 1 + Math.random()*3,
            color: colors[Math.floor(Math.random()*colors.length)],
            rot: Math.random()*360,
            vr: (Math.random()-0.5)*8
        });
    }

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(const p of pieces){
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI/180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*1.6);
            ctx.restore();
        }
        update();
    }

    function update(){
        for(const p of pieces){
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vr;
            if(p.y > canvas.height + 20){
                p.y = -20;
                p.x = Math.random()*canvas.width;
            }
            if(p.x > canvas.width + 30) p.x = -30;
            if(p.x < -30) p.x = canvas.width + 30;
        }
    }

    setInterval(draw, 20);
}

// ---------- REPLAY ----------
replayBtn.addEventListener("click", () => {
    // restart from boot
    revealScreen.classList.add("hidden");
    bootScreen.classList.remove("hidden");
    bootTextEl.textContent = "";
    bootIndex = 0;
    startBtn.classList.add("hidden");
    typeBoot();
    // stop music
    try { bgm.pause(); bgm.currentTime = 0; } catch(e){}
});
