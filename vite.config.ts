import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {readFileSync} from 'node:fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const brand = JSON.parse(readFileSync(new URL('./brand.json', import.meta.url), 'utf8'));
  const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]!));
  return {
    plugins: [react(), tailwindcss(), {
      name: 'brand-metadata',
      transformIndexHtml(html: string) {
        return html.replaceAll('%BRAND_NAME%', escapeHtml(brand.name)).replaceAll('%BRAND_DESCRIPTION%', escapeHtml(`Discover ${brand.name} in ${brand.location}. ${brand.description}`));
      },
    }],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
