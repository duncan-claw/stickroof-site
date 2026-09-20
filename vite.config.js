import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
// Fail a production build when the Postie key is absent so a missing
// VITE_POSTIE_API_KEY secret can never silently ship a disabled form.
// Preview/local builds (no STICKROOF_PRODUCTION) are intentionally allowed
// to run keyless and keep the form visibly disabled.
const production = process.env.STICKROOF_PRODUCTION === '1';
export default defineConfig(({mode}) => {
  if (production) {
    const env = loadEnv(mode, process.cwd(), '');
    if (!env.VITE_POSTIE_API_KEY) {
      throw new Error('VITE_POSTIE_API_KEY is required for a production build (set env VITE_POSTIE_API_KEY or a .env.local).');
    }
  }
  return {plugins:[react(),tailwind()],base:'/',appType:'mpa'};
});
