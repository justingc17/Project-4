# Project 4 — Brand Identity Document
> Versión 1.0 · Marzo 2026

---

## 01. Quiénes somos

**Project 4** es una agencia digital premium con sede en **Chihuahua, México**. Construimos ecosistemas digitales completos que transforman marcas con resultados medibles. No somos una agencia de entrega-y-adiós: somos el equipo digital permanente del cliente.

**Tagline principal:**
> *"Ecosistemas digitales que transforman marcas. ROI real. Sin excusas."*

**Tagline de sección Nosotros:**
> *"Dominamos el mercado digital. Desde adentro."*

**Diferenciador clave:**
No somos recién llegados. Llevamos años construyendo en digital cuando todavía no era negocio. Eso nos da una ventaja que ninguna agencia nueva puede comprar: experiencia real en cada etapa del ecosistema. Aportamos valor antes de cobrar. Nuestro compromiso no termina en la entrega — empieza ahí.

---

## 02. Datos de empresa

| Campo | Valor |
|---|---|
| Nombre | Project 4 |
| Tipo | Agencia digital |
| Sede | Chihuahua, Chihuahua, México |
| Presencia | 12 países |
| Años operando | 8+ |
| Proyectos entregados | 120+ |
| Redes | Instagram · LinkedIn · Behance |

---

## 03. Servicios

### 01 — IA & Automatización
Flujos que trabajan 24 horas. IA implementada para el sector del cliente: CRMs, chatbots, reportes automáticos y pipelines inteligentes que multiplican el equipo sin multiplicar la nómina.

### 02 — Meta Ads & Marketing
Campañas con creativos de alta costura. Gestión completa de redes sociales, contenido y video que para el scroll. ROAS medido, presupuesto sin desperdicios.

### 03 — Branding & Identidad
Logo, sistema tipográfico, paleta, voz de marca y package design que se vende solo en el anaquel. Una identidad que diferencia antes de que el cliente lea una sola palabra.

### 04 — Desarrollo Web
Portales, e-commerce, reservas, pagos y recordatorios automáticos. Infraestructura digital que vende mientras duermes. Código limpio, velocidad máxima, SEO desde el día uno.

**Servicios adicionales:** Creación de contenido · Fotografía & video · Gestión de redes · Package design · Rescate de proyectos

---

## 04. Valores de marca

1. **Honestidad** — Decimos lo que es, no lo que el cliente quiere escuchar.
2. **Confianza** — Compromisos que se cumplen, siempre.
3. **Responsabilidad** — Dueños del resultado, no solo del proceso.
4. **Cercanía** — Trato humano, sin burocracia ni intermediarios.
5. **Innovación** — Primeros en adoptar lo que funciona, críticos con lo que no.

---

## 05. Metodología de trabajo

```
Entender → Estrategia → Activar → Crecer
```

| Fase | Descripción |
|---|---|
| **Entender** | Escuchamos. No asumimos. Mapeamos el negocio desde adentro. |
| **Estrategia** | Diseñamos la solución exacta. Cada decisión tiene ROI medible. |
| **Activar** | Sprints visibles. El cliente ve el progreso cada semana. Sin sorpresas. |
| **Crecer** | Mejora continua. Somos el equipo digital permanente. |

---

## 06. Identidad visual

### Paleta de colores

| Nombre | Hex | Uso |
|---|---|---|
| **Red** | `#ff3131` | Acento primario, CTAs, énfasis, cifras estadísticas |
| **Navy** | `#1a3446` | Acento secundario, profundidad, fondos de superficie |
| **Green** | `#113c41` | Acento terciario, nodos de proceso, contraste |
| **Background** | `#08090b` | Fondo base del sitio |
| **Background 2** | `#0d1014` | Superficies secundarias |
| **White** | `#f0ece4` | Texto principal (blanco cálido, no puro) |
| **Gray text** | `rgba(240,236,228,.42)` | Texto secundario, etiquetas, metadatos |

