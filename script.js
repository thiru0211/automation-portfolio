window.addEventListener("load", () => {
    if (window.location.hash) {
        window.scrollTo(0, 0);
        history.replaceState(null, "", window.location.pathname);
    }
});

// ======================
// SCROLL TO SKILLS
// ======================
function scrollToSkills() {
    document.getElementById("skills").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// ======================
// SCROLL REVEAL ANIMATION
// ======================
function reveal() {
    document.querySelectorAll(".reveal").forEach((el, index) => {
        const top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {
            setTimeout(() => {
                el.classList.add("active");
            }, index * 40);
        }
    });
}


window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// ==================================================
// ✅ STEP 3: NAVBAR SCROLL EFFECT (ADD HERE)
// ==================================================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ===============================
// ✅ SKILLS → EXPERIENCE DOWN ARROW
// ===============================
window.addEventListener("load", () => {
    const scrollDownBtn = document.querySelector(".scroll-down");

    if (!scrollDownBtn) return;

    scrollDownBtn.addEventListener("click", () => {
        document.getElementById("experience")?.scrollIntoView({
            behavior: "smooth"
        });
        scrollDownBtn.classList.add("hide");
    });
});

// ===============================
// ✅ AUTO-HIDE SKILLS DOWN ARROW
// ===============================
window.addEventListener("scroll", () => {
    const arrow = document.querySelector(".scroll-down");
    const skillsSection = document.getElementById("skills");

    if (!arrow || !skillsSection) return;

    const skillsBottom = skillsSection.getBoundingClientRect().bottom;

    // Hide arrow once user scrolls past Skills section
    if (skillsBottom < window.innerHeight * 0.7) {
        arrow.classList.add("hide");
    } else {
        arrow.classList.remove("hide");
    }
});

// ===============================
// ✅ CONTACT → SCROLL TO TOP
// ===============================
window.addEventListener("scroll", () => {
    const scrollUpBtn = document.querySelector(".scroll-up");
    const contactSection = document.getElementById("contact");

    if (!scrollUpBtn || !contactSection) return;

    const contactTop = contactSection.getBoundingClientRect().top;

    // Show button when Contact section enters viewport
    if (contactTop < window.innerHeight * 0.6) {
        scrollUpBtn.classList.add("show");
    } else {
        scrollUpBtn.classList.remove("show");
    }
});

document.querySelector(".scroll-up")?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ===============================
// THREE.JS 3D BACKGROUND (ONLY UI BACKGROUND)
// ===============================
window.addEventListener("load", () => {

    const canvas = document.getElementById("three-container");
    if (!canvas || !window.THREE) return;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1220);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 6;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    renderer.setClearColor(0x0b1220, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ======================
    // PARTICLE BACKGROUND
    // ======================
    const particleCount = 900;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < positions.length; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
        color: 0x7dd3fc,
        size: 0.06,
        transparent: true,
        opacity: 0.45,
        depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);




    // ======================
    // ANIMATION LOOP
    // ======================
    function animate() {
        requestAnimationFrame(animate);

        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0003;

        renderer.render(scene, camera);
    }

    animate();

    // ======================
    // PARALLAX (SUBTLE)
    // ======================
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 0.0008;
        const y = (e.clientY / window.innerHeight - 0.5) * 0.0008;

        particles.rotation.y += x;
        particles.rotation.x += y;
    });

    // ======================
    // RESPONSIVE
    // ======================
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

});
