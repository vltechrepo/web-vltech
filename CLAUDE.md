# VLTECH — Sitio Web Corporativo

Web corporativa de VLTECH, empresa de desarrollo tecnológico con sede en México.
Publicada en **GitHub Pages** con dominio personalizado **vltech.mx** (ya activo).

---

## Stack

| Tecnología | Versión | Nota |
|---|---|---|
| React | 19 | |
| Vite | 8 | `strictPort: true` → siempre corre en **5173** |
| TypeScript | 6 | |
| Tailwind CSS | v4 | Plugin `@tailwindcss/vite`, sin PostCSS |
| Motion | v12 | Importar desde `motion/react` (NO desde `framer-motion`) |
| react-i18next | 17 | Bilingüe ES/EN, default ES |
| lucide-react | v1 | Iconos de redes sociales no existen en v1 — usar SVG inline |
| gh-pages | 6 | Deploy: `npm run deploy` |

---

## Comandos

```bash
npm run dev       # servidor en localhost:5173 (siempre ese puerto)
npm run build     # tsc + vite build
npm run deploy    # build + sube a GitHub Pages (rama gh-pages)
```

---

## Estructura de archivos

```
web-vltech/
├── public/
│   ├── CNAME          # vltech.mx — NO tocar
│   ├── 404.html       # SPA redirect para GitHub Pages
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.tsx                          # ensamblado principal (sin router)
│   ├── main.tsx                         # punto de entrada
│   ├── index.css                        # design system
│   ├── i18n/
│   │   ├── index.ts                     # init i18next
│   │   └── locales/
│   │       ├── es.ts                    # traducción española (default)
│   │       └── en.ts                    # traducción inglesa
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx               # fixed, blur on scroll, lang toggle, mobile drawer
│   │   │   └── Footer.tsx               # dark (#0f172a), social links SVG inline
│   │   ├── sections/
│   │   │   ├── Hero.tsx                 # fullscreen, InfiniteGrid bg, gradient headline
│   │   │   ├── Services.tsx             # 6 cards, grid auto-fill, hover glow
│   │   │   ├── Stats.tsx                # 4 contadores animados (IntersectionObserver)
│   │   │   └── Contact.tsx              # split layout info + form (Formspree)
│   │   └── ui/
│   │       ├── Logo.tsx                 # SVG inline, prop `dark` para footer
│   │       ├── InfiniteGrid.tsx         # grid scrolling + flashlight hover (usado en Hero)
│   │       └── GlassCard.tsx            # wrapper con hover effect (poco usado)
├── vite.config.ts     # base:'/', alias @/→src/, port:5173 strictPort
├── tsconfig.app.json  # paths: @/* → ./src/*
└── package.json       # homepage: https://vltech.mx
```

---

## Design System

**Tema:** Light (blanco/gris claro), footer oscuro.

```
Fondo:        #ffffff
Superficie:   #f8fafc  (secciones alternas)
Card:         #ffffff  con border #e2e8f0 y shadow sutil
Texto:        #0f172a
Muted:        #64748b
Violet:       #7c3aed
Blue:         #0ea5e9
Gradiente:    linear-gradient(135deg, #7c3aed, #0ea5e9)
Footer bg:    #0f172a
```

**Tipografía:**
- Headings: `Space Grotesk` 600–700 (Google Fonts)
- Body: `Inter` 400–600 (Google Fonts)

**Logo:** SVG inline. `VL` en `#0f172a`, `TECH` en gradiente. Prop `dark={true}` invierte el texto a `#f1f5f9` (usado en Footer).

**Clases CSS globales** (en `index.css`):
- `.section-card` — card blanca con border y shadow
- `.section-title` — `clamp(1.75rem, 4vw, 2.5rem)`, Space Grotesk 700
- `.section-copy` — 15px, color muted
- `.eyebrow` — badge pill violeta uppercase
- `.gradient-text` — `@utility` Tailwind v4, texto violeta→azul
- `.orb-a`, `.orb-b` — animaciones CSS para blobs del Hero
- `.arrow-bounce` — rebote del scroll indicator

---

## Regla CRÍTICA de CSS

**Todo CSS propio escrito DESPUÉS de `@import "tailwindcss"` sin `@layer` tiene prioridad sobre las utilities de Tailwind** (CSS sin layer > `@layer utilities`). Por eso:
- Los resets (`box-sizing`, body, etc.) van dentro de `@layer base { }`
- **Los paddings y spacing de sección se hacen con `style={{ padding: '80px 24px' }}`** (inline styles), nunca con clases Tailwind como `py-20 px-6` — garantiza que no sean anulados

---

## Secciones — patrones de layout

Cada sección usa este patrón (inline styles para padding garantizado):

```tsx
<section id="seccion" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
  <div style={{ maxWidth: 1152, margin: '0 auto', padding: '80px 24px' }}>
    {/* contenido */}
  </div>
</section>
```

Los grids usan `display: 'grid'` con `gridTemplateColumns` inline (no clases Tailwind):
```tsx
style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 20 }}
```

---

## Internacionalización

- Idioma default: `es`
- Detector: localStorage → navigator
- Switch: botón ES/EN en Navbar
- Todas las traducciones en `src/i18n/locales/es.ts` y `en.ts`
- En componentes: `const { t } = useTranslation()`
- Arrays: `t('services.items', { returnObjects: true })`

---

## Formulario de contacto

`src/components/sections/Contact.tsx` usa **Formspree**.
El ID actual es `YOUR_FORM_ID` (placeholder) — reemplazar con el ID real de formspree.io.

```tsx
fetch('https://formspree.io/f/YOUR_FORM_ID', ...)
```

---

## GitHub Pages / Deploy

- `public/CNAME` contiene `vltech.mx` — no eliminar ni modificar
- `vite.config.ts` tiene `base: '/'` (necesario para dominio personalizado)
- `public/404.html` guarda el path en `sessionStorage` y redirige a `/` (workaround para SPA en GH Pages)
- Deploy: `npm run deploy` → ejecuta build y sube la carpeta `dist/` a la rama `gh-pages`

---

## Páginas legales (apps)

Las políticas de privacidad de las apps de VLTECH se sirven como **HTML estático** en `public/legal/`. GitHub Pages los sirve directamente, sin pasar por React.

```
public/
└── legal/
    └── privacidad/
        └── scancodi-qr-scanner.html   → vltech.mx/legal/privacidad/scancodi-qr-scanner.html
```

**Regla:** No agregar links a estas páginas desde la web principal. Los links se exponen dentro de las apps y en las fichas de las tiendas (Play Store, App Store).

**Apps actuales:**
- `ScanCodi — QR Scanner` (Android)

---

## Servicios que ofrece VLTECH

1. Desarrollo a la Medida
2. Apps Móviles & Web
3. Soluciones Tecnológicas
4. Automatización de Procesos
5. Páginas Web
6. E-commerce
