# PROJECT 4 — Contexto Permanente para Claude Code

## Qué es este proyecto
Sitio web oficial de **Project 4**, agencia digital de transformación de negocios.
Este archivo se lee en cada sesión. Nunca ignores su contenido.

---

## Identidad de Marca

**Nombre:** Project 4  
**Tagline:** Agencia Digital de Transformación  
**Origen:** Chihuahua, México  
**Voz:** Bold. Directa. Sin adornos. La calidad habla sola.  
**Filosofía:** Show, Don't Tell — la autoridad se demuestra con el diseño, no se declara.

### Por qué existimos
Nacimos con internet. Somos la generación que creció con la web y entiende cada etapa digital. Aportamos valor antes de cobrar. No entregamos proyectos — construimos relaciones con mejora continua.

### Cliente objetivo
Dueños de negocio medianos-pequeños que saben que necesitan crecer digitalmente pero no saben por dónde. Empresas que han tenido malas experiencias con agencias que cobran y desaparecen.

### Método de trabajo
1. **Entender** — comprender al cliente, no asumir
2. **Estrategia** — diseñar la solución correcta
3. **Activar** — poner en marcha con precisión
4. **Crecer** — mejora continua, nunca termina

### Valores
Honestidad · Confianza · Responsabilidad · Atención al detalle · Cercanía humana · Innovación real

---

## Servicios
- Desarrollo web (portales, e-commerce, reservas, pagos, recordatorios WhatsApp/email)
- Branding & diseño de imagen
- Diseño de logo
- Package design
- Meta Ads & gestión de campañas
- Marketing digital
- Creación de contenido (video + imágenes)
- Gestión de redes sociales
- Automatizaciones
- Implementación de IA para sectores específicos
- Rediseño web / rescate de proyectos mal ejecutados

## Proyectos Reales en Portafolio
- algoritso.com
- hotyoga.mx
- reinventa.consultoria.com
- herrcava (constructora)
- Gallery 2020

---

## Stack Técnico

```
HTML5 / CSS3 / JavaScript vanilla
GSAP 3 + ScrollTrigger (CDN: cdnjs.cloudflare.com)
Sin frameworks. Sin build tools. Un solo archivo index.html.
```

### Assets disponibles en /assets
```
logo_oficial.png          → isotipo P4 (blanco sobre negro)
logo_letras_blancas.png   → wordmark "PROJECT 4" blanco
logo_oficial_en_negro.png → isotipo negro (para fondos claros)
logo_letras_negras.png    → wordmark negro
Horizon_Regular.otf       → tipografía display principal
Horizon_Outlined.otf      → tipografía display outlined
globe-v2.html             → globe canvas interactivo (código completo)
globe-closeup.svg         → referencia visual del globe
```

---

## Sistema Visual

### Paleta
```css
--black:    #060608;   /* fondo base */
--white:    #f0ece4;   /* texto principal */
--orange:   #e67111;   /* acento único */
--gray:     #1a1a1e;   /* secciones alternas */
--gray-2:   #2a2a2e;   /* cards, bordes */
--gray-text:#6b6b72;   /* texto secundario */
```

### Tipografía
```css
/* Display — títulos, navbar, footer */
font-family: 'Horizon', sans-serif;
@font-face { src: url('assets/Horizon_Regular.otf') }
@font-face { src: url('assets/Horizon_Outlined.otf') /* weight: 300 */ }

/* Body — texto corrido, labels, botones */
font-family: 'Space Grotesk', sans-serif; /* Google Fonts */
```

