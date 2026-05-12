// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Filter projects by category
const filterButtons = document.querySelectorAll(".filter-chip");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((chip) => chip.classList.remove("is-active"));
    button.classList.add("is-active");

    projectCards.forEach((card) => {
      const matches =
        selectedFilter === "all" || card.dataset.category === selectedFilter;

      card.classList.toggle("is-hidden", !matches);
    });
  });
});

// Animated counters for hero stats
function animateCounters() {
  const counters = document.querySelectorAll('.hero-stats dt');
  const speed = 200;

  counters.forEach(counter => {
    const target = parseInt(counter.innerText);
    let count = 0;
    const increment = target / speed;

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Intersection Observer for scroll animations
function createScrollObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all sections and project cards
  document.querySelectorAll('.section, .project-card, .skills-grid article, .timeline div').forEach(el => {
    observer.observe(el);
  });
}

// Mouse follower effect
function createMouseFollower() {
  const follower = document.createElement('div');
  follower.className = 'mouse-follower';
  document.body.appendChild(follower);

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';

    requestAnimationFrame(updateFollower);
  }

  updateFollower();
}

// Enhanced hover effects for project cards
function enhanceProjectCards() {
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = '0 25px 60px rgba(83, 133, 163, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 18px 50px rgba(83, 133, 163, 0.12)';
    });
  });
}

// Scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + '%';
  });
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
  // Start counter animation after a delay
  setTimeout(animateCounters, 1000);

  // Start typing animation for hero title
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => typeWriter(heroTitle, originalText, 80), 500);
  }

  // Initialize scroll animations
  createScrollObserver();

  // Create mouse follower
  createMouseFollower();

  // Enhance project card interactions
  enhanceProjectCards();

  // Add scroll progress indicator
  createScrollProgress();

  // Initialize theme toggle
  initializeThemeToggle();

  // Initialize back to top button
  initializeBackToTop();
});

// Theme toggle functionality
function initializeThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });
}

// Back to top functionality
function initializeBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}