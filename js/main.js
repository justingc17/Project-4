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

/* ── SPLIT TITLE INTO CHARS ──────────────────────────────── */
function splitIntoChars(el){
  const text = el.textContent.trim();
  el.textContent = '';
  el.setAttribute('aria-label', text);
  text.split('').forEach(ch => {
    if(ch === ' '){ el.appendChild(document.createTextNode('\u00A0')); return; }
    const wrap  = document.createElement('span');
    wrap.className = 'char-wrap';
    const inner = document.createElement('span');
    inner.className = 'char-inner';
    inner.textContent = ch;
    wrap.appendChild(inner);
    el.appendChild(wrap);
  });
  return el.querySelectorAll('.char-inner');
}

/* ── HERO ENTER ──────────────────────────────────────────── */
function enterHero(){
  const video   = document.getElementById('heroVideo');
  const content = document.getElementById('heroContent');
  const scroll  = document.querySelector('.hero__scroll');
  const wordEl  = document.getElementById('heroWord');
  const numEl   = document.getElementById('heroNum');
  const accent  = document.getElementById('heroAccent');
  const eyebrow = document.querySelector('.hero__eyebrow');
  const sub     = document.querySelector('.hero__sub');
  const ctaRow  = document.querySelector('.hero__cta-row');
  if(!video) return;

  /* Split "PROJECT" into chars for cascade; "4" animates as a whole */
  const wordChars = wordEl ? splitIntoChars(wordEl) : [];

  /* Initial states */
  gsap.set(wordChars, { yPercent:115, rotation:5 });
  gsap.set(numEl,     { scale:.3, opacity:0, filter:'blur(30px)', y:24 });
  gsap.set(eyebrow,   { opacity:0, y:10 });
  gsap.set(accent,    { scaleX:0, transformOrigin:'left center' });
  gsap.set(sub,       { opacity:0, y:16 });
  gsap.set(ctaRow,    { opacity:0, y:16 });
  gsap.set(scroll,    { opacity:0 });

  const tl = gsap.timeline({ defaults:{ ease:'power3.out' } });

  tl
    /* 1 — Video focus in from blurry */
    .to(video, { filter:'blur(0px)', scale:1, duration:2.8, ease:'power2.inOut' }, 0)

    /* 2 — Eyebrow */
    .to(eyebrow, { opacity:1, y:0, duration:.65 }, .95)

    /* 3 — "PROJECT": chars cascade up with slight rotation */
    .to(wordChars, {
      yPercent:0, rotation:0, duration:.8,
      stagger:{ amount:.42, ease:'power2.out' }
    }, 1.15)

    /* 4 — "4": pulse in blurry → snap clear (bomb-in) */
    .to(numEl, { scale:1.1, opacity:.7, filter:'blur(8px)', y:0, duration:.38, ease:'power2.in' }, 1.3)
    .to(numEl, { scale:1, opacity:1, filter:'blur(0px)', duration:.55, ease:'back.out(1.6)' }, 1.68)

    /* 5 — Red accent line draws */
    .to(accent, { scaleX:1, duration:.65, ease:'power3.inOut' }, 1.78)

    /* 6 — Sub + CTA */
    .to(sub,    { opacity:1, y:0, duration:.6 }, 2.0)
    .to(ctaRow, { opacity:1, y:0, duration:.6 }, 2.18)

    /* 7 — Scroll indicator */
    .to(scroll, { opacity:1, duration:.5 }, 2.55);

  /* Scroll parallax + blur-out */
  ScrollTrigger.create({
    trigger:'#hero', start:'top top', end:'bottom top', scrub:true,
    onUpdate(self){
      video.style.filter  = `blur(${self.progress * 20}px)`;
      video.style.opacity = 1 - self.progress * .55;
      if(content) content.style.transform = `translateY(${self.progress * -48}px)`;
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
  menuBtn.addEventListener('click', ()=>{
    /* Dismiss "click me" hint on first interaction */
    const hint = document.querySelector('.header__hint');
    if(hint && hint.offsetParent !== null){
      gsap.to(hint,{ opacity:0, x:6, duration:.35, ease:'power2.in',
        onComplete:()=>{ hint.style.display='none'; }
      });
    }
    menuOpen ? closeMenu() : openMenu();
  });
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

/* Enhanced nav link hover — x-slide + red glow */
overlay && overlay.querySelectorAll('.nav-link').forEach(link=>{
  const text = link.querySelector('.nav-link__text');
  if(!text) return;
  link.addEventListener('mouseenter',()=>{
    gsap.to(text,{ color:'var(--red)', x:14, duration:.3, ease:'power2.out', overwrite:'auto' });
  });
  link.addEventListener('mouseleave',()=>{
    gsap.to(text,{ color:'var(--white)', x:0, duration:.35, ease:'power2.inOut', overwrite:'auto' });
  });
});

/* ── ABOUT STATS COUNTER ─────────────────────────────────── */
const statNums = document.querySelectorAll('.about__stat .num');
const statsIO  = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    statsIO.unobserve(e.target);
    const numEl = e.target;
    /* The number text may include suffix spans — read only text nodes */
    const rawText = numEl.childNodes[0] ? numEl.childNodes[0].textContent.trim() : '';
    const num = parseInt(rawText, 10);
    if(isNaN(num)) return;
    const dur   = 1600;
    const start = performance.now();
    const suffixEl = numEl.querySelector('.num__suf');
    const tick = (now)=>{
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      numEl.childNodes[0].textContent = Math.round(eased * num);
      if(p < 1){
        requestAnimationFrame(tick);
      } else {
        /* Slam: scale up + glow on completion */
        const stat = numEl.closest('.about__stat');
        if(stat){
          stat.classList.add('counted');
          gsap.fromTo(numEl,
            { scale:1.18 },
            { scale:1, duration:.55, ease:'elastic.out(1,0.45)' }
          );
        }
      }
    };
    requestAnimationFrame(tick);
  });
},{ threshold:.5 });
statNums.forEach(n=> statsIO.observe(n));

