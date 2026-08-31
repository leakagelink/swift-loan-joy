import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.businessstandard.loan",
  appName: "Business Standard Loan",
  // TanStack Start is an SSR app, so the native shell loads the deployed web app.
  // Vite/Nitro output folder (NOT "dist") — required so `cap sync` can copy assets.
  webDir: ".output/public",
  server: {
    url: "https://swift-loan-joy.lovable.app",
    cleartext: false,
    androidScheme: "https",
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
