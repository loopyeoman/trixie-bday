// BOOT TEXT ANIMATION
const bootText = [
    "Initializing Trixie.exe...",
    "Loading modules...",
    "Stabilizing circuits...",
    "Optimizing signal...",
    "Ready. Pressing START..."
];

let index = 0;
const bootElem = document.getElementById("boot-text");

function typeLines() {
    if (index < bootText.length) {
        bootElem.textContent += bootText[index] + "\n";
        index++;
        setTimeout(typeLines, 700);
    } else {
        setTimeout(() => {
            document.getElementById("boot-screen").classList.add("hidden");
            document.getElementById("quiz-screen").classList.remove("hidden");
        }, 1000);
    }
}
typeLines();

// QUIZ FINISH
document.getElementById("finish-btn").onclick = () => {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("reveal-screen").classList.remove("hidden");

    document.getElementById("bgm").volume = 0.15;
    document.getElementById("bgm").play();

    startConfetti();
    startSlideshow();
};

// SLIDESHOW
let pics = ["trixie1.jpg", "trixie2.jpg", "trixie3.jpg", "trixie4.jpg"];
let i = 0;

function startSlideshow() {
    setInterval(() => {
        i = (i + 1) % pics.length;
        document.getElementById("slide").src = pics[i];
    }, 1900);
}

// CONFETTI (simple)
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let conf = [];
    for (let i = 0; i < 150; i++) {
        conf.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 4 + Math.random() * 4,
            d: Math.random() * 1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff7db8";

        conf.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            ctx.fill();
        });
        update();
    }

    function update() {
        conf.forEach(c => {
            c.y += c.d + 1;
            if (c.y > canvas.height) {
                c.y = 0;
                c.x = Math.random() * canvas.width;
            }
        });
    }

    setInterval(draw, 20);
}
