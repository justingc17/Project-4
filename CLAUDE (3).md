# CLAUDE.md — Project 4 · Memoria Maestra
> Agencia digital premium · Chihuahua, México · Marzo 2026
> Este archivo es la memoria permanente del proyecto. Léelo COMPLETO antes de cualquier acción.

---

## 01. QUÉ ES ESTE PROYECTO

**Project 4** es el sitio web portafolio oficial de una agencia digital premium con sede en Chihuahua, México. No es un sitio genérico — es una declaración de identidad. El sitio debe comunicar autoridad, criterio estético y resultados reales.

**Filosofía interna:**
> "No es solo una agencia de redes. Es una extensión del estilo, criterio y visión de sus fundadores para crear valor real en los clientes."

**Tagline principal:**
> "Ecosistemas digitales que transforman marcas. ROI real. Sin excusas."

**Hosting:** GitHub Pages — rama `gh-pages`
**URL en vivo:** `https://justingc17.github.io/Project-4/`
**Repo:** `justingc17/Project-4`
**Rama de trabajo activa:** `claude/portfolio-website-design-fWc9l`

---

## 02. STACK TÉCNICO

```
HTML5 + CSS3 + Vanilla JS (sin frameworks)
GSAP 3.12.5 — ScrollTrigger + CustomEase
Space Grotesk + Space Mono (Google Fonts)
Horizon Regular / Horizon Outlined (OTF locales en /assets/)
Cloudinary (video del hero)
```

**Estructura de archivos:**
```
/
├── index.html          ← archivo principal
├── globe-v2.html       ← globo terráqueo standalone
├── BRAND_IDENTITY.md   ← identidad visual completa
├── CLAUDE.md           ← este archivo
├── assets/
│   ├── logo oficial.png
│   ├── logo letras blancas.png
│   ├── logo letras negras.png
│   ├── logo oficial en negro.png
│   ├── logo_letras_blancas.png
│   ├── logo_oficial.png
│   ├── globe-chihuahua-cdmx.svg
│   ├── globe-closeup.svg
│   ├── diseño contraportada.png
│   ├── diseño servicios.png
│   ├── Horizon_Regular.otf
│   └── Horizon_Outlined.otf
├── css/
│   └── main.css
└── js/
    ├── main.js
    ├── globe.js
    └── cursor.js
```

---

## 03. PALETA DE COLORES

| Variable CSS | Hex | Uso |
|---|---|---|
| `--blue` | `#3195ff` | Acento primario digital, links, brillos |
| `--teal` | `#5ce1e6` | Acento secundario, nodos, detalles |
| `--red` | `#ea333f` | CTAs, énfasis crítico, peligro |
| `--orange` | `#e67111` | Acento cálido, metodología |
| `--navy` | `#1a3446` | Profundidad, fondos de superficie |
| `--green` | `#113c41` | Nodos terciarios, contraste |
| `--bg` | `#060608` | Fondo base del sitio (casi negro, temperatura fría) |
| `--white` | `#f0ece4` | Texto principal (blanco cálido) |
| `--gray` | `rgba(240,236,228,.42)` | Texto secundario, etiquetas |

**Regla de uso:** `--blue` y `--teal` son los acentos dominantes. `--red`/`--orange` para énfasis. El fondo `#060608` NO es negro puro.

---

## 04. TIPOGRAFÍA

| Familia | Archivo | Uso |
|---|---|---|
| **Horizon Regular** (400) | `assets/Horizon_Regular.otf` | Títulos grandes, "PROJECT 4" hero, números |
| **Horizon Outlined** (300) | `assets/Horizon_Outlined.otf` | Subtítulos en outline, contraste ligero |
| **Space Grotesk** | Google Fonts | Body, párrafos, navegación, UI |
| **Space Mono** | Google Fonts | Etiquetas técnicas, porcentajes, datos |

### Sistema tipográfico hero (IDENTIDAD VISUAL CLAVE)
```css
/* "PROJECT" — pequeño, outline, casi transparente */
.hero__title-word {
  font-size: clamp(18px, 3.4vw, 56px);
  font-weight: 300;
  color: transparent;
  -webkit-text-stroke: 1px rgba(240,236,228,.6);
  font-family: 'Horizon Outlined';
}

/* "4" — masivo, sólido, dominante */
.hero__title-num {
  font-size: clamp(160px, 28vw, 380px);
  font-weight: 400;
  color: var(--white);
  font-family: 'Horizon Regular';
}
```
**El contraste de escala ~1:10 entre "PROJECT" y "4" es la marca visual más importante del sitio. NUNCA romper esto.**