**Nota de uso:** El rojo (#ff3131) es el único color de alta saturación. Los demás actúan como soporte. El fondo oscuro (#08090b) no es negro puro — es un negro con temperatura azul-verde.

### Tipografía

| Familia | Tipo | Uso |
|---|---|---|
| **Horizon Regular** (weight 400) | Display | Títulos grandes, números hero, énfasis de marca |
| **Horizon Outlined** (weight 300) | Display | Subtítulos, etiquetas grandes en outline, contraste ligero |
| **Space Grotesk** | Body | Texto de cuerpo, párrafos, navegación, UI |
| **Space Mono** | Mono | Etiquetas técnicas, porcentajes, datos numéricos pequeños |

### Sistema tipográfico hero

La identidad tipográfica clave del sitio es el contraste extremo entre dos elementos:

```
"PROJECT"  →  Horizon Outlined · pequeño · transparente · solo stroke
"4"        →  Horizon Regular  · masivo  · blanco sólido · marca visual
```

- `PROJECT`: `font-size: clamp(18px, 3.4vw, 56px)` · `font-weight: 300` · `color: transparent` · `-webkit-text-stroke: 1px rgba(240,236,228,.6)`
- `4`: `font-size: clamp(160px, 28vw, 380px)` · `font-weight: 400` · `color: var(--white)`

Este contraste de escala (~1:10) es la marca visual más importante del sitio.

### Texturas y efectos visuales

- **Grain overlay:** Textura de grano de película sobre todo el sitio (opacity: 2.8%), animada en 8 pasos para simular película analógica.
- **Gradientes de transición:** Cada sección tiene un gradiente superior `linear-gradient(to bottom, #08090b, transparent)` que hace que el scroll fluya como una película continua, no como páginas separadas.
- **Cursor personalizado:** Punto central + anillo rojo animado (solo desktop). En hover sobre elementos interactivos el anillo crece y se vuelve rojo pleno.

---

## 07. Sistema de animación

El sitio usa **GSAP 3.12.5** como motor de animación. La filosofía es cinematográfica: cada sección es una escena independiente que conecta con la anterior como en una película.

### Principios de animación

1. **Físicas reales:** Las entradas no son fade-in simples. Usan `back.out`, `power2.inOut`, `elastic`. Los objetos "pesados" entran lento, los ligeros rápido.
2. **Jerarquía de entrada:** Primero el elemento principal (ícono/número), luego el título, luego el cuerpo de texto. Nunca al revés.
3. **Silencio estratégico:** No todo se anima al mismo tiempo. El timing deliberado crea impacto.

### Animación de íconos (zoom-bomb)

La animación signature de los íconos de proceso:

```
Estado inicial:  scale(0)    rotate(-24°)  — comprimido, torcido
Paso 1:          scale(1.35) rotate(7°)    — sobrepasa, rebota
Paso 2:          scale(1)    rotate(0°)    — snaps into focus
```

Después del snap, aparece el texto encima. El ícono continúa con un respiro CSS (pulse suave infinito).

### Entrada del hero

```
0.0s  — Video: desenfoque → foco
0.95s — Eyebrow: fade + slide up
1.15s — "PROJECT": chars por char, desde abajo, con rotación
1.30s — "4": blur + scale desde pequeño → overshoot → snap
1.78s — Línea de acento: wipe horizontal
2.0s  — Subtítulo: fade + slide
2.18s — CTAs: fade + slide
2.55s — Scroll indicator: fade
```

### Reveal de secciones

Cada sección tiene un `ScrollTrigger` propio con `once: true`. El patrón:
- Títulos de sección: `clipPath: 'inset(105% 0 -5% 0)'` → `inset(0% 0 -5% 0)` (cortina que sube)
- Estadísticas: escala elástica `back.out(2.4)` + glow rojo al terminar de contar
- Cards: entrada desde `scale(0.9) blur(16px)` → `scale(1) blur(0)` con `back.out(1.2)`
- Globo terráqueo: `scale(0.28) blur(24px)` → pulso → snap `back.out(1.4)`

---

## 08. Portafolio de clientes

| Proyecto | Sector | Año | URL |
|---|---|---|---|
| Algoritso | SaaS · Tecnología | 2024 | algoritso.com |
| Hot Yoga CUU | Wellness · Reservas | 2024 | hotyogacuu.com.mx |
| Reinventa | Consultoría · Educación | 2023 | reinventacapacitacion.com.mx |
| Herrcava | Constructora · Corporativo | 2023 | — |
| Gallery 2020 | Arte · Galería | 2022 | gallery2020mx.netlify.app |

**Casos de referencia global** (marcas que demuestran el poder de lo digital):
- **Bitso** (México) — Procesando $1B+ USD/año sin sucursales físicas
- **Gymshark** (UK) — De garage a marca global de fitness
- **Nude Project** (España) — Comunidad-first, marca premium desde redes

---

## 09. Tono de voz

### Características
- **Directo:** Sin rodeos. La primera oración ya dice el punto.
- **Confiado sin arrogancia:** Sabe lo que vale, pero no alardea en exceso.
- **Técnico pero humano:** Usa términos del sector (ROAS, pipeline, sprint) pero siempre los contextualiza.
- **Con actitud:** Frases como "Sin excusas" o "Desde adentro" muestran carácter.

### Ejemplos de voz correcta
> "No somos recién llegados."
> "ROI real. Sin excusas."
> "Somos la agencia que no desaparece después del pago."
> "Código limpio, velocidad máxima, SEO desde el día uno."

### Evitar
- Hipérboles vacías ("los mejores del mundo", "revolucionarios")
- Jerga corporativa genérica ("sinergia", "soluciones 360°")
- Humildad falsa o tonos suplicantes

---

## 10. Stack técnico del sitio

```
HTML5 + CSS3 + Vanilla JS
GSAP 3.12.5 (ScrollTrigger, CustomEase)
Space Grotesk + Space Mono (Google Fonts)
Horizon Regular / Outlined (OTF locales)
Cloudinary (video hosting)
```

**Hosting:** GitHub Pages — rama `gh-pages` del repositorio `justingc17/Project-4`
**URL:** `https://justingc17.github.io/Project-4/`

---

## 11. Navegación del sitio

```
01 — Nosotros     (#about)
02 — Servicios    (#services)
03 — Portafolio   (#portfolio)
04 — El Mundo     (#world)
05 — Metodología  (#methodology)
     Contacto     (#contact)
```

---

## 12. Referentes de diseño

Las siguientes agencias fueron analizadas como referencias para el nivel de calidad visual:

Wieden+Kennedy · Ogilvy · AKQA · R/GA · Droga5 · BBDO · McCann · TBWA · DDB · Saatchi & Saatchi · VML · Publicis · Havas · Media.Monks · Huge · DEPT · Instrument · Work & Co · Fantasy · Sid Lee

**Principios extraídos:**
- Una idea visual dominante por sección (Instrument, AKQA)
- Contraste tipográfico extremo como marca de identidad (Fantasy, Work & Co)
- Silencio estratégico: el espacio en blanco comunica premium (AKQA)
- Narrativa como película: las secciones conectan, no son islas (Droga5, R/GA)
- Texto que "respira": animaciones con física, no solo fade-in (todos)

---

*Documento generado desde el código fuente de `justingc17/Project-4` · Rama `claude/portfolio-website-design-fWc9l`*
