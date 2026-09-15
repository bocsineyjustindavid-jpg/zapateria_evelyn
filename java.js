// Menú móvil
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Zapato interactivo: animación + confeti + badge
const shoeBtn = document.getElementById('shoeBtn');
const shoeSvg = document.getElementById('shoe-svg');
const badge = document.getElementById('badgePop');
const stage = document.querySelector('.shoe-stage');
const colors = ['#FF3E7F', '#FFD23F', '#00C2A8', '#6C3FC5'];

function launchConfetti(){
  for(let i=0; i<24; i++){
    const piece = document.createElement('div');
    piece.className = 'confetti-piece fire';
    piece.style.background = colors[i % colors.length];
    const angle = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 120;
    piece.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    piece.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    piece.style.setProperty('--rot', (Math.random()*360) + 'deg');
    piece.style.animationDelay = (Math.random()*0.1) + 's';
    stage.appendChild(piece);
    setTimeout(() => piece.remove(), 1000);
  }
}

shoeBtn.addEventListener('click', () => {
  shoeSvg.classList.remove('jumping');
  void shoeSvg.offsetWidth; // reinicia animación
  shoeSvg.classList.add('jumping');
  launchConfetti();
  badge.classList.remove('show');
  void badge.offsetWidth;
  badge.classList.add('show');
});

// Contador animado de estadísticas
const stats = document.querySelectorAll('.stat-num');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        current += step;
        if(current >= target){ el.textContent = target.toLocaleString(); }
        else { el.textContent = current.toLocaleString(); requestAnimationFrame(tick); }
      };
      tick();
      observer.unobserve(el);
    }
  });
}, {threshold:0.5});
stats.forEach(el => observer.observe(el));