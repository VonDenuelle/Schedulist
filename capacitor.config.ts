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
  },
  // "LocalNotifications": {
  //   "smallIcon": "ic_stat_ssss",
  //   "iconColor": "#05575F",
  //   "sound" : 'samsung_over_the_horizon.wav'
  // }

}
  
};

export default config;
