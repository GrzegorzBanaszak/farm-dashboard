import 'dart:io' show Platform;

class ApiConfig {
  static String get baseUrl {
    if (Platform.isAndroid) {
      // Dla emulatora Android
      return 'http://10.0.2.2:3000';
    } else if (Platform.isIOS) {
      // Dla symulatora iOS
      return 'http://localhost:3000';
    } else {
      return 'http://localhost:3000';
    }
  }

  // Auth endpoints
  static String get login => '$baseUrl/auth/login';
  static String get register => '$baseUrl/auth/register';
  static String get profile => '$baseUrl/user/profile';
  static String get logout => '$baseUrl/auth/logout';
}
