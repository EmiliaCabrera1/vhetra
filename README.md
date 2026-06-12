# Vhetra

Sitio web del estudio **Vhetra**: diseño web, identidad visual y presencia digital. Es una landing de una sola página con secciones a pantalla completa, animaciones editoriales y soporte bilingüe (español / inglés).

Producción: [vhetra.com.ar](https://vhetra.com.ar)

## Características

- **Landing multipanel** con navegación por secciones: inicio, servicios, proyectos, filosofía y contacto
- **Scroll controlado** (`SectionScrollController`): scroll interno dentro de cada sección y salto animado entre paneles (rueda, touch, teclado y navbar)
- **Internacionalización** con `next-intl` (`/es`, `/en`)
- **Modelo 3D** en el hero (React Three Fiber + GLB exportado desde Blender)
- **Carrusel de proyectos** con loop infinito y modales de detalle
- **Tarjeta de contacto** en ruta dedicada (`/tarjeta`)
- **Integración WhatsApp** configurable por variable de entorno
- **Analytics** (Vercel Analytics + Speed Insights)

## Stack

| Área        | Tecnología                        |
| ----------- | --------------------------------- |
| Framework   | Next.js 16 (App Router)           |
| UI          | React 19, Tailwind CSS 4          |
| Animaciones | Framer Motion                     |
| 3D          | Three.js, React Three Fiber, Drei |
| i18n        | next-intl                         |
| Deploy      | Vercel                            |

## Estructura del proyecto

```
app/
├── [locale]/
│   ├── (main)/page.tsx      # Landing principal
│   └── (tarjeta)/tarjeta/   # Página tarjeta de contacto
├── components/
│   ├── SectionScrollController.tsx  # Lógica de scroll entre secciones
│   ├── sections/                    # Hero, Servicios, Proyectos, etc.
│   └── ...
├── utils/scrollToSection.ts         # Helper para navegación programática
└── globals.css                      # Estilos globales y snap panels

i18n/                    # Routing y navegación localizada
messages/es.json         # Traducciones español
messages/en.json         # Traducciones inglés
public/                  # Imágenes, fuentes, animaciones GLB, íconos
```

## Requisitos

- Node.js 20+
- pnpm (recomendado) o npm

## Instalación

```bash
pnpm install
cp .env.example .env.local
```

Editá `.env.local` y configurá el teléfono de WhatsApp en formato E.164:

```env
NEXT_PUBLIC_WHATSAPP_PHONE=5493875038714
```

## Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo en [http://localhost:3000](http://localhost:3000) |
| `pnpm build` | Build de producción |
| `pnpm start` | Servidor de producción |
| `pnpm lint` | ESLint |
| `pnpm build:analyze` | Build con análisis de bundle |
| `pnpm optimize:projects` | Optimiza imágenes del portfolio |

## Navegación entre secciones

La navbar y los CTAs usan `scrollToSectionStart()` (`app/utils/scrollToSection.ts`), que dispara el evento `vhetra:section-navigate` en el contenedor `.snap-page`. `SectionScrollController` escucha ese evento y ejecuta la transición animada hacia la sección indicada.

Cada sección usa la clase `snap-panel` y ocupa el alto del viewport (`100dvh`).

## Rutas

| Ruta          | Descripción                             |
| ------------- | --------------------------------------- |
| `/es`         | Landing en español (locale por defecto) |
| `/en`         | Landing en inglés                       |
| `/es/tarjeta` | Tarjeta de contacto                     |

## Deploy

El proyecto está pensado para Vercel. El build usa webpack (`next build --webpack`) por compatibilidad con dependencias 3D.

Variables de entorno necesarias en producción:

- `NEXT_PUBLIC_WHATSAPP_PHONE`

## Licencia

Proyecto privado de Vhetra.
