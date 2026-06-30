// =========================
// LOADER
// =========================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }, 1500);

});

// =========================
// AOS
// =========================

AOS.init({
    duration: 1000,
    once: true
});

// =========================
// GSAP ANIMATIONS
// =========================

gsap.from("nav", {
    y: -100,
    opacity: 0,
    duration: 1
});

gsap.from(".hero-left h1", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    delay: 0.5
});

gsap.from(".hero-left p", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    delay: 0.8
});

gsap.from(".main-btn", {
    scale: 0,
    opacity: 0,
    duration: 1,
    delay: 1
});

gsap.from(".platter", {
    scale: 0,
    rotation: 180,
    duration: 1.5,
    delay: 0.8
});

// =========================
// THREE JS 3D SCENE
// =========================

const container = document.getElementById("three-container");

if (container) {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    container.appendChild(renderer.domElement);

    // Geometry

    const geometry =
        new THREE.TorusKnotGeometry(
            1,
            0.3,
            100,
            16
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0xffb703,
            metalness: 0.8,
            roughness: 0.2
        });

    const knot =
        new THREE.Mesh(
            geometry,
            material
        );

    scene.add(knot);

    // Lights

    const light1 =
        new THREE.PointLight(
            0xffffff,
            2
        );

    light1.position.set(
        5,
        5,
        5
    );

    scene.add(light1);

    const light2 =
        new THREE.AmbientLight(
            0xffffff,
            1
        );

    scene.add(light2);

    camera.position.z = 4;

    // Animation

    function animate() {

        requestAnimationFrame(
            animate
        );

        knot.rotation.x += 0.01;
        knot.rotation.y += 0.01;

        renderer.render(
            scene,
            camera
        );
    }

    animate();

    // Resize

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                container.clientWidth /
                container.clientHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(
                container.clientWidth,
                container.clientHeight
            );
        }
    );
}

// =========================
// MENU COUNTDOWN
// =========================

const countdown =
    document.getElementById(
        "countdown"
    );

if (countdown) {

    let hours = 12;
    let minutes = 0;
    let seconds = 0;

    setInterval(() => {

        if (seconds === 0) {

            if (minutes === 0) {

                if (hours === 0) {

                    hours = 12;
                    minutes = 0;
                    seconds = 0;

                } else {

                    hours--;
                    minutes = 59;
                    seconds = 59;
                }

            } else {

                minutes--;
                seconds = 59;
            }

        } else {

            seconds--;
        }

        const h =
            String(hours)
            .padStart(2, "0");

        const m =
            String(minutes)
            .padStart(2, "0");

        const s =
            String(seconds)
            .padStart(2, "0");

        countdown.innerText =
            `${h}:${m}:${s}`;

    }, 1000);
}

// =========================
// SMOOTH NAVIGATION
// =========================

document
.querySelectorAll(
    'a[href^="#"]'
)
.forEach(link => {

    link.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute(
                        "href"
                    )
                );

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    );

});

// =========================
// FOOD CARD HOVER EFFECT
// =========================

const cards =
document.querySelectorAll(
    ".food-card, .menu-card"
);

cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left;

            const y =
                e.clientY -
                rect.top;

            const rotateY =
                (x / rect.width - 0.5)
                * 20;

            const rotateX =
                -(y / rect.height - 0.5)
                * 20;

            card.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.03)
                `;
        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                scale(1)
                `;
        }
    );

});

// =========================
// FLOATING PARTICLES
// =========================

const particlesCount = 30;

for (
    let i = 0;
    i < particlesCount;
    i++
) {

    const particle =
        document.createElement(
            "div"
        );

    particle.classList.add(
        "particle"
    );

    particle.style.left =
        Math.random() * 100 +
        "vw";

    particle.style.top =
        Math.random() * 100 +
        "vh";

    particle.style.animationDuration =
        5 + Math.random() * 10 +
        "s";

    document.body.appendChild(
        particle
    );
}