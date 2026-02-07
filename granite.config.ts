import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'tarot-pick',
  web: {
    host: '0.0.0.0',
    port: 3012,
    commands: {
      dev: 'rsbuild dev --host',
      build: 'rsbuild build',
    },
  },
  permissions: [],
  outdir: 'dist',
  brand: {
    displayName: '타로 한 장',
    icon: 'https://raw.githubusercontent.com/jino123413/app-logos/master/tarot-pick.png',
    primaryColor: '#6A1B4D',
    bridgeColorMode: 'inverted',
  },
  webViewProps: {
    type: 'partner',
  },
});
