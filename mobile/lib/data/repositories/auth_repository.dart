import 'package:mobile/services/http_service.dart';
import 'package:mobile/config/api_config.dart';
import 'package:mobile/data/models/user_model.dart';
import 'package:mobile/core/constants/app_constants.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthRepository {
  final HttpService _httpService = HttpService();
  final FlutterSecureStorage _secureStorage = FlutterSecureStorage();

  // Rejestracja użytkownika
  Future<Map<String, dynamic>> register(String email, String password) async {
    try {
      final response = await _httpService.post(
        ApiConfig.register,
        data: {
          'email': email,
          'password': password,
        },
      );

      if (response.statusCode == 201) {
        return {'success': true};
      } else {
        return {
          'success': false,
          'message': response.data['message'] ?? AppConstants.registerError,
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': AppConstants.serverError,
      };
    }
  }

  // Logowanie użytkownika
  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await _httpService.post(
        ApiConfig.login,
        data: {
          'email': email,
          'password': password,
        },
      );

      if (response.statusCode == 200) {
        // Zapisujemy token w secure storage
        await _secureStorage.write(
            key: AppConstants.authTokenKey, value: 'jwt');

        return {
          'success': true,
          'email': response.data['email'],
        };
      } else {
        return {
          'success': false,
          'message': response.data['message'] ?? AppConstants.loginError,
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': AppConstants.serverError,
      };
    }
  }

  // Pobieranie profilu użytkownika
  Future<Map<String, dynamic>> getProfile() async {
    try {
      final response = await _httpService.get(ApiConfig.profile);

      if (response.statusCode == 200) {
        // final user = UserModel.fromJson(response.data);
        return {
          'success': true,
          'email': response.data['email'],
        };
      } else {
        return {
          'success': false,
        };
      }
    } catch (e) {
      return {
        'success': false,
      };
    }
  }

  // Wylogowanie użytkownika
  Future<void> logout() async {
    try {
      await _httpService.get(ApiConfig.logout);
      _httpService.clearCookies();
    } catch (e) {
      // Ignorujemy błędy przy wylogowywaniu
    }

    await _secureStorage.delete(key: AppConstants.authTokenKey);
  }

  // Sprawdzanie, czy token istnieje
  Future<bool> hasToken() async {
    final token = await _secureStorage.read(key: AppConstants.authTokenKey);
    return token != null;
  }
}
