// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  initTheme();
  initNavbarScroll();
  initAnnouncementBar();
  initMobileMenu();
  initAudioPlayer();
  initSearchModal();
  initCounterAnimation();
  initCustomCursor();
  initNewsletterForm();
});

// 1. Theme Management (Dark / Light)
function initTheme() {
  const storedTheme = localStorage.getItem("fintops-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (storedTheme === "light" || (!storedTheme && !prefersDark)) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }

  const toggleBtns = [
    document.getElementById("theme-toggle"),
    document.getElementById("theme-toggle-mobile")
  ];

  toggleBtns.forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("fintops-theme", isDark ? "dark" : "light");
    });
  });
}

// 2. Navbar Scroll Dynamic Styling
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });
}

// 3. Dismissible Announcement Bar
function initAnnouncementBar() {
  const closeBtn = document.getElementById("close-announcement");
  const bar = document.getElementById("announcement-bar");
  if (closeBtn && bar) {
    closeBtn.addEventListener("click", () => {
      bar.style.display = "none";
    });
  }
}

// 4. Mobile Menu Drawer
function initMobileMenu() {
  const openBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("close-mobile-menu");
  const menu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  const toggleMenu = (open) => {
    if (open) {
      menu.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    } else {
      menu.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };

  if (openBtn) openBtn.addEventListener("click", () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener("click", () => toggleMenu(false));

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });
}

// 5. Interactive Audio Player Simulation
function initAudioPlayer() {
  const playBtn = document.getElementById("play-btn");
  const playText = document.getElementById("play-text");
  const playIcon = document.getElementById("play-icon");
  const progressBar = document.getElementById("progress-bar");
  const progressFill = document.getElementById("progress-fill");
  const playerTime = document.getElementById("player-time");

  let isPlaying = false;
  let currentProgress = 0;
  let interval = null;

  if (!playBtn) return;

  playBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      playText.textContent = "Pause Episode";
      playIcon.setAttribute("data-lucide", "pause");
      lucide.createIcons();

      interval = setInterval(() => {
        if (currentProgress < 100) {
          currentProgress += 0.5;
          progressFill.style.width = `${currentProgress}%`;
          
          // Calculate mock time elapsed
          const totalSeconds = Math.floor((42 * 60 + 18) * (currentProgress / 100));
          const mins = Math.floor(totalSeconds / 60);
          const secs = totalSeconds % 60;
          playerTime.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
        } else {
          clearInterval(interval);
          isPlaying = false;
          playText.textContent = "Play Episode";
          playIcon.setAttribute("data-lucide", "play");
          lucide.createIcons();
        }
      }, 300);
    } else {
      playText.textContent = "Play Episode";
      playIcon.setAttribute("data-lucide", "play");
      lucide.createIcons();
      clearInterval(interval);
    }
  });

  if (progressBar) {
    progressBar.addEventListener("click", (e) => {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      currentProgress = (clickX / width) * 100;
      progressFill.style.width = `${currentProgress}%`;
    });
  }
}

// 6. Search Overlay UI & Ctrl+K Shortcut
function initSearchModal() {
  const modal = document.getElementById("search-modal");
  const searchBtn = document.getElementById("search-btn");
  const closeBtn = document.getElementById("close-search");
  const searchInput = document.getElementById("search-input");
  const mobileTrigger = document.getElementById("mobile-search-trigger");

  const openSearch = () => {
    modal.classList.remove("hidden");
    if (searchInput) searchInput.focus();
  };

  const closeSearch = () => {
    modal.classList.add("hidden");
  };

  if (searchBtn) searchBtn.addEventListener("click", openSearch);
  if (mobileTrigger) mobileTrigger.addEventListener("click", openSearch);
  if (closeBtn) closeBtn.addEventListener("click", closeSearch);

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeSearch();
    }
  });
}

// 7. Counter Animation for Community Section
function initCounterAnimation() {
  const statsSection = document.getElementById("stats-section");
  const counters = document.querySelectorAll(".counter");
  let animated = false;

  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const speed = target / 50;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            counter.innerText = Math.ceil(count).toLocaleString() + "+";
            setTimeout(updateCount, 25);
          } else {
            counter.innerText = target.toLocaleString() + "+";
          }
        };
        updateCount();
      });
    }
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

// 8. Desktop Custom Magnetic Cursor
function initCustomCursor() {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor || window.innerWidth < 768) return;

  document.addEventListener("mousemove", (e) => {
    cursor.style.opacity = "1";
    cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });
}

// 9. Newsletter Form Feedback
function initNewsletterForm() {
  const form = document.getElementById("newsletter-form");
  const msg = document.getElementById("newsletter-message");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
    if (msg) msg.classList.remove("hidden");
  });
}