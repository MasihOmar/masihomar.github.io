/* ============================================
   MASIHULLAH OMAR — PROFESSIONAL CV
   Interactive JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. TYPING EFFECT
  // ==========================================
  const phrases = [
    "full-stack platforms.",
    "intelligent AI systems.",
    "cross-platform mobile apps.",
    "data-driven pipelines.",
    "scalable microservices.",
    "NLP & ML models.",
  ];

  const typingEl = document.getElementById("typingText");
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 60;

  function typeWriter() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 30;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 70;
    }

    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // pause before next
    }

    setTimeout(typeWriter, typeSpeed);
  }

  if (typingEl) {
    setTimeout(typeWriter, 800);
  }

  // ==========================================
  // 2. SCROLL REVEAL ANIMATIONS
  // ==========================================
  const fadeElements = document.querySelectorAll(".fade-up");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation based on sibling index
          const siblings =
            entry.target.parentElement?.querySelectorAll(".fade-up") || [];
          let delay = 0;
          siblings.forEach((sibling, i) => {
            if (sibling === entry.target) {
              delay = i * 80;
            }
          });

          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  fadeElements.forEach((el) => revealObserver.observe(el));

  // ==========================================
  // 3. NAVBAR SCROLL BEHAVIOR
  // ==========================================
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll(".section, .hero");
  const navLinks = document.querySelectorAll(".nav-link");

  function handleScroll() {
    // Navbar background
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active section highlighting
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // initial call

  // ==========================================
  // 4. MOBILE NAV TOGGLE
  // ==========================================
  const navToggle = document.getElementById("navToggle");
  const navLinksContainer = document.querySelector(".nav-links");

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navLinksContainer.classList.toggle("active");
      document.body.style.overflow = navLinksContainer.classList.contains(
        "active",
      )
        ? "hidden"
        : "";
    });

    // Close menu on link click
    navLinksContainer.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navLinksContainer.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Close menu on outside click
    document.addEventListener("click", (e) => {
      if (
        navLinksContainer.classList.contains("active") &&
        !navLinksContainer.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navToggle.classList.remove("active");
        navLinksContainer.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // ==========================================
  // 5. STAT COUNTER ANIMATION
  // ==========================================
  const statNumbers = document.querySelectorAll(".stat-number");
  let statAnimated = false;

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statAnimated) {
          statAnimated = true;
          animateStats();
          statObserver.disconnect();
        }
      });
    },
    { threshold: 0.5 },
  );

  const statsContainer = document.querySelector(".hero-stats");
  if (statsContainer) {
    statObserver.observe(statsContainer);
  }

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"), 10);
      const duration = 1500;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        stat.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // ==========================================
  // 6. SMOOTH SCROLL FOR NAV LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ==========================================
  // 7. PARALLAX GLOW EFFECT ON MOUSE MOVE
  // ==========================================
  const hero = document.querySelector(".hero");
  const glows = document.querySelectorAll(".hero-glow");

  if (hero && glows.length) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      glows.forEach((glow, i) => {
        const speed = (i + 1) * 15;
        glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

  // ==========================================
  // 8. PROJECT CARD GLOW FOLLOW MOUSE
  // ==========================================
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const glow = card.querySelector(".project-card-glow");
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(102, 126, 234, 0.08), transparent 60%)`;
      }
    });
  });

  // ==========================================
  // 9. SKILL TAG HOVER RIPPLE
  // ==========================================
  document.querySelectorAll(".skill-tag").forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
    });
  });
});
