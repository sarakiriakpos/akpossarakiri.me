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

// Simple form submission alert (you can later connect to Formspree or EmailJS)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Thank you! I'll get back to you soon.");
    form.reset();
  });
}