// Año dinámico en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Cierra el menú al hacer clic en un enlace (móvil)
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Carrusel de imágenes en cada tarjeta de proyecto
document.querySelectorAll(".project-media").forEach((media) => {
  const track = media.querySelector(".media-track");
  const images = track.querySelectorAll("img");
  const dotsWrap = media.querySelector(".media-dots");
  const prevBtn = media.querySelector(".media-prev");
  const nextBtn = media.querySelector(".media-next");

  // Si solo hay una imagen, no se necesitan controles
  if (images.length <= 1) {
    prevBtn?.remove();
    nextBtn?.remove();
    dotsWrap?.remove();
    return;
  }

  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "media-dot" + (i === 0 ? " active" : "");
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll(".media-dot");

  const updateActiveDot = () => {
    const index = Math.round(track.scrollLeft / track.clientWidth);
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  };

  let scrollTimeout;
  track.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveDot, 80);
  });

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
  });
  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
  });
});

// Revela las secciones al hacer scroll
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));
