// Smooth scrolling for nav links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fade-in animation on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// Contact form validation + spinner + success animation + back button
const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const backToFormBtn = document.getElementById('backToForm');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  let valid = true;
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  // Name validation
  if (document.getElementById('name').value.trim() === "") {
    nameError.textContent = "Please enter your name.";
    valid = false;
  }

  // Email validation
  const emailValue = document.getElementById('email').value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if (!emailPattern.test(emailValue)) {
    emailError.textContent = "Please enter a valid email address.";
    valid = false;
  }

  // Message validation
  if (document.getElementById('message').value.trim() === "") {
    messageError.textContent = "Please enter a message.";
    valid = false;
  }

  if (!valid) return;

  // Show spinner
  loadingSpinner.style.display = 'block';
  thankYouMessage.style.display = 'none';

  const formData = new FormData(contactForm);

  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    loadingSpinner.style.display = 'none';
    if (response.ok) {
      contactForm.reset();
      contactForm.style.display = 'none'; // hide form
      thankYouMessage.style.display = 'block';
      setTimeout(() => thankYouMessage.classList.add('visible'), 50);
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  }).catch(error => {
    loadingSpinner.style.display = 'none';
    alert("Error: " + error);
  });
});

// Back to form button
backToFormBtn.addEventListener('click', () => {
  thankYouMessage.classList.remove('visible');
  thankYouMessage.style.display = 'none';
  contactForm.style.display = 'block';
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = "☀️ Light Mode";
  } else {
    darkModeToggle.textContent = "🌙 Dark Mode";
  }
});
