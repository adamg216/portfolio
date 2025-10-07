// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('navList');
if (toggle) {
toggle.addEventListener('click', () => {
const open = navList.classList.toggle('show');
toggle.setAttribute('aria-expanded', String(open));
});
}

// Scroll animations (IntersectionObserver)
const animateEls = document.querySelectorAll('[data-animate]');
const io = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (e.isIntersecting) {
e.target.classList.add('in');
// Progress bars re-trigger when visible
const bars = e.target.querySelectorAll('.progress span');
bars.forEach(bar => {
const v = bar.style.getPropertyValue('--val') || '0%';
bar.style.width = v;
});
io.unobserve(e.target);
}
});
}, { threshold: 0.15 });

animateEls.forEach(el => io.observe(el));

// "Voir plus" projects
const voirPlusBtn = document.getElementById('voirPlus');
if (voirPlusBtn) {
voirPlusBtn.addEventListener('click', () => {
document.querySelectorAll('.project-card.hidden').forEach((el, i) => {
el.classList.remove('hidden');
// légère animation à l'ouverture
setTimeout(() => el.querySelector('[data-animate]')?.classList?.add('in'), 10 + i*40);
});
voirPlusBtn.remove();
});
}

// Contact form (validation + mailto fallback)
const form = document.getElementById('contactForm');
if (form) {
form.addEventListener('submit', (e) => {
e.preventDefault();
const name = form.name.value.trim();
const email = form.email.value.trim();
const message = form.message.value.trim();
const errs = {
name: name.length < 2 ? "Nom trop court." : "",
email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "E-mail invalide.",
message: message.length < 10 ? "Message trop court." : ""
};
form.querySelector('#name + .error').textContent = errs.name;
form.querySelector('#email + .error').textContent = errs.email;
form.querySelector('#message + .error').textContent = errs.message;

if (!errs.name && !errs.email && !errs.message) {
// Succès visuel + ouverture mailto (simple et sans backend)
form.querySelector('.form-feedback').textContent = "Merci ! Votre message est prêt à être envoyé.";
const subject = encodeURIComponent(`Contact Portfolio — ${name}`);
const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`);
window.location.href = `mailto:contact@example.com?subject=${subject}&body=${body}`;
form.reset();
setTimeout(() => form.querySelector('.form-feedback').textContent = "", 4000);
} else {
form.querySelector('.form-feedback').textContent = "Veuillez corriger les champs en rouge.";
setTimeout(() => form.querySelector('.form-feedback').textContent = "", 4000);
}
});
}

// Back-to-top smooth (for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
const id = this.getAttribute('href');
if (id.length > 1) {
const target = document.querySelector(id);
if (target) {
e.preventDefault();
window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
}
}
});
});