import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3eee89c64cb14f5f9bf44fc0a144adda',
  appName: 'lucky-number-apk-roller',
  webDir: 'dist',
  server: {
    url: 'https://3eee89c6-4cb1-4f5f-9bf4-4fc0a144adda.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;