import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gmail.thaiendevs',
  appName: 'Schedulist',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    "SplashScreen": {
      "androidScaleType": "CENTER_CROP",
      "splashFullScreen": true,
      "splashImmersive": false,
      "backgroundColor": "#ffffff" ,
      "launchShowDuration": 3000
  }
}
  
};

export default config;
