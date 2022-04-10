# Schedulist
A mobile application based on Ionic Framework w/ Capacitor

Plugins used to work with Android

--> Native Android Plugins
npm install @capacitor/local-notifications
*npm install @capacitor/splash-screen
npm install @capacitor/dialog
npm install @capacitor/status-bar

--> Mobile Development Capacitor Plugin 
*npm install @capacitor/core
npm install @capacitor/cli --save-dev

--> Android Specific Plugin for Capacitor
*npm install @capacitor/android

--! Error: To sync android if error occurs upon running on android device or emulator
*ionic capacitor sync android

*** HOW TO RUN ***
First, Follow Steps in Link Below to setup android environment https://capacitorjs.com/docs/getting-started/environment-setup


**Running with Real Android Device -  Enable USB Debugging on your phone First**

1). npx cap open android - Type in vscode while your project is open, or in cmd under project root path
2). npx cap run android - The command will prompt you to select a target



