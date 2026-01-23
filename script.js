// ======================
// HERO SLIDER FUNCTIONALITY
// ======================
const slides = document.querySelectorAll(".slide"); // all slide divs
const dots = document.querySelectorAll(".dot");     // bottom dots
let index = 0;                                      // current slide index

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove("active");              // hide slides
    const content = slide.querySelector(".slide-content");
    if (content) content.classList.remove("show"); // hide text
    if (dots[idx]) dots[idx].classList.remove("active"); // deactivate dots
  });

  slides[i].classList.add("active");              // show slide

  // Animate text after image loads
  setTimeout(() => {
    const content = slides[i].querySelector(".slide-content");
    if (content) content.classList.add("show");
  }, 800);

  if (dots[i]) dots[i].classList.add("active");   // activate dot
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

if (slides.length > 0) {
  setInterval(nextSlide, 4000); // auto-slide
  showSlide(index);             // initial display
}


// ======================
// COUNTDOWN TIMER (PREMIUM & SAFE)
// ======================
const eventDate = new Date("February 9, 2026 09:00:00 GMT+0530").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownSection = document.querySelector(".countdown");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    clearInterval(countdownInterval);
    if (countdownSection) {
      countdownSection.innerHTML = "<h2>🚀 Event is Live!</h2>";
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// ======================
// SCROLL FADE EFFECT (PREMIUM)
// ======================
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-show"); // fade in elements
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".fade").forEach(el => observer.observe(el));

// ======================
// NAVBAR SCROLL EFFECT
// ======================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (!navbar) return;
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled"); // add blur & shadow
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ======================
// HERO PARALLAX SCROLL
// ======================
window.addEventListener("scroll", () => {
  document.querySelectorAll(".slide").forEach(slide => {
    slide.style.backgroundPositionY = window.scrollY * 0.2 + "px";
  });
});

// ======================
// CHANGING WORD ANIMATION
// ======================
const words = ["PASSION", "INNOVATION", "TECHNOLOGY", "EXCELLENCE"];
let wordIndex = 0;
const wordSpan = document.getElementById("changing-word");

if (wordSpan) {
  setInterval(() => {
    wordSpan.style.opacity = 0;

    setTimeout(() => {
      wordSpan.textContent = words[wordIndex];
      wordSpan.style.opacity = 1;
      wordIndex = (wordIndex + 1) % words.length;
    }, 400);
  }, 3000);
}

// ======================
// REVEAL ON SCROLL (ABOUT / EVENTS / PARTICIPATE)
// ======================
const revealElements = document.querySelectorAll(".about, .events, .participate");

function revealOnScroll() {
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("reveal");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ======================
// MODAL FUNCTIONS
// ======================
function openModal(title, img) {
  const modal = document.getElementById("eventModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImg = document.getElementById("modalImg");
  if (!modal || !modalTitle || !modalImg) return;
  modalTitle.innerText = title;
  modalImg.src = img;
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("eventModal");
  if (modal) modal.style.display = "none";
}

// ======================
// TECH MODAL CONTROLS
// ======================
function openTechModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // disable scroll when modal open
}

function closeTechModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // restore scroll
}

// Close on outside click
document.querySelectorAll(".tech-modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});

// Close with ESC key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".tech-modal").forEach(modal => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }
});

// ======================
// CHAT BOX FUNCTIONALITY
// ======================
const chatInput = document.querySelector("#chatModal input");
const chatWindow = document.querySelector(".chat-window");
const chatBtn = document.querySelector("#chatModal .modal-btn");

if (chatBtn && chatInput && chatWindow) {
  chatBtn.addEventListener("click", sendChat);
  chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendChat();
  });
}

function sendChat() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  const userMsg = document.createElement("p");
  userMsg.textContent = "You: " + msg;
  userMsg.style.color = "#fff";
  chatWindow.appendChild(userMsg);

  chatInput.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;

  setTimeout(() => {
    const botReply = document.createElement("p");
    botReply.textContent = "🤖 We’ll get back to you shortly!";
    botReply.classList.add("bot-msg");
    chatWindow.appendChild(botReply);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 800);
}

// ======================
// FEEDBACK STAR INTERACTION
// ======================
const stars = document.querySelectorAll(".stars");
stars.forEach(starBlock => {
  starBlock.addEventListener("click", () => {
    starBlock.textContent = "★ ★ ★ ★ ★";
    starBlock.style.textShadow = "0 0 10px rgba(245,196,0,0.8)";
  });
});

