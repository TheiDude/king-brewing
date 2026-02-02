// King Brewing Company - Main JavaScript
// Modern ES6+ - No jQuery needed!

// Active Navigation State
document.addEventListener('DOMContentLoaded', () => {
  // Get current page path
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');

  // Set active state on current page
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');

    // Match current page or index
    if (linkPath === currentPath ||
        (currentPath === '/' && linkPath === '/index.html') ||
        (currentPath.endsWith('index.html') && linkPath === '/index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Console greeting (optional - can remove)
console.log('%cKing Brewing Company', 'font-size: 20px; font-weight: bold; color: #121d8e');
console.log('%cModern website built with Vite', 'color: #666');
