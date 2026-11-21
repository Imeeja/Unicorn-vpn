// Unicorn VPN landing page interactions
const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");
const themeToggle = document.querySelector("#themeToggle");
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");
const toast = document.querySelector("#toast");

// Mobile navigation: open/close, and close after choosing a link.
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navMenu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }),
);

// Toggle a bright reading theme. The selected mode is remembered in this browser.
const savedTheme = localStorage.getItem("unicorn-theme");

if (savedTheme !== "dark") {
  document.body.classList.add("light-theme");
}
function updateThemeIcon() {
  themeToggle.textContent = document.body.classList.contains("light-theme")
    ? "☾"
    : "☼";
}
updateThemeIcon();
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem(
    "unicorn-theme",
    document.body.classList.contains("light-theme") ? "light" : "dark",
  );
  updateThemeIcon();
});

// Reveal content as it enters the viewport.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// Count-up stats when the network section appears.
const counters = document.querySelectorAll(".counter");
let countersStarted = false;
const counterObserver = new IntersectionObserver(
  (entries) => {
    if (entries.some((entry) => entry.isIntersecting) && !countersStarted) {
      countersStarted = true;
      counters.forEach((counter) => {
        const target = Number(counter.dataset.count);
        const duration = 1300;
        const startTime = performance.now();
        function tick(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }
  },
  { threshold: 0.25 },
);
const networkSection = document.querySelector("#network");
if (networkSection) counterObserver.observe(networkSection);

// FAQ toggles the plus/minus symbol accessibly without relying on CSS-only tricks.
document.querySelectorAll(".faq-list details").forEach((details) => {
  details.addEventListener("toggle", () => {
    const symbol = details.querySelector("summary span");
    if (symbol) symbol.textContent = details.open ? "−" : "+";
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3200);
}

// Contact form: client-side validation and demo feedback (no backend/email delivery).
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (name.length < 2) {
    formMessage.textContent = "Please enter a name of at least 2 characters.";
    formMessage.style.color = "#ffb1dc";
    document.querySelector("#name").focus();
    return;
  }
  if (!emailIsValid) {
    formMessage.textContent = "That email address does not look quite right.";
    formMessage.style.color = "#ffb1dc";
    document.querySelector("#email").focus();
    return;
  }
  if (message.length < 10) {
    formMessage.textContent = "Your message needs at least 10 characters.";
    formMessage.style.color = "#ffb1dc";
    document.querySelector("#message").focus();
    return;
  }
  formMessage.textContent = `Thanks, ${name}! Your message is ready. (Demo form — no message was sent.)`;
  formMessage.style.color = "#a8fff2";
  showToast("Your message passed validation ✨");
  contactForm.reset();
});
