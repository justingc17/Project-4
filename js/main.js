/* ── MAIN.JS — Project 4 ──────────────────────────────────── */
(function(){
'use strict';

/* ── GSAP SETUP ──────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger, CustomEase);
try{ CustomEase.create('main','0.65,0.01,0.05,0.99'); }catch(e){}
gsap.defaults({ ease:'main', duration:.7 });

/* ── SPLASH ──────────────────────────────────────────────── */
const splash = document.getElementById('splash');
const fill   = document.getElementById('splashFill');
const pct    = document.getElementById('splashPct');
let p = 0;
const splashInt = setInterval(()=>{
  p = Math.min(p + Math.random()*4 + 1, 100);
  fill.style.width = p+'%';
  pct.textContent  = Math.floor(p)+'%';
  if(p >= 100){
    clearInterval(splashInt);
    setTimeout(()=>{
      splash.classList.add('done');
      splash.addEventListener('animationend',()=>{ splash.style.display='none'; }, {once:true});
      enterHero();
    }, 400);
  }
},40);

/* ── TYPEWRITER ──────────────────────────────────────────── */
function typewriter(el, text, speed, onDone){
  let i = 0;
  el.textContent = '';
  const t = setInterval(()=>{
    el.textContent += text[i];
    i++;
    if(i >= text.length){ clearInterval(t); if(onDone) onDone(); }
  }, speed);
}

/* ── HERO ENTER ──────────────────────────────────────────── */
function enterHero(){
  const video   = document.getElementById('heroVideo');
  const content = document.getElementById('heroContent');
  const scroll  = document.querySelector('.hero__scroll');
  const twEl    = document.getElementById('heroTypewriter');
  if(!video) return;
  gsap.set(content, { opacity:0, y:30 });
  gsap.set(scroll,  { opacity:0 });
  const tl = gsap.timeline();
  tl.to(video,   { filter:'blur(0px)', scale:1, duration:2.8, ease:'power2.inOut' }, 0)
    .to(content,  { opacity:1, y:0, duration:1 }, 1.2)
    .add(()=>{ if(twEl) typewriter(twEl, 'PROJECT 4', 90); }, 1.6)
    .to(scroll,   { opacity:1, duration:.8 }, 2.6);

  /* Blur on scroll */
  ScrollTrigger.create({
    trigger:'#hero', start:'top top', end:'bottom top', scrub:true,
    onUpdate(self){
      const b = self.progress * 20;
      video.style.filter = `blur(${b}px)`;
      video.style.opacity = 1 - self.progress*.5;
    }
  });
}

/* ── HEADER SCROLL ───────────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled', window.scrollY > 60);
},{ passive:true });

/* ── KINETIC NAV ─────────────────────────────────────────── */
const menuBtn  = document.getElementById('menuBtn');
const overlay  = document.getElementById('navOverlay');
const navBg    = document.getElementById('navBg');
const panels   = overlay ? overlay.querySelectorAll('.nav-panel') : [];
const links    = overlay ? overlay.querySelectorAll('.nav-link__text') : [];
const shapes   = overlay ? overlay.querySelectorAll('.nav-shape') : [];
const allNavLinks = overlay ? overlay.querySelectorAll('.nav-links__item') : [];
let menuOpen = false;
let menuTL = null;

function openMenu(){
  menuOpen = true;
  menuBtn.setAttribute('aria-expanded','true');
  overlay.dataset.state = 'open';
  overlay.setAttribute('aria-hidden','false');
  gsap.set(overlay, { display:'block', pointerEvents:'auto' });
  if(menuTL) menuTL.kill();

  const btnSpans = menuBtn.querySelectorAll('.nav-btn__text span');
  const btnIcon  = menuBtn.querySelector('.nav-btn__icon svg');

  menuTL = gsap.timeline();
  menuTL
    .to(btnSpans,  { yPercent:-100, stagger:.12, duration:.45, ease:'power2.inOut' }, 0)
    .to(btnIcon,   { rotate:315, duration:.55, ease:'power2.inOut' }, 0)
    .to(navBg,     { autoAlpha:1, duration:.4 }, 0)
    .fromTo(panels,{ xPercent:105 }, { xPercent:0, stagger:.1, duration:.55, ease:'power3.inOut' }, 0)
    .to(links,     { yPercent:0, rotate:0, autoAlpha:1, stagger:.07, duration:.6, ease:'power3.out' }, 0.3);
}
function closeMenu(){
  menuOpen = false;
  menuBtn.setAttribute('aria-expanded','false');

  const btnSpans = menuBtn.querySelectorAll('.nav-btn__text span');
  const btnIcon  = menuBtn.querySelector('.nav-btn__icon svg');

  if(menuTL) menuTL.kill();
  menuTL = gsap.timeline({ onComplete:()=>{
    overlay.dataset.state = 'closed';
    overlay.setAttribute('aria-hidden','true');
    gsap.set(overlay, { display:'none', pointerEvents:'none' });
  }});
  menuTL
    .to(btnSpans,  { yPercent:0, stagger:.1, duration:.4, ease:'power2.inOut' }, 0)
    .to(btnIcon,   { rotate:0, duration:.45, ease:'power2.inOut' }, 0)
    .to(links,     { yPercent:120, rotate:8, autoAlpha:0, stagger:.04, duration:.4 }, 0)
    .to(panels,    { xPercent:105, stagger:.08, duration:.45 }, 0.15)
    .to(navBg,     { autoAlpha:0, duration:.3 }, 0.1);
}
/* Set nav links hidden state via JS (not CSS) so GSAP owns it */
if(links.length) gsap.set(links, { yPercent:130, rotate:8, autoAlpha:0 });

if(menuBtn){
  menuBtn.addEventListener('click', ()=> menuOpen ? closeMenu() : openMenu());
}
navBg && navBg.addEventListener('click', closeMenu);
document.addEventListener('keydown', e=>{ if(e.key==='Escape'&&menuOpen) closeMenu(); });

/* Shape hover per nav item */
allNavLinks.forEach(item=>{
  const idx  = item.dataset.shape;
  const shape = overlay ? overlay.querySelector(`.nav-shape--${idx}`) : null;
  if(!shape) return;
  const els = shape.querySelectorAll('.shape-el');
  item.addEventListener('mouseenter',()=>{
    shapes.forEach(s=>s.classList.remove('active'));
    shape.classList.add('active');
    gsap.fromTo(els,
      { scale:.5, opacity:0, rotation:-10 },
      { scale:1, opacity:1, rotation:0, duration:.55, stagger:.07, ease:'back.out(1.7)', overwrite:'auto' }
    );
  });
  item.addEventListener('mouseleave',()=>{
    gsap.to(els,{ scale:.8, opacity:0, duration:.3, ease:'power2.in', overwrite:'auto',
      onComplete:()=> shape.classList.remove('active') });
  });
});

/* Close nav on link click */
overlay && overlay.querySelectorAll('.nav-link').forEach(a=>{
  a.addEventListener('click', closeMenu);
});

/* ── SECTION REVEAL ──────────────────────────────────────── */
const revealSections = document.querySelectorAll('.reveal-section');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{ threshold:.1, rootMargin:'0px 0px -60px 0px' });
revealSections.forEach(s=> io.observe(s));

/* ── METHOD NODES ────────────────────────────────────────── */
const nodeIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const delay = parseFloat(e.target.dataset.delay)||0;
      setTimeout(()=> e.target.classList.add('visible'), delay*1000);
    }
  });
},{ threshold:.15 });
document.querySelectorAll('.reveal-node').forEach(n=> nodeIO.observe(n));