// ======================
// HALF-CIRCLE SMART CONTROL
// ======================
document.querySelectorAll(".inner-circle").forEach(circle => {
  let autoScroll = true;
  const items = circle.querySelectorAll(".circle-item");
  let index = 0;

  function activateItem(i) {
    items.forEach(el => el.classList.remove("active"));
    items[i].classList.add("active");
  }

  activateItem(0);

  const interval = setInterval(() => {
    if (!autoScroll) return;
    index = (index + 1) % items.length;
    circle.scrollTo({ top: index * 360, behavior: "smooth" });
    activateItem(index);
  }, 3500);

  circle.addEventListener("mouseenter", () => autoScroll = false);
  circle.addEventListener("mouseleave", () => autoScroll = true);

  items.forEach((item, i) => {
    item.addEventListener("click", () => {
      activateItem(i);
      const modalId = item.dataset.modal; // trigger modal
      if (modalId) openTechModal(modalId);
    });
  });
});

// ======================
// CONTACT FORM (NO BACKEND)
// ======================
const contactBtn = document.getElementById("contactSubmit");
if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const msg = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !msg) {
      alert("Please fill all fields");
      return;
    }

    alert("✅ Message noted! We’ll contact you soon.");
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMessage").value = "";

    closeTechModal("contactModal");
  });
}

// ======================
// FEEDBACK (LOCAL STORAGE)
// ======================
let selectedStars = 5;
const starBlock = document.querySelector("#feedbackModal .stars");
if (starBlock) {
  starBlock.addEventListener("click", () => {
    selectedStars = 5;
    starBlock.style.textShadow = "0 0 15px gold";
  });
}

const feedbackBtn = document.getElementById("feedbackSubmit");
if (feedbackBtn) {
  feedbackBtn.addEventListener("click", () => {
    const feedback = document.getElementById("feedbackText").value.trim();
    if (!feedback) {
      alert("Please write feedback");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("technomeetFeedback")) || [];
    stored.push({ stars: selectedStars, text: feedback, time: new Date() });
    localStorage.setItem("technomeetFeedback", JSON.stringify(stored));

    alert("⭐ Thanks for your feedback!");
    document.getElementById("feedbackText").value = "";
    closeTechModal("feedbackModal");
  });
}

// ======================
// QUERY (LOCAL STORAGE)
// ======================
const queryBtn = document.getElementById("querySubmit");
if (queryBtn) {
  queryBtn.addEventListener("click", () => {
    const subject = document.getElementById("querySubject").value.trim();
    const query = document.getElementById("queryText").value.trim();

    if (!subject || !query) {
      alert("Please fill all fields");
      return;
    }

    const queries = JSON.parse(localStorage.getItem("technomeetQueries")) || [];
    queries.push({ subject, query, time: new Date() });
    localStorage.setItem("technomeetQueries", JSON.stringify(queries));

    alert("📩 Query submitted successfully!");
    document.getElementById("querySubject").value = "";
    document.getElementById("queryText").value = "";
    closeTechModal("queryModal");
  });
}

document.querySelectorAll('.arc-item').forEach(item => {
  item.addEventListener('click', () => {
    openTechModal(item.dataset.modal);
  });
});

const slider = document.querySelector('.scroll-slider');
const track = document.getElementById('scroll-track');

let scrollAmount = 0;

// Auto-scroll
function autoScroll(){
  scrollAmount += 1.5; // original speed
  if(scrollAmount >= track.scrollWidth - slider.clientWidth){
    scrollAmount = 0;
  }
  slider.scrollLeft = scrollAmount;
  requestAnimationFrame(autoScroll);
}
autoScroll();

// Mouse wheel scroll
slider.addEventListener('wheel', (e)=>{
  e.preventDefault();
  slider.scrollLeft += e.deltaY;
});

// ======================
// MOBILE HAMBURGER MENU
// ======================
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const menuIcon = document.getElementById("menuIcon");

// Toggle menu
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Toggle icon
  menuIcon.classList.toggle("fa-bars");
  menuIcon.classList.toggle("fa-times");

  // Disable scroll when menu open
  document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";
});

// Close menu when any link is clicked (mobile)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuIcon.classList.add("fa-bars");
      menuIcon.classList.remove("fa-times");
      document.body.style.overflow = "auto";
    }
  });
});

// Optional: Close menu on resize > 768px
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
    menuIcon.classList.add("fa-bars");
    menuIcon.classList.remove("fa-times");
    document.body.style.overflow = "auto";
  }
});


// ======================
// MOBILE NAV LINK STAGGER ANIMATION WITH RESET
// ======================
const navItems = document.querySelectorAll(".nav-links li");

function animateNavLinks() {
  navItems.forEach((item, index) => {
    item.style.transition = `opacity 0.4s ease ${index * 0.08}s, transform 0.4s ease ${index * 0.08}s`;
    if (navLinks.classList.contains("active")) {
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    } else {
      item.style.opacity = "0";
      item.style.transform = "translateX(20px)";
    }
  });
}

// Animate when hamburger is clicked
hamburger.addEventListener("click", animateNavLinks);

// Reset nav items on window resize (important for responsive)
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navItems.forEach(item => {
      item.style.opacity = "";
      item.style.transform = "";
      item.style.transition = "";
    });
    navLinks.classList.remove("active");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
});
