# Louisville Nurse Organizing Brief

An interactive, mobile-first briefing that chronicles Louisville's decades of nurse union organizing, highlights lessons from past drives, and equips new campaigns with a practical roadmap.

## Quick Start

```bash
# Launch a simple static server (choose any tool you like)
npx serve .
# or
python3 -m http.server
```

Open `http://localhost:5000` (or whatever port your server reports) to explore the site.

## Project Structure

```
.
|-- index.html               # Primary page layout and content
|-- assets/
|   |-- css/
|   |   `-- main.css         # Custom styles layered over Tailwind CDN utilities
|   `-- js/
|       |-- tailwind-config.js # Tailwind CDN configuration (colors, shadows, fonts)
|       `-- app.js           # Interactive behavior (timeline, chart, accordion, etc.)
`-- README.md
```

## Editing Notes

- All custom Tailwind theming lives in `assets/js/tailwind-config.js`. Update this file to adjust the Tailwind palette or enabled utilities.
- `assets/js/app.js` wraps all dynamic behavior in small, focused functions (e.g., `initTimeline`, `initAnalysis`) so you can extend features without touching `index.html`.
- Keep custom styles in `assets/css/main.css` to avoid scattering overrides inside the markup.
- The site relies on CDN versions of Tailwind and Chart.js. If you plan to work offline or add a build step, replace those with locally bundled assets.

## Contributing

1. Fork or branch from `main`.
2. Make your changes.
3. Preview locally before opening a pull request.

Thanks for helping Louisville nurses organize for safe staffing and fair workplaces.