/* ── METHODOLOGY CONNECTOR DRAW ──────────────────────────── */
window.addEventListener('load',()=>{
  const progIds = ['#prog01','#prog12','#prog23'];
  const glowIds = ['#glow01','#glow12','#glow23'];
  const progPaths = progIds.map(id=>document.querySelector(id)).filter(Boolean);
  if(!progPaths.length) return;

  /* Init dashoffset to full path length (invisible) */
  progPaths.forEach(p=>{
    const len = p.getTotalLength();
    p.style.strokeDasharray  = len;
    p.style.strokeDashoffset = len;
  });

  /* GSAP timeline: draw each segment then pop the glow dot */
  const connTL = gsap.timeline({ paused:true });
  progPaths.forEach((p,i)=>{
    const len   = p.getTotalLength();
    const glow  = document.querySelector(glowIds[i]);
    connTL
      .to(p,    { strokeDashoffset:0, duration:1, ease:'none' })
      .fromTo(glow,
        { opacity:0, attr:{ r:4 } },
        { opacity:1, attr:{ r:6 }, duration:.2, ease:'power2.out',
          onComplete(){ gsap.to(glow,{ attr:{r:4}, opacity:.8, duration:.4 }); }
        }, '<+=.9'
      );
  });

  ScrollTrigger.create({
    trigger:'#methodology',
    start:'top 65%',
    end:'bottom 35%',
    scrub:1.4,
    animation:connTL
  });
});

