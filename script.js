/* --- Menu mobile --- */
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
toggle?.addEventListener('click', () => {
menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
});

/* --- Smooth scroll --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
const href = this.getAttribute('href');
if (href !== '#' && !this.hasAttribute('aria-disabled')) {
e.preventDefault();
const target = document.querySelector(href);
if (target) {
target.scrollIntoView({ behavior: 'smooth', block: 'start' });
// Fermer le menu mobile après clic
if (window.innerWidth <= 980) {
menu.style.display = 'none';
}
}
}
});
});

/* --- 12 Projets classés par ordre logique : Stage > Réseaux > Sécurité > Dev > IoT > Communication --- */
const projects = [
{
title: "PHOTO_ATB – Solution d'archivage photographique avionique",
desc: "Application web de gestion de photos pour bancs de tests avioniques développée en stage chez Thales. Architecture complète avec capture automatisée et traçabilité.",
tags: ["Stage", "Full-Stack", "Raspberry Pi", "Base de données"],
rapport: "./rapport15.docx",
category: "stage",
order: 1
},
{
title: "Infrastructure réseau sécurisée multi-sites",
desc: "Conception d'un réseau d'entreprise multi-sites avec segmentation VLAN, DMZ, routage OSPF et haute disponibilité HSRP. Pare-feu ASA avec ACLs granulaires.",
tags: ["Cisco ASA", "OSPF", "HSRP", "DMZ"],
rapport: "./SAE21_AYED_GHAZEL (2).pkt",
category: "network",
order: 2
},
{
title: "Architecture sécurisée avec zone démilitarisée",
desc: "Déploiement d'une DMZ complète pour héberger services web publics, avec double firewall, NAT sécurisé et règles de filtrage strictes selon le principe du moindre privilège.",
tags: ["Sécurité", "DMZ", "Firewall", "ACL"],
category: "security",
order: 3
},
{
title: "Routage dynamique OSPF multi-area",
desc: "Configuration d'un réseau OSPF complexe avec 4 areas, redistribution de routes, optimisation de la bande passante et implémentation de Virtual Links pour connecter areas non-contiguës.",
tags: ["OSPF", "Routage", "Multi-Area", "Optimisation"],
category: "network",
order: 4
},
{
title: "Haute disponibilité avec HSRP et EtherChannel",
desc: "Mise en place de redondance réseau avec HSRP pour passerelles actives/standby, agrégation de liens via LACP, et optimisation Spanning-Tree pour éliminer boucles.",
tags: ["HSRP", "EtherChannel", "LACP", "Redondance"],
category: "network",
order: 5
},
{
title: "Système d'authentification JWT sécurisé",
desc: "API REST avec authentification JWT, hashage bcrypt, refresh tokens, middleware de validation et protection contre les attaques courantes (XSS, CSRF, injection).",
tags: ["Node.js", "JWT", "Sécurité", "API REST"],
code: "#",
category: "development",
order: 6
},
{
title: "Plateforme web full-stack avec MongoDB",
desc: "Application web complète avec backend Express, base de données MongoDB, interface responsive et système CRUD avancé avec validation côté serveur et client.",
tags: ["MERN Stack", "MongoDB", "Express", "Full-Stack"],
demo: "#",
code: "#",
category: "development",
order: 7
},
{
title: "Automatisation réseau avec scripts Python",
desc: "Suite de scripts Python pour automatiser configuration de switchs/routeurs, backup de configs, monitoring SNMP et génération de rapports d'audit réseau.",
tags: ["Python", "Automation", "SNMP", "Scripting"],
code: "#",
category: "network",
order: 8
},
{
title: "Analyse et modélisation de câble coaxial",
desc: "Étude expérimentale en laboratoire avec oscilloscope et générateur de fonctions. Mesure d'atténuation, calcul de retard de propagation et modélisation sous Octave.",
tags: ["Télécommunications", "Traitement Signal", "Octave"],
rapport: "./Ghazel_Adam_saé13-Rapport.pdf",
category: "iot",
order: 9
},
{
title: "Réseau IoT LoRaWAN avec gateway",
desc: "Déploiement d'un réseau LoRaWAN pour capteurs IoT longue portée, configuration gateway, protocole MQTT pour remontée de données et tableau de bord de visualisation.",
tags: ["LoRaWAN", "IoT", "MQTT", "Gateway"],
category: "iot",
order: 10
},
{
title: "Portfolio professionnel responsive",
desc: "Site web vitrine développé en HTML/CSS/JS vanilla avec animations fluides, design moderne et responsive. Versionné Git et hébergé sur GitHub Pages.",
tags: ["Frontend", "Responsive", "GitHub Pages"],
demo: "#",
code: "#",
category: "development",
order: 11
},
{
title: "Sensibilisation e-réputation et identité numérique",
desc: "Animation d'atelier pédagogique pour collégiens sur les risques de l'identité numérique, avec quiz interactif Kahoot et scénarios concrets (cookies, RGPD, traces en ligne).",
tags: ["Communication", "Pédagogie", "E-réputation"],
rapport: "./projet saé.pdf",
category: "communication",
order: 12
}
];

/* --- Render cards avec ordre logique --- */
const grid = document.getElementById('projectsGrid');
if (grid){
// Trier par ordre défini
const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

grid.innerHTML = sortedProjects.map(p => `
<article class="card" data-category="${p.category}">
<div class="thumb">
<span class="badge">${p.tags[0]}</span>
</div>
<div class="card-body">
<h3>${p.title}</h3>
<p>${p.desc}</p>
<div class="tags">
${p.tags.slice(1).map(t=>`<span class="tag">${t}</span>`).join('')}
</div>
<div class="card-actions">
${p.demo ? `<a href="${p.demo}" ${p.demo==="#"?'aria-disabled="true"':''} class="card-link">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
<polyline points="15 3 21 3 21 9"/>
<line x1="10" y1="14" x2="21" y2="3"/>
</svg>
Démo</a>` : ''}
${p.code ? `<a href="${p.code}" ${p.code==="#"?'aria-disabled="true"':''} class="card-link">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<polyline points="16 18 22 12 16 6"/>
<polyline points="8 6 2 12 8 18"/>
</svg>
Code</a>` : ''}
${p.rapport ? `<a href="${p.rapport}" download class="card-link">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
<polyline points="14 2 14 8 20 8"/>
</svg>
Rapport</a>` : ''}
</div>
</div>
</article>
`).join('');
}

/* --- Formulaire de contact --- */
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form?.addEventListener('submit', (e)=>{
e.preventDefault();
statusEl.textContent = "✓ Message envoyé ! Je vous répondrai dans les plus brefs délais.";
statusEl.style.color = "#6ee7b7";
form.reset();
setTimeout(() => {
statusEl.textContent = "";
}, 5000);
});

/* --- Animation au scroll (fade-in) --- */
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = '1';
entry.target.style.transform = 'translateY(0)';
}
});
}, observerOptions);

// Observer les cartes de projets
document.addEventListener('DOMContentLoaded', () => {
setTimeout(() => {
document.querySelectorAll('.card').forEach((card, index) => {
card.style.opacity = '0';
card.style.transform = 'translateY(20px)';
card.style.transition = `all 0.6s ease ${index * 0.1}s`;
observer.observe(card);
});
}, 100);
});
