export const THEME = {
    colors: {
        background: {
            light: '#ffffff',
            dark: '#0a0a0a',
        },
        surface: {
            light: '#f9f9fb',
            dark: '#141414',
        },
        primary: {
            DEFAULT: '#0070f3',
            hover: '#0051ad',
        },
        secondary: {
            DEFAULT: '#666666',
            dark: '#a0a0a0',
        },
        border: {
            light: '#eaeaea',
            dark: '#222222',
        },
        accent: {
            purple: '#7928ca',
            blue: '#0070f3',
            orange: '#f5a623',
            pink: '#ff0080',
        },
    },
    spacing: {
        container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        section: 'py-12 md:py-20',
    },
    animations: {
        transition: { type: 'spring', damping: 20, stiffness: 100 },
        hover: { scale: 1.02, transition: { duration: 0.2 } },
        tap: { scale: 0.98 },
    },
    shadows: {
        subtle: '0 1px 2px rgba(0,0,0,0.05)',
        premium: '0 8px 30px rgba(0,0,0,0.12)',
    }
}