/* ── SERVICES CAROUSEL ───────────────────────────────────── */
(function svcCarousel(){
  const ITEM_H = 65;
  const SVCS = [
    { label:'IA & Automatización', badge:'IA & AUTO',
      img:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
      desc:'Flujos que trabajan las 24 horas. Pipelines inteligentes que multiplican tu equipo sin multiplicar tu nómina.',
      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' },
    { label:'Meta Ads & Marketing', badge:'PERFORMANCE',
      img:'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80',
      desc:'Campañas con creativos de alta costura. ROAS medido, presupuesto sin desperdicios.',
      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>' },
    { label:'Branding & Identidad', badge:'IDENTIDAD',
      img:'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
      desc:'Una identidad que te diferencia antes de que el cliente lea una sola palabra.',
      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>' },
    { label:'Desarrollo Web', badge:'DESARROLLO',
      img:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
      desc:'Portales, e-commerce, pagos automáticos. Código limpio, velocidad máxima, SEO desde el día uno.',
      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' },
    { label:'E-Commerce Premium', badge:'E-COMMERCE',
      img:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
      desc:'Tiendas que venden mientras duermes. Integración de pagos, inventario y automatización.',
      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' },
    { label:'Creación de Contenido', badge:'CONTENIDO',
      img:'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
      desc:'Video, fotografía y creativos que paran el scroll. Contenido que convierte, no solo que gusta.',
      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>' },
  ];

  const N = SVCS.length;
  let current = 0, paused = false;
  const track = document.getElementById('svcTrack');
  const stack = document.getElementById('svcStack');
  if(!track || !stack) return;

  const wrap  = v => ((v % N) + N) % N;
  const wdist = (from, to) => {
    let d = to - from;
    if(d > N/2) d -= N;
    if(d < -N/2) d += N;
    return d;
  };

  /* Build pills */
  const pills = SVCS.map((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'svc-pill' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', s.label);
    btn.innerHTML = `<span class="svc-pill__icon">${s.icon}</span><span>${s.label}</span>`;
    btn.addEventListener('click', () => goTo(i));
    btn.addEventListener('mouseenter', () => { paused = true; });
    btn.addEventListener('mouseleave', () => { paused = false; });
    track.appendChild(btn);
    return btn;
  });

  /* Build cards */
  const cards = SVCS.map((s, i) => {
    const card = document.createElement('div');
    card.className = 'svc-icard' + (i === 0 ? ' active' : ' inactive');
    card.innerHTML = `
      <img class="svc-icard__img" src="${s.img}" alt="${s.label}" loading="lazy"/>
      <div class="svc-icard__live">
        <div class="svc-icard__live-dot"></div>
        <span class="svc-icard__live-label">Proyecto</span>
      </div>
      <div class="svc-icard__overlay">
        <div class="svc-icard__badge">${i+1} · ${s.badge}</div>
        <p class="svc-icard__desc">${s.desc}</p>
      </div>`;
    stack.appendChild(card);
    return card;
  });

  function getStatus(i, idx){
    const d = wdist(idx, i);
    if(d === 0)  return 'active';
    if(d === -1) return 'prev';
    if(d === 1)  return 'next';
    return 'hidden';
  }

  function updatePills(idx){
    pills.forEach((pill, i) => {
      const d = wdist(idx, i);
      gsap.to(pill, {
        y: d * ITEM_H,
        opacity: Math.max(0, 1 - Math.abs(d) * 0.26),
        duration: .7, ease:'power3.out', overwrite:'auto'
      });
      pill.classList.toggle('active', d === 0);
    });
  }

  function updateCards(idx){
    cards.forEach((card, i) => {
      const st = getStatus(i, idx);
      const isA = st === 'active';
      const isP = st === 'prev';
      const isN = st === 'next';
      card.classList.toggle('inactive', !isA);
      card.classList.toggle('active', isA);
      gsap.to(card, {
        x:        isA ? 0 : isP ? -115 : isN ? 115 : 0,
        scale:    isA ? 1 : (isP||isN) ? .85 : .7,
        opacity:  isA ? 1 : (isP||isN) ? .38 : 0,
        rotation: isP ? -4 : isN ? 4 : 0,
        zIndex:   isA ? 20 : (isP||isN) ? 10 : 0,
        duration: .65, ease:'power2.out', overwrite:'auto'
      });
      const ov = card.querySelector('.svc-icard__overlay');
      if(ov) gsap.to(ov, isA
        ? { opacity:1, y:0, duration:.5, ease:'power2.out', delay:.15, overwrite:'auto' }
        : { opacity:0, y:12, duration:.28, ease:'power2.in', overwrite:'auto' });
    });
  }

  function goTo(idx){
    current = wrap(idx);
    updatePills(current);
    updateCards(current);
  }

  /* Init positions (no animation on load) */
  pills.forEach((pill, i) => {
    const d = wdist(0, i);
    gsap.set(pill, { y: d * ITEM_H, opacity: Math.max(0, 1 - Math.abs(d) * 0.26) });
  });
  cards.forEach((card, i) => {
    const st = getStatus(i, 0);
    const isP = st === 'prev', isN = st === 'next';
    gsap.set(card, {
      x:        st === 'active' ? 0 : isP ? -115 : isN ? 115 : 0,
      scale:    st === 'active' ? 1 : (isP||isN) ? .85 : .7,
      opacity:  st === 'active' ? 1 : (isP||isN) ? .38 : 0,
      rotation: isP ? -4 : isN ? 4 : 0,
      zIndex:   st === 'active' ? 20 : (isP||isN) ? 10 : 0,
    });
  });

  /* Touch swipe on card stack */
  let txStart = 0;
  stack.addEventListener('touchstart', e=>{ txStart = e.touches[0].clientX; },{ passive:true });
  stack.addEventListener('touchend', e=>{
    const dx = txStart - e.changedTouches[0].clientX;
    if(Math.abs(dx) > 50) goTo(current + (dx > 0 ? 1 : -1));
  },{ passive:true });

  /* Autoplay */
  setInterval(() => { if(!paused) goTo(current + 1); }, 3200);

  /* ScrollTrigger reveal */
  ScrollTrigger.create({
    trigger:'#services', start:'top 75%', once:true,
    onEnter(){
      gsap.fromTo('#svcCarousel',
        { opacity:0, y:36 },
        { opacity:1, y:0, duration:.85, ease:'power3.out' }
      );
    }
  });
})();

/* ── PORTFOLIO HOVER ─────────────────────────────────────── */
const pfItems   = document.querySelectorAll('.pf-item');
const pfPreview = document.getElementById('pfPreview');
const pfImg     = document.getElementById('pfImg');
let pfTimeout   = null;

/* Mouse-follow loop */
let pfMX = window.innerWidth/2, pfMY = window.innerHeight/2;
let pfCX = pfMX, pfCY = pfMY;
document.addEventListener('mousemove', e=>{ pfMX=e.clientX; pfMY=e.clientY; });
(function pfLoop(){
  pfCX += (pfMX - pfCX) * .20;
  pfCY += (pfMY - pfCY) * .20;
  if(pfPreview){
    pfPreview.style.left = pfCX + 'px';
    pfPreview.style.top  = pfCY + 'px';
  }
  requestAnimationFrame(pfLoop);
})();

pfItems.forEach(item=>{
  item.addEventListener('mouseenter',()=>{
    const imgUrl = item.dataset.img;
    if(pfImg && imgUrl){
      clearTimeout(pfTimeout);
      pfImg.style.opacity = '0';
      pfTimeout = setTimeout(()=>{
        pfImg.style.backgroundImage = `url('${imgUrl}')`;
        pfImg.style.opacity = '1';
      }, 180);
    }
    pfPreview && pfPreview.classList.add('visible');
  });
  item.addEventListener('mouseleave',()=>{
    pfPreview && pfPreview.classList.remove('visible');
  });
});

/* Staggered portfolio list reveal */
gsap.set('.pf-item', { opacity:0, y:24 });
ScrollTrigger.create({
  trigger:'#pfList',
  start:'top 82%',
  once:true,
  onEnter:()=>{
    gsap.to('.pf-item',{ opacity:1, y:0, stagger:.1, duration:.65, ease:'power3.out' });
  }
});

/* ── GLOBE SCROLL — scroll-driven case switching ─────────── */
window.addEventListener('load',()=>{
  /* Globe rotation targets per case */
  const GLOBE_POS = [
    { rotY:-1.2, rotX:0.25 },   /* 0: CDMX / México */
    { rotY: 0.02, rotX:0.30 },  /* 1: London / UK   */
    { rotY:-0.18, rotX:0.26 },  /* 2: Madrid / Spain */
  ];

  if(window.globeState) window.globeState.autoRot = false;

  let activeCaseScroll = -1;

  function rotateTo(i){
    if(!window.globeState) return;
    const pos = GLOBE_POS[i];
    gsap.to(window.globeState,{
      rotY: pos.rotY, rotX: pos.rotX,
      duration:1.8, ease:'power3.inOut', overwrite:'auto'
    });
  }

  ScrollTrigger.create({
    trigger:'#world',
    start:'top top',
    end:`+=${window.innerHeight * 2.2}`,
    pin:true,
    onUpdate(self){
      const p   = self.progress;
      const idx = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
      if(idx !== activeCaseScroll){
        activeCaseScroll = idx;
        setCase(idx);
        rotateTo(idx);
        /* Sync scroll dots */
        document.querySelectorAll('.world__dot').forEach((d,j)=>{
          d.classList.toggle('world__dot--active', j===idx);
        });
      }
    }
  });
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
const caseContent = document.getElementById('caseContent');

function applyCaseData(c){
  if(caseCountry) caseCountry.textContent = c.country;
  if(caseName)    caseName.textContent    = c.name;
  if(caseDesc)    caseDesc.textContent    = c.desc;
  if(caseNum)     caseNum.textContent     = c.num;
  if(caseUnit)    caseUnit.textContent    = c.unit;
}

function syncDots(i){
  document.querySelectorAll('.world__dot').forEach((d,j)=>{
    d.classList.toggle('world__dot--active', j===i);
  });
}

function initCase(i){
  caseTabs.forEach((t,j)=> t.classList.toggle('world__tab--active', j===i));
  applyCaseData(CASES[i]);
  document.querySelectorAll('.polaroid').forEach((p,j)=>{
    p.style.zIndex   = j===i ? 5 : 1;
    p.style.opacity  = j===i ? 1  : .5;
  });
  syncDots(i);
}

function setCase(i){
  caseTabs.forEach((t,j)=> t.classList.toggle('world__tab--active', j===i));
  const c = CASES[i];
  if(caseContent){
    gsap.to(caseContent,{ opacity:0, y:8, duration:.25, ease:'power2.in',
      onComplete(){
        applyCaseData(c);
        gsap.to(caseContent,{ opacity:1, y:0, duration:.35, ease:'power3.out' });
      }
    });
  } else { applyCaseData(c); }
  document.querySelectorAll('.polaroid').forEach((p,j)=>{
    gsap.to(p,{ opacity: j===i ? 1 : .5, duration:.4 });
    p.style.zIndex = j===i ? 5 : 1;
  });
  syncDots(i);
}

caseTabs.forEach((btn,i)=> btn.addEventListener('click',()=> setCase(i)));
initCase(0);

/* ── CINEMATIC SECTION ENTRANCES ─────────────────────────── */
window.addEventListener('load', ()=>{

  /* Make sections visible immediately — GSAP owns inner elements */
  document.querySelectorAll('.reveal-section').forEach(s=>{
    s.style.opacity  = '1';
    s.style.transform= 'none';
    s.style.transition='none';
  });

  /* ─── ABOUT ──────────────────────────────────────────── */
  (()=>{
    const sec    = document.querySelector('#about');
    if(!sec) return;
    const mapImg = sec.querySelector('.about__map-bg img');
    const lbl    = sec.querySelector('.label');
    const ttl    = sec.querySelector('.about__title');
    const bodies = sec.querySelectorAll('.about__body');
    const stats  = sec.querySelectorAll('.about__stat');
    const vals   = sec.querySelectorAll('.about__values span');

    mapImg && gsap.set(mapImg, { scale:1.65, opacity:0, filter:'blur(28px)' });
    gsap.set([lbl, bodies], { opacity:0, y:18 });
    gsap.set(ttl,  { opacity:0, clipPath:'inset(105% 0 -5% 0)' });
    gsap.set(stats, { scale:0, opacity:0, rotation:-8 });
    gsap.set(vals,  { scale:.5, opacity:0, y:12,
      rotation: function(i){ return i%2 ? 8:-8; } });

    ScrollTrigger.create({
      trigger:sec, start:'top 72%', once:true,
      onEnter(){
        const tl = gsap.timeline({ defaults:{ ease:'power3.out' } });

        /* 1. Map zooms in from big+blurry → small+clear (like focusing a lens) */
        mapImg && tl.to(mapImg,
          { scale:1, opacity:.06, filter:'blur(0px)', duration:1.9, ease:'power2.out' }, 0);

        /* 2. Label drops in */
        tl.to(lbl, { opacity:1, y:0, duration:.5 }, 0.2);

        /* 3. Title wipes up from below (curtain lift) */
        tl.to(ttl,
          { opacity:1, clipPath:'inset(0% 0 -5% 0)', duration:.85, ease:'power3.out' }, 0.4);

        /* 4. Body lines cascade */
        tl.to(bodies, { opacity:1, y:0, stagger:.2, duration:.65 }, 0.78);

        /* 5. Stats: elastic bomb-in */
        tl.to(stats,
          { scale:1, opacity:1, rotation:0, stagger:.14, duration:.62,
            ease:'back.out(2.4)' }, 0.92);

        /* 6. Values: scatter → gather */
        tl.to(vals,
          { scale:1, opacity:1, y:0, rotation:0, stagger:.07, duration:.48,
            ease:'back.out(1.8)' }, 1.2);
      }
    });
  })();

  /* ─── SERVICES reveal already in svc tab ScrollTrigger ── */

  /* ─── PORTFOLIO ──────────────────────────────────────── */
  (()=>{
    const hdr   = document.querySelector('.portfolio__header');
    if(!hdr) return;
    const lbl   = hdr.querySelector('.label');
    const ttl   = hdr.querySelector('.portfolio__title');
    const items = document.querySelectorAll('.pf-item');

    gsap.set(lbl,   { opacity:0, y:14 });
    gsap.set(ttl,   { opacity:0, clipPath:'inset(105% 0 -5% 0)' });
    gsap.set(items, { opacity:0, y:24 });

    ScrollTrigger.create({
      trigger:'#portfolio', start:'top 72%', once:true,
      onEnter(){
        const tl = gsap.timeline({ defaults:{ ease:'power3.out' } });
        tl.to(lbl,   { opacity:1, y:0, duration:.45 }, 0);
        tl.to(ttl,   { opacity:1, clipPath:'inset(0% 0 -5% 0)', duration:.78 }, 0.18);
        /* Items slide up staggered */
        tl.to(items, { opacity:1, y:0, stagger:.09, duration:.55 }, 0.5);
      }
    });
  })();

  /* ─── WORLD / GLOBE ──────────────────────────────────── */
  (()=>{
    const canvas  = document.getElementById('globeCanvas');
    const hdr     = document.querySelector('.world__header');
    const caseBox = document.getElementById('worldCase');
    const pols    = document.querySelectorAll('.polaroid');
    if(!canvas) return;

    /* Globe starts tiny + foggy */
    gsap.set(canvas, { scale:.28, opacity:0, filter:'blur(24px)' });
    if(hdr){
      gsap.set(hdr.querySelector('.label'),        { opacity:0, y:14 });
      gsap.set(hdr.querySelector('.world__title'), { opacity:0, clipPath:'inset(105% 0 -5% 0)' });
    }
    caseBox && gsap.set(caseBox, { opacity:0, y:32 });
    const polOffsets = [[-75,-30,-18],[75,-45,22],[35,45,-12]];
    pols.forEach((p,i)=>{
      const [ox,oy,rot] = polOffsets[i]||[0,0,0];
      gsap.set(p, { scale:0, opacity:0, x:ox, y:oy, rotation:rot });
    });

    ScrollTrigger.create({
      trigger:'#world', start:'top 74%', once:true,
      onEnter(){
        const tl = gsap.timeline({ defaults:{ ease:'power3.out' } });

        /* Globe: first pulse big + blurry, then snap clear (bomb-in) */
        tl.to(canvas,
          { scale:1.15, opacity:.8, filter:'blur(8px)', duration:.45, ease:'power2.in' }, 0);
        tl.to(canvas,
          { scale:1, opacity:1, filter:'blur(0px)', duration:.75, ease:'back.out(1.4)' }, 0.45);

        /* Header wipe */
        if(hdr){
          tl.to(hdr.querySelector('.label'),
            { opacity:1, y:0, duration:.45 }, 0.28);
          tl.to(hdr.querySelector('.world__title'),
            { opacity:1, clipPath:'inset(0% 0 -5% 0)', duration:.75 }, 0.46);
        }
        caseBox && tl.to(caseBox, { opacity:1, y:0, duration:.65 }, 0.42);

        /* Polaroids fly in from their offset positions */
        pols.forEach((p,i)=>{
          tl.to(p,
            { scale:1, opacity: i===0?1:.6, x:0, y:0, rotation:0,
              duration:.72, ease:'back.out(1.9)' },
            0.55 + i * .18
          );
        });
      }
    });
  })();

  /* ─── METHODOLOGY ────────────────────────────────────── */
  (()=>{
    const nodes = document.querySelectorAll('.method-node');
    const lbl   = document.querySelector('#methodology .label');
    const ttl   = document.querySelector('.methodology__title');
    if(!nodes.length) return;

    lbl && gsap.set(lbl, { opacity:0, y:14 });
    ttl && gsap.set(ttl, { opacity:0, clipPath:'inset(105% 0 -5% 0)' });

    nodes.forEach(n=>{
      const icon = n.querySelector('.method-node__icon');
      const word = n.querySelector('.method-node__word');
      const desc = n.querySelector('.method-node__desc');
      icon && gsap.set(icon, { scale:0, opacity:0, rotation:-24 });
      word && gsap.set(word, { opacity:0, y:18 });
      desc && gsap.set(desc, { opacity:0, y:10 });
    });

    ScrollTrigger.create({
      trigger:'#methodology', start:'top 72%', once:true,
      onEnter(){
        const tl = gsap.timeline({ defaults:{ ease:'power3.out' } });

        lbl && tl.to(lbl, { opacity:1, y:0, duration:.45 }, 0);
        ttl && tl.to(ttl,
          { opacity:1, clipPath:'inset(0% 0 -5% 0)', duration:.78 }, 0.18);

        nodes.forEach((node,i)=>{
          const icon = node.querySelector('.method-node__icon');
          const word = node.querySelector('.method-node__word');
          const desc = node.querySelector('.method-node__desc');
          const t = 0.52 + i * 0.24;

          /* ICON: zoom-bomb → overshoot → settle — exactly what user described */
          icon && tl.to(icon,
            { scale:1.35, rotation:7, opacity:1,
              duration:.32, ease:'back.out(3.5)' }, t);
          icon && tl.to(icon,
            { scale:1, rotation:0, duration:.3, ease:'power2.inOut' }, t + .32);

          /* WORD: rises up from behind the icon */
          word && tl.to(word,
            { opacity:1, y:0, duration:.4, ease:'power3.out' }, t + .28);

          /* DESCRIPTION: fades in after word */
          desc && tl.to(desc,
            { opacity:1, y:0, duration:.4, ease:'power2.out' }, t + .5);

          /* Trigger CSS breathing animation */
          tl.add(()=> node.classList.add('visible'), t + .65);
        });
      }
    });
  })();

  /* ─── CONTACT ────────────────────────────────────────── */
  (()=>{
    const sec  = document.querySelector('#contact');
    if(!sec) return;
    const lbl  = sec.querySelector('.label');
    const ttl  = sec.querySelector('.contact__title');
    const sub  = sec.querySelector('.contact__sub');
    const lnks = sec.querySelectorAll('.contact__link');
    const card = document.getElementById('contactCard');

    lbl  && gsap.set(lbl,  { opacity:0, y:14 });
    ttl  && gsap.set(ttl,  { opacity:0, clipPath:'inset(105% 0 -5% 0)' });
    sub  && gsap.set(sub,  { opacity:0, y:16 });
    gsap.set(lnks, { opacity:0, x:-16 });
    card && gsap.set(card, { scale:.9, opacity:0, filter:'blur(16px)' });

    ScrollTrigger.create({
      trigger:sec, start:'top 72%', once:true,
      onEnter(){
        const tl = gsap.timeline({ defaults:{ ease:'power3.out' } });

        lbl  && tl.to(lbl,  { opacity:1, y:0, duration:.45 }, 0);
        ttl  && tl.to(ttl,
          { opacity:1, clipPath:'inset(0% 0 -5% 0)', duration:.78 }, 0.18);

        /* Card: blurs in from center — like a portal opening */
        card && tl.to(card,
          { scale:1, opacity:1, filter:'blur(0px)',
            duration:.9, ease:'back.out(1.2)' }, 0.25);

        sub  && tl.to(sub,  { opacity:1, y:0, duration:.55 }, 0.62);
        lnks.length && tl.to(lnks,
          { opacity:1, x:0, stagger:.12, duration:.5 }, 0.78);
      }
    });
  })();

});

/* ── CONTACT FORM ────────────────────────────────────────── */
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const btn = form.querySelector('.btn-send');
    btn.textContent = '✓ ¡Enviado! Te contactamos pronto.';
    btn.style.background = 'var(--green)';
    setTimeout(()=>{
      btn.textContent = 'Enviar solicitud →';
      btn.style.background = '';
      form.reset();
    }, 3500);
  });
}

})();