---

## 05. ESTRUCTURA DEL SITIO (SECCIONES)

```
#hero        — Video fullscreen + título PROJECT/4 + CTAs
marquee      — Ticker de servicios animado
#about       — Nosotros + estadísticas + globo terráqueo
#services    — 4 servicios + servicios adicionales
#portfolio   — 5 casos de clientes + 3 referentes globales
#world       — El mundo (#world) — sección del globo terráqueo SVG
#methodology — Metodología: Radiografiar → Proyectar → Encender → Multiplicar
#contact     — Formulario + datos de contacto
footer       — Mirror "PROJECT 4" + links
```

### Navegación
```
01 — Nosotros     (#about)
02 — Servicios    (#services)
03 — Portafolio   (#portfolio)
04 — Metodología  (#methodology)
     Contacto     (#contact)
```

---

## 06. COMPONENTES ESPECIALES

### Cursor personalizado (solo desktop)
- Punto central + anillo rojo animado
- En hover sobre interactivos: anillo crece, se vuelve `--blue`
- Implementado en `js/cursor.js`

### Grain overlay
- Textura de grano de película sobre todo el sitio
- Opacity: 2.8%, animada en 8 pasos
- `div#grain` en HTML, estilos en `main.css`

### Splash screen
- Logo + barra de progreso + porcentaje
- Se oculta al cargar la página

### Globo terráqueo
- SVG con puntos geográficos reales (alta densidad)
- Centrado entre Chihuahua y Ciudad de México
- Marcadores para ambas ciudades con anillos concéntricos + glow cyan
- Línea punteada conectando las dos ciudades
- Archivo: `assets/globe-chihuahua-cdmx.svg`
- También existe `globe-v2.html` como standalone

### Navegación kinética fullscreen
- Overlay fullscreen que se abre con botón "Menu"
- 5 paneles de fondo con formas SVG animadas (una por link)
- Links con efecto slot (texto desliza al hover)
- Estado controlado con `data-state="closed/open"` en `#navOverlay`
- **PROBLEMA CONOCIDO:** El menú no se mostraba correctamente en algunos dispositivos. Verificar que el toggle en `main.js` funcione y que el CSS tenga `z-index` correcto.

---

## 07. SISTEMA DE ANIMACIÓN (GSAP)

**Filosofía:** Cinematográfica. Cada sección es una escena. Físicas reales, no fades simples.

### Secuencia del hero
```
0.0s  — Video: desenfoque → foco
0.95s — Eyebrow: fade + slide up
1.15s — "PROJECT": chars por char, desde abajo, con rotación
1.30s — "4": blur + scale overshoot → snap
1.78s — Línea de acento: wipe horizontal
2.0s  — Subtítulo: fade + slide
2.18s — CTAs: fade + slide
2.55s — Scroll indicator: fade
```

### Animación de íconos (zoom-bomb signature)
```
Estado inicial:  scale(0) rotate(-24°)
Paso 1:          scale(1.35) rotate(7°)   — rebota
Paso 2:          scale(1) rotate(0°)      — snap final
```

### Reveal de secciones
- Títulos: `clipPath inset(105%)` → `inset(0%)` — cortina que sube
- Stats: escala elástica `back.out(2.4)` + glow al terminar contador
- Cards: `scale(0.9) blur(16px)` → `scale(1) blur(0)`
- Todos usan `ScrollTrigger` con `once: true`

---

## 08. CLIENTES Y PORTAFOLIO

| Proyecto | Sector | URL |
|---|---|---|
| Algoritso | SaaS · Tecnología | algoritso.com |
| Hot Yoga CUU | Wellness · Reservas | hotyogacuu.com.mx |
| Reinventa | Consultoría · Educación | reinventacapacitacion.com.mx |
| Herrcava | Constructora · Corporativo | — |
| Gallery 2020 | Arte · Galería | gallery2020mx.netlify.app |

