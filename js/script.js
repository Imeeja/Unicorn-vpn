/* ==========================================================================
   AURELIA ESTATES — Interactive Logic
   Features:
   1. Dynamic Property Portfolio Rendering & Category Filtering
   2. Property Dossier Modal Popup
   3. Mobile Hamburger Menu Navigation
   4. Real-Time Mortgage & Acquisition Calculator
   5. High-Contrast Dark / Daylight Theme Toggle
   6. Comprehensive Client-Side Contact Form Validation
   7. IntersectionObserver Scroll Reveal Animations
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. Property Dataset & Dynamic DOM Rendering
  // ------------------------------------------------------------------------
  const propertiesData = [
    {
      id: 1,
      title: "The Obsidian Pavilion",
      category: "villa",
      tag: "Modern Villa",
      location: "Beverly Hills, CA",
      price: "$8,950,000",
      beds: 6,
      baths: 8,
      sqft: "9,400 sq ft",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85",
      alt: "Cantilevered modernist glass and stone villa overlooking an infinity pool at twilight",
      description:
        "Cantilevered steel and board-formed concrete estate boasting 270-degree canyon-to-ocean views, a 90-foot zero-edge pool, subterranean 8-car gallery, and bespoke walnut millwork.",
    },
    {
      id: 2,
      title: "The Crown Triplex Penthouse",
      category: "penthouse",
      tag: "Sky Penthouse",
      location: "Tribeca, New York, NY",
      price: "$14,500,000",
      beds: 5,
      baths: 6,
      sqft: "7,850 sq ft",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85",
      alt: "Double-height luxury penthouse living room with floor-to-ceiling windows and skyline view",
      description:
        "Occupying the top three floors of a landmark cast-iron tower, featuring private keyed elevator access, 2,400 sq ft of landscaped wrap-around terraces, and a sculptural bronze staircase.",
    },
    {
      id: 3,
      title: "Villa Bellagio Heritage Manor",
      category: "historic",
      tag: "Heritage Manor",
      location: "Greenwich, CT",
      price: "$11,200,000",
      beds: 7,
      baths: 9,
      sqft: "12,100 sq ft",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
      alt: "Grand limestone estate manor surrounded by manicured gardens and classical columns",
      description:
        "Restored 1928 limestone estate set across 4.5 manicured acres with formal boxwood parterres, limestone conservatory, wine vault for 3,000 bottles, and guest carriage house.",
    },
    {
      id: 4,
      title: "Solstice Cliffside Residence",
      category: "villa",
      tag: "Modern Villa",
      location: "Malibu, CA",
      price: "$16,800,000",
      beds: 5,
      baths: 7,
      sqft: "8,200 sq ft",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
      alt: "Architectural coastal residence with warm wood ceilings and panoramic ocean glass walls",
      description:
        "Dramatic coastal sanctuary engineered directly into the bluff with private cove access, travertine radiant floors, and retractable motorized glass walls.",
    },
    {
      id: 5,
      title: "The Aurelia Sky Residence",
      category: "penthouse",
      tag: "Sky Penthouse",
      location: "Brickell Key, Miami, FL",
      price: "$9,750,000",
      beds: 4,
      baths: 5,
      sqft: "6,300 sq ft",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85",
      alt: "Contemporary high-rise penthouse terrace overlooking Biscayne Bay at sunset",
      description:
        "Full-floor waterfront penthouse offering private rooftop plunge pool, summer kitchen, Italian marble spa suite, and dedicated private yacht slip.",
    },
    {
      id: 6,
      title: "Beacon Hill Limestone Townhouse",
      category: "historic",
      tag: "Heritage Manor",
      location: "Boston, MA",
      price: "$7,900,000",
      beds: 5,
      baths: 6,
      sqft: "6,950 sq ft",
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1000&q=85",
      alt: "Historic brick and limestone luxury townhouse with arched windows and warm facade lighting",
      description:
        "Five-story architectural masterpiece combining preserved 19th-century crown moldings and marble hearths with an internal glass elevator and smart-home automation.",
    },
  ];

  const propertiesGrid = document.getElementById("properties-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  function renderProperties(filterCategory = "all") {
    propertiesGrid.innerHTML = "";

    const filtered =
      filterCategory === "all"
        ? propertiesData
        : propertiesData.filter((item) => item.category === filterCategory);

    filtered.forEach((property) => {
      const card = document.createElement("article");
      card.className = "property-card";
      card.innerHTML = `
        <div class="property-media">
          <span class="property-tag">${property.tag}</span>
          <img src="${property.image}" alt="${property.alt}" loading="lazy" />
          <div class="property-price">${property.price}</div>
        </div>
        <div class="property-body">
          <span class="property-location">${property.location}</span>
          <h3>${property.title}</h3>
          <div class="property-specs">
            <span>${property.beds} Beds</span>
            <span>${property.baths} Baths</span>
            <span>${property.sqft}</span>
          </div>
          <button class="btn btn-primary btn-full inspect-btn" data-id="${property.id}">
            Inspect Dossier
          </button>
        </div>
      `;
      propertiesGrid.appendChild(card);
    });
  }

  renderProperties();

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProperties(btn.dataset.filter);
    });
  });

  // ------------------------------------------------------------------------
  // 2. Interactive Property Modal Popup
  // ------------------------------------------------------------------------
  const modal = document.getElementById("property-modal");
  const modalContent = document.getElementById("modal-content");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  propertiesGrid.addEventListener("click", (e) => {
    const inspectBtn = e.target.closest(".inspect-btn");
    if (!inspectBtn) return;

    const propertyId = Number(inspectBtn.dataset.id);
    const prop = propertiesData.find((item) => item.id === propertyId);
    if (!prop) return;

    modalContent.innerHTML = `
      <img src="${prop.image}" alt="${prop.alt}" class="modal-hero-img" />
      <div class="modal-details">
        <span class="property-location">${prop.location} • ${prop.tag}</span>
        <h3 id="modal-title">${prop.title}</h3>
        <div class="modal-price-banner">${prop.price}</div>
        <p style="margin-bottom: 1.25rem;">${prop.description}</p>
        <div class="property-specs" style="margin-bottom: 1.5rem;">
          <span><strong>${prop.beds}</strong> Bedrooms</span>
          <span><strong>${prop.baths}</strong> Bathrooms</span>
          <span><strong>${prop.sqft}</strong> Interior</span>
        </div>
        <a href="#contact" class="btn btn-primary btn-full" id="modal-inquire-link">
          Request Private Viewing for ${prop.title}
        </a>
      </div>
    `;

    modal.hidden = false;
    document.body.style.overflow = "hidden";

    document
      .getElementById("modal-inquire-link")
      .addEventListener("click", () => {
        closeModal();
        const messageField = document.getElementById("message");
        messageField.value = `I would like to schedule a private viewing for ${prop.title} (${prop.location}) listed at ${prop.price}.`;
      });
  });

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  modalCloseBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // ------------------------------------------------------------------------
  // 3. Mobile Hamburger Menu
  // ------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburgerBtn.classList.toggle("active");
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburgerBtn.classList.remove("active");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    });
  });

  // ------------------------------------------------------------------------
  // 4. Dark / Daylight Mode Toggle
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    themeIcon.textContent = isDark ? "☀" : "☾";
  });

  // ------------------------------------------------------------------------
  // 5. Real-Time Mortgage & Acquisition Calculator
  // ------------------------------------------------------------------------
  const priceRange = document.getElementById("price-range");
  const downRange = document.getElementById("down-range");
  const rateRange = document.getElementById("rate-range");

  const priceOutput = document.getElementById("price-output");
  const downOutput = document.getElementById("down-output");
  const rateOutput = document.getElementById("rate-output");
  const monthlyPaymentEl = document.getElementById("monthly-payment");
  const loanSummaryEl = document.getElementById("loan-summary");

  function formatCurrency(num) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  }

  function calculateMortgage() {
    const price = Number(priceRange.value);
    const downPercent = Number(downRange.value);
    const annualRate = Number(rateRange.value);

    const downAmount = price * (downPercent / 100);
    const principal = price - downAmount;
    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = 30 * 12;

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    priceOutput.textContent = formatCurrency(price);
    downOutput.textContent = `${downPercent}% (${formatCurrency(downAmount)})`;
    rateOutput.textContent = `${annualRate.toFixed(2)}%`;
    monthlyPaymentEl.textContent = formatCurrency(Math.round(monthlyPayment));
    loanSummaryEl.textContent = `Loan Principal: ${formatCurrency(principal)} • 30-Year Fixed`;
  }

  [priceRange, downRange, rateRange].forEach((slider) => {
    slider.addEventListener("input", calculateMortgage);
  });

  calculateMortgage();

  // ------------------------------------------------------------------------
  // 6. Contact Form Validation
  // ------------------------------------------------------------------------
  const inquiryForm = document.getElementById("inquiry-form");
  const fullNameInput = document.getElementById("full-name");
  const emailInput = document.getElementById("email");
  const interestSelect = document.getElementById("interest");
  const messageInput = document.getElementById("message");
  const formFeedback = document.getElementById("form-feedback");

  function setFieldError(inputEl, errorElId, message) {
    const errorEl = document.getElementById(errorElId);
    if (message) {
      inputEl.classList.add("invalid");
      errorEl.textContent = message;
      return false;
    } else {
      inputEl.classList.remove("invalid");
      errorEl.textContent = "";
      return true;
    }
  }

  inquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formFeedback.textContent = "";
    formFeedback.className = "form-feedback";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isNameValid = setFieldError(
      fullNameInput,
      "name-error",
      fullNameInput.value.trim().length < 2
        ? "Please enter your full formal name."
        : "",
    );

    const isEmailValid = setFieldError(
      emailInput,
      "email-error",
      !emailRegex.test(emailInput.value.trim())
        ? "Please provide a valid email address."
        : "",
    );

    const isInterestValid = setFieldError(
      interestSelect,
      "interest-error",
      interestSelect.value === "" ? "Please select an inquiry objective." : "",
    );

    const isMessageValid = setFieldError(
      messageInput,
      "message-error",
      messageInput.value.trim().length < 15
        ? "Please provide at least 15 characters describing your inquiry."
        : "",
    );

    if (isNameValid && isEmailValid && isInterestValid && isMessageValid) {
      formFeedback.classList.add("success");
      formFeedback.textContent = `Thank you, ${fullNameInput.value.trim()}. A Senior Managing Partner will contact you within 2 business hours.`;
      inquiryForm.reset();
    }
  });

  // ------------------------------------------------------------------------
  // 7. Scroll Reveal Animation Observer
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});