/* ── SERVICES DRUM + DECK ────────────────────────────────── */
const SVC_DATA = [
  { name:'Automatizaciones & IA', badge:'AUTOMATIZACIÓN', num:'01', color:'#5ce1e6',
    desc:'Flujos que trabajan las 24 horas. IA implementada para tu sector: CRMs, chatbots, reportes automáticos y pipelines inteligentes.',
    img:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80' },
  { name:'Meta Ads & Marketing', badge:'PERFORMANCE', num:'02', color:'#3195ff',
    desc:'Campañas con creativos de alta costura. Gestión completa de redes sociales, contenido y video que para el scroll.',
    img:'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&q=80' },
  { name:'Branding & Identidad', badge:'BRANDING', num:'03', color:'#ea333f',
    desc:'Logo, sistema tipográfico, paleta, voz de marca y package design que se vende solo en el anaquel.',
    img:'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80' },
  { name:'Desarrollo Web', badge:'DESARROLLO', num:'04', color:'#3195ff',
    desc:'Portales, e-commerce, reservas, pagos y recordatorios automáticos. Infraestructura que vende mientras duermes.',
    img:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80' },
];

const drumTrack = document.getElementById('drumTrack');
const deckFrontImg  = document.getElementById('deckFrontImg');
const deckLeftImg   = document.getElementById('deckLeftImg');
const deckRightImg  = document.getElementById('deckRightImg');
const deckBadgeText = document.getElementById('deckBadgeText');
const deckNum       = document.getElementById('deckNum');
const deckName      = document.getElementById('deckName');
const deckDesc      = document.getElementById('deckDesc');
const deckDot       = document.getElementById('deckDot');
const deckFront     = document.getElementById('deckFront');
const deckLeft      = document.getElementById('deckLeft');
const deckRight     = document.getElementById('deckRight');
const svcMore       = document.getElementById('svcMore');
let activeIdx = 0;
let isAnimating = false;

function getDeckImg(i){
  const d = SVC_DATA[i];
  return d ? `url('${d.img}')` : '';
}

function updateDeckContent(i){
  const d = SVC_DATA[i];
  if(!d) return;
  if(deckFrontImg)  deckFrontImg.style.backgroundImage  = `url('${d.img}')`;
  if(deckBadgeText) deckBadgeText.textContent = d.badge;
  if(deckNum)       deckNum.textContent       = d.num;
  if(deckName)      deckName.textContent      = d.name;
  if(deckDesc)      deckDesc.textContent      = d.desc;
  if(deckDot)       deckDot.style.background  = d.color;
  /* Side cards */
  const prev = SVC_DATA[(i - 1 + SVC_DATA.length) % SVC_DATA.length];
  const next = SVC_DATA[(i + 1) % SVC_DATA.length];
  if(deckLeftImg)  deckLeftImg.style.backgroundImage  = `url('${prev.img}')`;
  if(deckRightImg) deckRightImg.style.backgroundImage = `url('${next.img}')`;
}

function setService(i, direction){
  if(i < 0) i = SVC_DATA.length - 1;
  if(i >= SVC_DATA.length){
    /* "más servicios" slot */
    if(svcMore) svcMore.style.display = 'flex';
    const items = drumTrack ? drumTrack.querySelectorAll('.drum__item') : [];
    items.forEach((el,j)=> el.classList.toggle('active', j === SVC_DATA.length));
    if(drumTrack) drumTrack.style.transform = `translateY(calc(-${SVC_DATA.length} * 64px + 128px))`;
    activeIdx = SVC_DATA.length;
    return;
  }
  if(svcMore) svcMore.style.display = 'none';
  if(isAnimating) return;
  isAnimating = true;

  const items = drumTrack ? drumTrack.querySelectorAll('.drum__item') : [];
  items.forEach((el,j)=> el.classList.toggle('active', j===i));
  if(drumTrack) drumTrack.style.transform = `translateY(calc(-${i} * 64px + 128px))`;

  const dir = direction === 'up' ? 1 : -1;
  /* Front card exits to the side */
  gsap.to(deckFront, {
    x: dir * -120+'%', scale:.8, opacity:0, rotate: dir * -6,
    duration:.45, ease:'power2.in',
    onComplete(){
      updateDeckContent(i);
      /* Snap back to center, animate from opposite side */
      gsap.fromTo(deckFront,
        { x: dir * 80+'%', scale:.85, opacity:0, rotate: dir * 5 },
        { x:0, scale:1, opacity:1, rotate:0, duration:.5, ease:'power3.out',
          onComplete(){ isAnimating = false; }
        }
      );
    }
  });
  /* Back cards breathe */
  gsap.fromTo([deckLeft, deckRight],
    { scale:.85 },
    { scale:.88, duration:.3, yoyo:true, repeat:1, ease:'power1.inOut' }
  );
  activeIdx = i;
}

updateDeckContent(0);
if(drumTrack){
  drumTrack.querySelectorAll('.drum__item').forEach((el,i)=>{
    el.addEventListener('click',()=> setService(i, i > activeIdx ? 'up':'down'));
  });
}

/* Wheel on drum */
const drumWrap = document.getElementById('drum');
if(drumWrap){
  let wt = false;
  drumWrap.addEventListener('wheel',e=>{
    e.preventDefault();
    if(wt) return; wt=true; setTimeout(()=>wt=false,380);
    const dir = e.deltaY > 0 ? 'up' : 'down';
    setService(activeIdx + (e.deltaY > 0 ? 1 : -1), dir);
  },{ passive:false });
}

/* Touch swipe on deck */
let touchStartY = 0;
deckFront && deckFront.addEventListener('touchstart', e=>{ touchStartY = e.touches[0].clientY; },{ passive:true });
deckFront && deckFront.addEventListener('touchend', e=>{
  const dy = touchStartY - e.changedTouches[0].clientY;
  if(Math.abs(dy) > 40) setService(activeIdx + (dy > 0 ? 1 : -1), dy > 0 ? 'up':'down');
},{ passive:true });

/* ── PORTFOLIO HOVER ─────────────────────────────────────── */
const pfItems   = document.querySelectorAll('.pf-item');
const pfPreview = document.getElementById('pfPreview');
const pfImg     = document.getElementById('pfImg');
pfItems.forEach(item=>{
  item.addEventListener('mouseenter',()=>{
    const imgUrl = item.dataset.img;
    if(pfImg && imgUrl){ pfImg.style.backgroundImage = `url('${imgUrl}')`; }
    pfPreview && pfPreview.classList.add('visible');
  });
  item.addEventListener('mouseleave',()=>{
    pfPreview && pfPreview.classList.remove('visible');
  });
});

/* ── GLOBE SCROLL ─────────────────────────────────────────── */
window.addEventListener('load',()=>{
  if(typeof window.initGlobeScroll === 'function') window.initGlobeScroll();
});

/* ── WORLD CASE STUDIES ──────────────────────────────────── */
const CASES = [
  { country:'🇲🇽 México', name:'Bitso', tab:'Bitso · MX',
    desc:'La primera plataforma cripto de México escaló de startup regional a procesar más de $1B USD anuales. Sin una sola sucursal física. Solo tecnología, confianza y una experiencia digital que convirtió a millones de mexicanos en sus primeros usuarios crypto.',
    num:'$1B+', unit:'USD procesados / año' },
  { country:'🇬🇧 United Kingdom', name:'Gymshark', tab:'Gymshark · UK',
    desc:'De un garaje en Birmingham a una marca valuada en $1.4B USD. Gymshark construyó un empire de fitness apparel sin retail tradicional — puro e-commerce, comunidad digital y contenido que conecta con millones de atletas globales.',
    num:'$1.4B', unit:'USD valuación sin retail' },
  { country:'🇪🇸 España', name:'Nude Project', tab:'Nude Project · ES',
    desc:'Dos jóvenes de 19 años lanzaron desde Instagram una marca de streetwear que factura millones sin tienda física. Drops limitados, comunidad auténtica y una identidad visual poderosa — el poder del ecosistema digital ejecutado a la perfección.',
    num:'€10M+', unit:'facturación anual sin tienda' },
];

const caseTabs    = document.querySelectorAll('.world__tab');
const caseCountry = document.getElementById('caseCountry');
const caseName    = document.getElementById('caseName');
const caseDesc    = document.getElementById('caseDesc');
const caseNum     = document.getElementById('caseNum');
const caseUnit    = document.getElementById('caseUnit');

function setCase(i){
  caseTabs.forEach((t,j)=> t.classList.toggle('world__tab--active', j===i));
  const c = CASES[i];
  if(caseCountry) caseCountry.textContent = c.country;
  if(caseName)    caseName.textContent    = c.name;
  if(caseDesc)    caseDesc.textContent    = c.desc;
  if(caseNum)     caseNum.textContent     = c.num;
  if(caseUnit)    caseUnit.textContent    = c.unit;
  /* Activate corresponding polaroid */
  document.querySelectorAll('.polaroid').forEach((p,j)=>{
    p.style.zIndex = j===i ? 5 : 1;
    p.style.opacity = j===i ? 1 : .6;
  });
}
caseTabs.forEach((btn,i)=> btn.addEventListener('click',()=> setCase(i)));
setCase(0);

/* ── CONTACT FORM ────────────────────────────────────────── */
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const btn = form.querySelector('.btn-send');
    btn.textContent = '¡Enviado! Te contactamos pronto.';
    btn.style.background = '#113c41';
    setTimeout(()=>{
      btn.textContent = 'Enviar solicitud →';
      btn.style.background = '';
      form.reset();
    }, 3500);
  });
}

})();
