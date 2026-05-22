const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prev-review');
const nextBtn = document.getElementById('next-review');
let currentIndex = 0;

function updateTestimonials(index) {
  testimonials.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
}

function showNext() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  updateTestimonials(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonials(currentIndex);
}

if (testimonials.length && prevBtn && nextBtn) {
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);
  setInterval(showNext, 8000);
}
