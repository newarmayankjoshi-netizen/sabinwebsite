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

function createMailtoLink(subject, body) {
  const email = 'Sabin@blueberryre.com.au';
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function submitFormAsEmail(form, subject, fields) {
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = fields.map(({ label, selector }) => {
      const element = form.querySelector(selector);
      const value = element ? element.value.trim() : '';
      return `${label}: ${value}`;
    });
    const body = values.join('\n');
    window.location.href = createMailtoLink(subject, body);
  });
}

submitFormAsEmail(document.getElementById('contact-form'), 'Website contact enquiry', [
  { label: 'Name', selector: '#contact-name' },
  { label: 'Email', selector: '#contact-email' },
  { label: 'Phone', selector: '#contact-phone' },
  { label: 'Message', selector: '#contact-message' },
]);

submitFormAsEmail(document.getElementById('buyer-enquiry-form'), 'Website buyer enquiry', [
  { label: 'Name', selector: '#buyer-name' },
  { label: 'Email', selector: '#buyer-email' },
  { label: 'Phone', selector: '#buyer-phone' },
  { label: 'Property type', selector: '#buyer-property-type' },
  { label: 'Budget range', selector: '#buyer-budget' },
  { label: 'Message', selector: '#buyer-message' },
]);

submitFormAsEmail(document.getElementById('appraisal-form'), 'Website appraisal request', [
  { label: 'Name', selector: '#appraisal-name' },
  { label: 'Email', selector: '#appraisal-email' },
  { label: 'Phone', selector: '#appraisal-phone' },
  { label: 'Property address', selector: '#appraisal-address' },
  { label: 'Property type', selector: '#appraisal-type' },
  { label: 'Notes', selector: '#appraisal-notes' },
]);

const reviewStorageKey = 'sabin_testimonial_reviews';

function getStoredReviews() {
  try {
    return JSON.parse(localStorage.getItem(reviewStorageKey) || '[]');
  } catch (error) {
    return [];
  }
}

function saveStoredReviews(reviews) {
  localStorage.setItem(reviewStorageKey, JSON.stringify(reviews));
}

function createReviewCard(review) {
  const card = document.createElement('article');
  card.className = 'testimonial-card review-card';

  const message = document.createElement('p');
  message.textContent = review.message;
  card.appendChild(message);

  const meta = document.createElement('div');
  meta.className = 'testimonial-meta';

  const name = document.createElement('strong');
  name.textContent = review.name;
  meta.appendChild(name);

  const rating = document.createElement('span');
  rating.className = 'rating';
  rating.textContent = `${review.rating} ★`;
  meta.appendChild(rating);

  card.appendChild(meta);
  return card;
}

function renderStoredReviews() {
  const container = document.getElementById('user-reviews');
  if (!container) return;
  const reviews = getStoredReviews();
  container.innerHTML = '';
  if (!reviews.length) {
    const empty = document.createElement('p');
    empty.className = 'review-empty';
    empty.textContent = 'Be the first to leave a review for Sabin.';
    container.appendChild(empty);
    return;
  }
  reviews.slice().reverse().forEach((review) => {
    container.appendChild(createReviewCard(review));
  });
}

function setupReviewForm() {
  const form = document.getElementById('review-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('review-name').value.trim();
    const rating = document.getElementById('review-rating').value;
    const message = document.getElementById('review-message').value.trim();

    if (!name || !message) {
      alert('Please enter your name and review message.');
      return;
    }

    const reviews = getStoredReviews();
    reviews.push({ name, rating, message, submittedAt: new Date().toISOString() });
    saveStoredReviews(reviews);
    renderStoredReviews();
    form.reset();
  });
}

setupReviewForm();
renderStoredReviews();

const agentPhoto = document.querySelector('.agent-photo');
if (agentPhoto) {
  const handleAgentError = () => {
    agentPhoto.removeEventListener('error', handleAgentError);
    agentPhoto.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80';
  };
  agentPhoto.addEventListener('error', handleAgentError);
}
