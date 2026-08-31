import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.businessstandard.loan",
  appName: "Business Standard Loan",
  // TanStack Start is an SSR app, so the native shell loads the deployed web app.
  webDir: "dist",
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
