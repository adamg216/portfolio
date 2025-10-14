/* --- Menu mobile --- */
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
toggle?.addEventListener('click', () => {
menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
});

/* --- Projets “mêmes intitulés, reformulés Ghazel” ---
NB: liens 'demo' et 'code' désactivés (#). Remplace par tes URLs.
*/
const projects = [
{
title: "PHOTO_ATB – Gestion de photos avioniques — Ghazel Edition",
desc: "Ce projet, réalisé en partenariat avec Thales, avait pour but de développer une solution complète d’archivage photographique dédiée aux bancs de tests avioniques. L’objectif principal était d’assurer une traçabilité visuelle rigoureuse de la configuration matérielle avant chaque campagne de test. Pour cela, une application web a été conçue et hébergée localement sur un Raspberry Pi, permettant la capture d’images de manière manuelle ou automatisée.",
tags: ["base de données", "Algorithmique", "Sécurité applicative", "Architecture système"],
rapport: "./rapport15.docx"
},
{
title: "Cable coaxial — Calculateur d’atténuation",
desc: "Ce projet visait à analyser les propriétés de transmission d’un câble coaxial. Il s’est déroulé en deux étapes : une phase expérimentale en laboratoire (mesure de l’atténuation et du retard de propagation à l’aide d’un oscilloscope et d’un générateur de fonctions), puis une phase de modélisation sous Octave, basée sur la formule théorique de l’atténuation. L’objectif était de confronter les résultats expérimentaux aux simulations pour valider le modèle et interpréter les écarts.",
tags: ["TraitementDeDonnées", "AnalyseDeSignal", "MesuresExpérimentales"],
rapport: "./Ghazel_Adam_saé13-Rapport.pdf"
},
{
title: "Conception d’un réseau d’entreprise sécurisé",
desc: "Ce projet visait à concevoir l’infrastructure réseau simulée d’une PME avec Cisco Packet Tracer, en mettant l’accent sur la sécurité et la segmentation. Les départements ont été répartis en VLANs pour limiter les risques et améliorer le trafic. Les services DHCP et DNS ont été déployés sur des serveurs dédiés. Une DMZ a été mise en place pour sécuriser le serveur web, protégée par un pare-feu Cisco ASA avec des ACLs filtrant le trafic.",
tags: ["CiscoPacketTracer", "InfrastructureRéseau", "VLAN", "DMZ", "DHCP"],
rapport: "./SAE21_AYED_GHAZEL (2).pkt"
},
{
title: "Portfolio personnel en ligne",
desc: "Ce portfolio est un projet web conçu comme vitrine professionnelle, basé uniquement sur HTML, CSS et JavaScript natif. Il intègre un design responsive adapté à tous les écrans et une navigation fluide sans rechargement. L’interactivité (modales, transitions) est gérée en JavaScript. Le site est versionné avec Git et déployé sur GitHub Pages pour un hébergement simple et évolutif.",
tags: ["FrontEndDevelopment", "GitHubPages", "ProjetPersonnel"],
},
{
title: "Création d'un site web ",
desc: "Ce projet consistait à développer un site web statique en tant que vitrine professionnelle. Réalisé uniquement avec les technologies fondamentales du web (HTML, CSS, JavaScript), il met l’accent sur un design responsive, une navigation fluide sans rechargement de page, et des fenêtres modales pour présenter les projets. Le site est versionné avec Git et déployé via GitHub Pages, facilitant la mise à jour et l’hébergement.",
tags: ["Front", "WebDesign", "IntégrationWeb"],
demo: "#",
code: "#"
},
{
title: "Sensibilisation à l’e-réputation",
desc: "Dans cette SAÉ centrée sur la communication, nous avons animé une session de sensibilisation à l’e-réputation pour des collégiens. À travers une présentation pédagogique et des scénarios concrets (photos partagées, cookies, données personnelles), nous avons illustré les enjeux de l’identité numérique. Un quiz interactif via Kahoot a permis d’impliquer les élèves et de valider les messages clés de façon ludique",
tags: ["IdentitéNumérique", "Sensibilisation", "ÉducationNumérique", "TravailEnÉquipe"],
rapport: "./projet saé.pdf"
},
];

/* --- Render cards --- */
const grid = document.getElementById('projectsGrid');
if (grid){
grid.innerHTML = projects.map(p => `
<article class="card">
<div class="thumb">
<span class="badge">${p.tags[0]}</span>
</div>
<div class="card-body">
<h3>${p.title}</h3>
<p>${p.desc}</p>
<div class="tags">
${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
</div>
<div class="card-actions">
<a href="${p.demo}" ${p.demo==="#"?'aria-disabled="true"':''}>Démo</a>
<a href="${p.code}" ${p.code==="#"?'aria-disabled="true"':''}>Code</a>
${p.rapport ? `<a href="${p.rapport}" download="rapport15.odt">rapport</a>` : ''}
</div>
</div>
</article>
`).join('');
}

/* --- Formulaire (mock) --- */
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form?.addEventListener('submit', (e)=>{
e.preventDefault();
statusEl.textContent = "Merci ! Votre message a bien été pris en compte.";
form.reset();
});
