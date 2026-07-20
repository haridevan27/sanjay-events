const canvas = document.getElementById("lightfall");
const ctx = canvas.getContext("2d");

let width;
let height;


/* =========================
   MOUSE POSITION
========================= */

const mouse = {
    x: -1000,
    y: -1000
};


const streaks = [];


const colors = [
    "rgba(255, 205, 80, 0.9)",
    "rgba(255, 230, 140, 0.8)",
    "rgba(218, 160, 35, 0.7)"
];


/* =========================
   RESIZE CANVAS
========================= */

function resizeCanvas() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}


/* =========================
   CREATE LIGHT STREAK
========================= */

function createStreak() {

    return {

        x: Math.random() * width,

        y: Math.random() * height,

        length: Math.random() * 120 + 50,

        speed: Math.random() * 1.5 + 0.5,

        width: Math.random() * 1.5 + 0.5,

        color: colors[
            Math.floor(
                Math.random() * colors.length
            )
        ]

    };

}


/* =========================
   INITIALIZE STREAKS
========================= */

function initializeStreaks() {

    streaks.length = 0;


    for (let i = 0; i < 80; i++) {

        streaks.push(
            createStreak()
        );

    }

}


/* =========================
   DRAW LIGHT STREAK
========================= */

function drawStreak(streak) {

    const gradient =
        ctx.createLinearGradient(
            streak.x,
            streak.y,
            streak.x,
            streak.y + streak.length
        );


    gradient.addColorStop(
        0,
        "rgba(255, 220, 120, 0)"
    );


    gradient.addColorStop(
        0.5,
        streak.color
    );


    gradient.addColorStop(
        1,
        "rgba(255, 220, 120, 0)"
    );


    ctx.beginPath();


    ctx.strokeStyle = gradient;


    ctx.lineWidth = streak.width;


    ctx.shadowBlur = 12;


    ctx.shadowColor = "#eabf52";


    ctx.moveTo(
        streak.x,
        streak.y
    );


    ctx.lineTo(
        streak.x,
        streak.y + streak.length
    );


    ctx.stroke();


    ctx.shadowBlur = 0;

}


/* =========================
   ANIMATION
========================= */

function animate() {


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* Background glow */

    const backgroundGlow =
        ctx.createRadialGradient(
            width / 2,
            height / 2,
            0,
            width / 2,
            height / 2,
            width * 0.7
        );


    backgroundGlow.addColorStop(
        0,
        "rgba(120, 65, 110, 0.18)"
    );


    backgroundGlow.addColorStop(
        0.5,
        "rgba(45, 20, 50, 0.08)"
    );


    backgroundGlow.addColorStop(
        1,
        "rgba(0, 0, 0, 0)"
    );


    ctx.fillStyle =
        backgroundGlow;


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /* Light streaks */

    streaks.forEach(
        streak => {


            /* Mouse interaction */

            const dx =
                streak.x - mouse.x;


            const dy =
                streak.y - mouse.y;


            const distance =
                Math.sqrt(
                    dx * dx + dy * dy
                );


            const interactionRadius =
                220;


            if (
                distance <
                interactionRadius
            ) {


                const force =
                    (
                        interactionRadius -
                        distance
                    ) /
                    interactionRadius;


                const angle =
                    Math.atan2(
                        dy,
                        dx
                    );


                /* Mouse pakkathula streaks move away */

                streak.x +=
                    Math.cos(angle) *
                    force *
                    2.5;


                streak.y +=
                    Math.sin(angle) *
                    force *
                    2.5;

            }


            /* Draw */

            drawStreak(
                streak
            );


            /* Falling movement */

            streak.y +=
                streak.speed;


            /* Reset */

            if (
                streak.y >
                height +
                streak.length
            ) {


                streak.y =
                    -streak.length;


                streak.x =
                    Math.random() *
                    width;

            }

        }
    );


    requestAnimationFrame(
        animate
    );

}


/* =========================
   MOUSE MOVE
========================= */

window.addEventListener(
    "mousemove",
    event => {

        mouse.x =
            event.clientX;


        mouse.y =
            event.clientY;

    }
);


/* =========================
   MOUSE LEAVE
========================= */

window.addEventListener(
    "mouseleave",
    () => {

        mouse.x = -1000;

        mouse.y = -1000;

    }
);


/* =========================
   RESIZE
========================= */

window.addEventListener(
    "resize",
    () => {

        resizeCanvas();

        initializeStreaks();

    }
);


/* =========================
   START
========================= */

resizeCanvas();

initializeStreaks();

animate();