**Referentes globales en la sección portafolio:**
- Bitso (México) — $1B+ USD/año sin sucursales físicas
- Gymshark (UK) — De garage a marca global
- Nude Project (España) — Comunidad-first, premium desde redes

---

## 09. SERVICIOS

```
01 — IA & Automatización   (chatbots, CRMs, pipelines inteligentes)
02 — Meta Ads & Marketing  (campañas, redes, contenido, ROAS medido)
03 — Branding & Identidad  (logo, tipografía, paleta, voz de marca)
04 — Desarrollo Web        (portales, e-commerce, reservas, pagos)
```
Servicios adicionales: Creación de contenido · Fotografía & video · Gestión de redes · Package design · Rescate de proyectos

---

## 10. METODOLOGÍA (4 PASOS)

```
Radiografiar → Proyectar → Encender → Multiplicar
```

| Paso | Color | Descripción |
|---|---|---|
| Radiografiar | `#ff3131` | Diseccionamos el negocio. Sin suposiciones. |
| Proyectar | `#1a3446` | Arquitectamos la solución. ROI visible desde el diseño. |
| Encender | `#113c41` | Lanzamos con velocidad quirúrgica. Sprints semanales. |
| Multiplicar | `#ff3131` | Crecimiento compuesto. Tu equipo digital permanente. |

---

## 11. TONO DE VOZ

**Correcto:**
- Directo, confiado, técnico pero humano
- "ROI real. Sin excusas." / "No somos recién llegados." / "Código limpio, velocidad máxima."

**Evitar:**
- Hipérboles vacías ("los mejores del mundo")
- Jerga corporativa ("sinergia", "soluciones 360°")
- Humildad falsa

---

## 12. REFERENTES DE DISEÑO

Wieden+Kennedy · AKQA · R/GA · Droga5 · Work & Co · Fantasy · Instrument · DEPT

**Principios clave extraídos:**
- Una idea visual dominante por sección
- Contraste tipográfico extremo como marca de identidad
- Silencio estratégico: el espacio en blanco comunica premium
- Narrativa como película: secciones conectadas, no islas
- Texto que "respira": animaciones con física real

---

## 13. ESTADO ACTUAL DEL PROYECTO

### ✅ Completado
- Hero con video Cloudinary + animación completa
- Tipografía Horizon cargada localmente
- Globo terráqueo SVG (Chihuahua ↔ CDMX)
- Marquee de servicios
- Sección Nosotros con estadísticas
- Sección Servicios
- Sección Portafolio con clientes reales
- Sección Metodología (4 nodos)
- Formulario de contacto
- Footer con efecto mirror
- Grain overlay
- Cursor personalizado
- Splash screen
- Navegación kinética fullscreen

### ⚠️ Pendiente / Con Issues
- **Menú de navegación:** No se mostraba en móvil ni desktop. Revisar z-index y el toggle en `main.js` (función que maneja `data-state` en `#navOverlay`).
- **Sección #world:** Verificar que el globo SVG esté correctamente integrado en el flujo del index.html.
- **Deploy a gh-pages:** Pendiente hacer el PR y merge de `claude/portfolio-website-design-fWc9l` → `main` → `gh-pages`.

---

## 14. INSTRUCCIONES PARA NUEVA SESIÓN

Al iniciar una nueva sesión de Claude Code:

1. Lee este CLAUDE.md completo
2. Lee `index.html` para ver el estado actual del HTML
3. Lee `css/main.css` para ver los estilos
4. Lee `js/main.js` para ver la lógica
5. Pregunta al usuario qué quiere trabajar hoy
6. NO reinventes decisiones ya tomadas — respétalas
7. NUNCA cambies la paleta, tipografía o estructura sin confirmación explícita

**Comandos útiles para verificar el estado:**
```bash
# Ver qué archivos hay
ls -la
ls assets/
# Abrir el sitio localmente
python3 -m http.server 8080
```

---

## 15. DATOS DE CONTACTO DEL SITIO

- **WhatsApp:** `https://wa.me/5216141000000`
- **Ubicación:** Chihuahua, Chihuahua, México
- **Redes:** Instagram · Facebook · TikTok

---

*CLAUDE.md generado el 01 Abril 2026 · Rama `claude/portfolio-website-design-fWc9l`*
*Actualizar este archivo cada vez que se completen cambios importantes.*
