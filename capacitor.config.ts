import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: `com.cargo.${process.env.APP_NAME}`,
  appName: process.env.APP_NAME || 'Cargo',
  webDir: './dist',
  bundledWebRuntime: false,
}

export default config
