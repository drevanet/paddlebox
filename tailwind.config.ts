import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink:'#111827', violet:'#7557f6', mint:'#b9f5d0' }, boxShadow: { soft:'0 24px 70px rgba(17,24,39,.10)' } } }, plugins: [] } satisfies Config;
