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
  const titleEl = document.getElementById('heroTitle');
  const accent  = document.getElementById('heroAccent');
  const eyebrow = document.querySelector('.hero__eyebrow');
  const sub     = document.querySelector('.hero__sub');
  const ctaRow  = document.querySelector('.hero__cta-row');
  if(!video) return;

  /* Split title chars */
  const chars = titleEl ? splitIntoChars(titleEl) : [];

  /* Set initial states */
  gsap.set(chars,   { yPercent:110, rotation:4 });
  gsap.set(eyebrow, { opacity:0, y:12 });
  gsap.set(accent,  { scaleX:0, transformOrigin:'left center' });
  gsap.set(sub,     { opacity:0, y:14 });
  gsap.set(ctaRow,  { opacity:0, y:14 });
  gsap.set(scroll,  { opacity:0 });

  const tl = gsap.timeline({ defaults:{ ease:'power3.out' } });

  tl
    /* 1. Video unblur */
    .to(video, { filter:'blur(0px)', scale:1, duration:2.6, ease:'power2.inOut' }, 0)

    /* 2. Eyebrow fades in */
    .to(eyebrow, { opacity:1, y:0, duration:.7 }, 1.0)

    /* 3. Title chars cascade up */
    .to(chars, {
      yPercent:0, rotation:0, duration:.9,
      stagger:{ amount:.55, ease:'power2.out' }
    }, 1.3)

    /* 4. Red accent line extends */
    .to(accent, { scaleX:1, duration:.7, ease:'power3.inOut' }, 1.85)

    /* 5. Subtitle + CTA fade up */
    .to(sub,    { opacity:1, y:0, duration:.65 }, 2.0)
    .to(ctaRow, { opacity:1, y:0, duration:.65 }, 2.2)

    /* 6. Scroll indicator */
    .to(scroll, { opacity:1, duration:.6 }, 2.6);

  /* Parallax blur on scroll */
  ScrollTrigger.create({
    trigger:'#hero', start:'top top', end:'bottom top', scrub:true,
    onUpdate(self){
      video.style.filter  = `blur(${self.progress * 18}px)`;
      video.style.opacity = 1 - self.progress * .5;
      if(content) content.style.transform = `translateY(${self.progress * -40}px)`;
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

/* ── SECTION REVEAL ──────────────────────────────────────── */
const revealSections = document.querySelectorAll('.reveal-section');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{ threshold:.1, rootMargin:'0px 0px -60px 0px' });
revealSections.forEach(s=> io.observe(s));

/* ── ABOUT STATS COUNTER ─────────────────────────────────── */
const statNums = document.querySelectorAll('.about__stat .num');
const statsIO  = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    statsIO.unobserve(e.target);
    const el  = e.target;
    const raw = el.textContent.trim();
    const num = parseInt(raw, 10);
    const suf = raw.replace(/[0-9]/g, '');
    if(isNaN(num)) return;
    const dur   = 1400;
    const start = performance.now();
    const tick  = (now)=>{
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * num) + suf;
      if(p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
},{ threshold:.6 });
statNums.forEach(n=> statsIO.observe(n));

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

/* ── SERVICES TABS ───────────────────────────────────────── */
const svcTabs  = document.querySelectorAll('.svc-tab');
const svcCards = document.querySelectorAll('.svc-card');
let activeSvc  = 0;
let svcAnimating = false;

function showSvc(i){
  if(i === activeSvc || svcAnimating) return;
  svcAnimating = true;

  const prevCard = document.querySelector(`.svc-card[data-svc="${activeSvc}"]`);
  const nextCard = document.querySelector(`.svc-card[data-svc="${i}"]`);

  /* Update tabs */
  svcTabs.forEach((t,j)=>{
    t.classList.toggle('active', j===i);
    t.setAttribute('aria-selected', j===i ? 'true':'false');
  });

  /* Animate out current, animate in next */
  if(prevCard){
    gsap.to(prevCard, {
      opacity:0, y:-12, duration:.28, ease:'power2.in',
      onComplete(){
        prevCard.classList.remove('active');
        prevCard.hidden = true;
        prevCard.style.opacity = '';
        prevCard.style.transform = '';

        if(nextCard){
          nextCard.hidden = false;
          nextCard.classList.add('active');
          gsap.fromTo(nextCard,
            { opacity:0, y:20 },
            { opacity:1, y:0, duration:.4, ease:'power3.out',
              onComplete(){ svcAnimating = false; }
            }
          );
        } else { svcAnimating = false; }
      }
    });
  } else {
    if(nextCard){
      nextCard.hidden = false;
      nextCard.classList.add('active');
      svcAnimating = false;
    }
  }

  activeSvc = i;
}

svcTabs.forEach((btn,i)=>{
  btn.addEventListener('click',()=> showSvc(i));
});

/* Touch swipe on svc-cards area */
let svcTouchX = 0;
const svcArea = document.getElementById('svcCards');
if(svcArea){
  svcArea.addEventListener('touchstart', e=>{ svcTouchX = e.touches[0].clientX; },{ passive:true });
  svcArea.addEventListener('touchend', e=>{
    const dx = svcTouchX - e.changedTouches[0].clientX;
    if(Math.abs(dx) > 50){
      const next = activeSvc + (dx > 0 ? 1 : -1);
      if(next >= 0 && next < svcTabs.length) showSvc(next);
    }
  },{ passive:true });
}

/* Staggered reveal of svc section */
ScrollTrigger.create({
  trigger:'#services',
  start:'top 75%',
  once:true,
  onEnter(){
    gsap.fromTo('.svc-tab',
      { opacity:0, y:16 },
      { opacity:1, y:0, stagger:.08, duration:.5, ease:'power3.out' }
    );
    gsap.fromTo('.svc-card.active',
      { opacity:0, y:28 },
      { opacity:1, y:0, duration:.65, ease:'power3.out', delay:.25 }
    );
  }
});

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
