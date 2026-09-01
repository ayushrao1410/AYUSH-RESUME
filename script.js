/* =========================================================
   AYUSH RAO PORTFOLIO
   Main JavaScript
========================================================= */


/* =========================
   ELEMENTS
========================= */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const revealElements = document.querySelectorAll(".reveal");



/* =========================
   HEADER ON SCROLL
========================= */

function handleHeader() {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", handleHeader);

handleHeader();



/* =========================
   MOBILE MENU
========================= */

function openMenu() {

    navMenu.classList.add("open");
    document.body.classList.add("no-scroll");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.innerHTML = `
        <i class="fa-solid fa-xmark"></i>
    `;

}


function closeMenu() {

    navMenu.classList.remove("open");
    document.body.classList.remove("no-scroll");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.innerHTML = `
        <i class="fa-solid fa-bars"></i>
    `;

}


menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.contains("open");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }

});


/* Close mobile menu when a link is clicked */

navLinks.forEach(link => {

    link.addEventListener("click", () => {
        closeMenu();
    });

});



/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");


function updateActiveNav() {

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                const target = link.getAttribute("href");

                if (target === `#${sectionId}`) {
                    link.classList.add("active");
                }

            });

        }

    });

}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();



/* =========================
   REVEAL ON SCROLL
========================= */

const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
};


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    observerOptions
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================
   PROJECT CARD TILT
========================= */

const projectCards = document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth < 900) return;

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -2;
        const rotateY = ((x - centerX) / centerX) * 2;

        card.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});



/* =========================
   CURRENT YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}



/* =========================
   KEYBOARD ACCESSIBILITY
========================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMenu();
    }

});



/* =========================
   SMOOTH ANCHOR HANDLING
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});