### Reglas de diseño NO negociables
- Fondo oscuro dominante (#060608) — página de tono oscuro
- El naranja (#e67111) es el ÚNICO color de acento — úsalo con precisión, no en exceso
- Labels en mayúsculas con letter-spacing amplio (.25em+)
- Borders sutiles: rgba(240,236,228, .06–.10) — nunca bordes blancos sólidos
- Sombras: ninguna. Profundidad por color y opacidad, no por box-shadow
- Cursor personalizado obligatorio en desktop
- Animaciones: cubic-bezier(.76,0,.24,1) para entradas, power3.inOut para GSAP

---

## Estructura de Secciones

### 1. Navbar
- Fixed, top. Fondo transparente → glass blur al hacer scroll
- Izquierda: isotipo P4 + wordmark "PROJECT 4" en Horizon
- Derecha: links (Nosotros · Servicios · Portafolio · Contacto) + botón CTA
- CTA: borde fino, fill naranja en hover con transition scaleX
- Mobile: hamburger → overlay fullscreen con links en Horizon grande

### 2. Hero
- 100svh, video de fondo: `https://res.cloudinary.com/degisx2oq/video/upload/v1773968303/0318_1_1_imwrz4.mp4`
- Video arranca con blur(24px) → desenfoca a 0 con GSAP (2.8s power2.inOut)
- Overlay gradiente top/bottom negro
- Contenido centrado: tagline pequeño arriba + "PROJECT 4" en Horizon grande
- Scroll indicator: línea vertical con dot naranja animado en loop
- ScrollTrigger: al hacer scroll el video se vuelve a blur + oscurece

### 3. Nosotros / About
- Grid 2 columnas: tabs izquierda + card visual derecha
- Tabs interactivos: 01 Filosofía · 02 Método · 03 Diferenciadores · 04 Valores
- Cada tab: borde top, número naranja, ícono +/× que rota
- Card derecha: fondo #1a1a1e, línea naranja top, stats en grid 2x2
- Stats: Horizon para número, label en caps pequeño

### 4. Servicios
- Fondo alterno (#1a1a1e)
- Layout interactivo: lista de servicios izquierda, preview visual derecha
- Al hover/click en cada servicio → imagen/mockup aparece a la derecha
- Numeración 01–08 en Horizon pequeño naranja
- Transición fluida entre servicios activos

### 5. Portafolio
- Fondo negro, sin padding lateral
- Track rotado -4deg con scale(1.05) para cubrir bordes
- 4 columnas: col 1 y 3 scroll hacia arriba (animation), col 2 y 4 hacia abajo
- Animación: CSS @keyframes translateY(-50%) infinito, 25s
- Cada item: 280×200px, border-radius 8px, overlay con nombre al hover
- Mobile: 2 columnas estáticas sin animación, overflow-y scroll

### 6. Mundo / Globe
- Grid 2 columnas: globe izquierda + contenido derecha
- Globe: canvas del archivo globe-v2.html integrado directamente
- Markers en naranja (#e67111) — no cyan
- 3 casos: México (local/nacional), UK Gymshark-style (fitness internacional), Asia (próximamente)
- Canvas interactivo: drag para rotar, scroll para zoom

### 7. Contacto
- Centrado, minimalista
- Título grande en Horizon + subtítulo + CTA botón naranja
- Info: email · WhatsApp · Instagram en fila

### 8. Footer
- Efecto marquee "PROJECT 4" en loop infinito
- Texto alterna: outline (−webkit-text-stroke) ↔ filled (color sólido)
- Velocidad: ~8s por ciclo completo
- Abajo: links · isotipo centrado · redes sociales
- Copyright: © 2025 Project 4 · Chihuahua, México

---

## Animaciones Clave

### Scroll Reveals
```javascript
// Usar IntersectionObserver, NO GSAP ScrollTrigger para reveals básicos
// threshold: 0.15, rootMargin: '0px 0px -60px 0px'
// Clase .reveal → .reveal.visible con CSS transition
```

### Hero Entry (GSAP)
```javascript
gsap.timeline()
  .to(video, { filter: 'blur(0px)', duration: 2.8, ease: 'power2.inOut' }, 0)
  .to(wrap, { scale: 1, duration: 3.2, ease: 'power3.inOut' }, 0)
  .to(content, { opacity: 1, y: 0, duration: 1.2 }, 1.2)
  .to(scrollIndicator, { opacity: 1, duration: 1 }, 1.8)
```

### Cursor Custom
```javascript
// Punto pequeño (8px) + follower con lag (32px, border)
// mix-blend-mode: difference en el punto
// Scale 3x en hover sobre elementos interactivos
// Oculto en mobile (display:none bajo 768px)
```

---

## Lo que NUNCA debes hacer en este proyecto

- ❌ Usar Inter, Roboto, Arial o system fonts
- ❌ Gradientes purple/blue genéricos
- ❌ Cards en grid uniforme sin jerarquía visual
- ❌ Box-shadows visibles
- ❌ Bordes blancos sólidos
- ❌ Más de un color de acento (solo naranja)
- ❌ Layouts simétricos y predecibles en secciones hero/about
- ❌ Íconos de librería genérica (Font Awesome, etc.) — usa SVG inline simples
- ❌ Animaciones lentas o rebotadas (bounce) — todo es power/ease suave
- ❌ Texto en mayúsculas en párrafos — solo en labels/nav/botones
- ❌ Entregar código sin revisar que las fuentes Horizon cargan correctamente

---

## Nivel de Referencia Visual

Estos sitios son el norte estético. Analízalos antes de diseñar cada sección:

| Sitio | Qué tomar |
|-------|-----------|
| instrument.com | Composición asimétrica, tipografía que domina |
| fantasy.co | Espaciado generoso, jerarquía visual clara |
| work.co | Funcional y bello, sin decoración innecesaria |
| akqa.com | Cinematográfico, oscuro, premium |
| droga5.com | Bold, directo, confianza en el blanco |
| monks.com | Mezcla de data + creatividad |

**Pregunta de control antes de entregar cualquier sección:**
> "¿Esto podría estar en instrument.com o fantasy.co?"
> Si la respuesta es no — rediseña.

---

## Flujo de Trabajo en Este Proyecto

1. Leer este CLAUDE.md completo antes de cada sesión
2. Revisar los assets en /assets antes de referenciar rutas
3. Construir sección por sección, mostrando resultado antes de continuar
4. Preguntar si hay duda sobre contenido real (emails, teléfonos, URLs)
5. Nunca inventar información de contacto o proyectos
6. Siempre verificar que Horizon carga antes de hacer commit visual

---

*Última actualización: Marzo 2025 — Brief completo aprobado por cliente*
