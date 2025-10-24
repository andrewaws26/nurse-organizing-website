/* Tailwind CDN configuration for the Louisville briefing site. */
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif']
            },
            colors: {
                brand: {
                    DEFAULT: '#0F766E',
                    light: '#5EEAD4',
                    dark: '#134E4A'
                },
                night: '#0F172A'
            },
            boxShadow: {
                glow: '0 25px 65px -20px rgba(94, 234, 212, 0.35)'
            },
            backgroundImage: {
                'grid-dots': 'radial-gradient(circle at center, rgba(148, 163, 184, 0.35) 1px, transparent 0)'
            }
        }
    }
};
