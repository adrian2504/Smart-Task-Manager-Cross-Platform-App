// src/config/api.ts
import { Platform } from 'react-native';

let HOST: string;

// 1) Running in a browser (expo web or React Native for Web)
if (Platform.OS === 'web') {
  HOST = "http://localhost:5005";
}
// 2) Running on iOS simulator
else if (Platform.OS === 'ios') {
  HOST = "http://localhost:5005";
}
// 3) Running on Android emulator (Android Studio AVD)
//    10.0.2.2 maps to your host machine’s localhost:5005
else if (Platform.OS === 'android') {
  HOST = "http://10.0.2.2:5005";
}
// (If you ever run on a real Android device, replace "10.0.2.2" with your laptop’s LAN IP, e.g. "http://192.168.1.42:5005")
else {
  HOST = "http://localhost:5005";
}

export default HOST + "/api";
