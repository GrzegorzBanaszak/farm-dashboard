import 'package:flutter/material.dart';
import 'package:mobile/data/repositories/auth_repository.dart';
import 'package:mobile/data/models/user_model.dart';
import 'package:mobile/services/http_service.dart';

class AuthProvider with ChangeNotifier {
  final AuthRepository _authRepository = AuthRepository();

  bool _isAuthenticated = false;
  bool _isLoading = true;
  String? _email;
  UserModel? _user;

  bool get isAuthenticated => _isAuthenticated;
  bool get isLoading => _isLoading;
  String? get email => _email;
  UserModel? get user => _user;

  AuthProvider() {
    checkLoginStatus();
  }

  Future<void> checkLoginStatus() async {
    try {
      final httpService = HttpService();
      await httpService.init();
      final response = await _authRepository.getProfile();

      if (response['success']) {
        _user = response['user'];
        _isAuthenticated = true;
      } else {
        // await logout();
      }
    } catch (e) {
      await logout();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<Map<String, dynamic>> login(String email, String password) async {
    final result = await _authRepository.login(email, password);

    if (result['success']) {
      _email = result['email'];
      _isAuthenticated = true;
      notifyListeners();
    }

    return result;
  }

  Future<Map<String, dynamic>> register(
      String username, String email, String password) async {
    return await _authRepository.register(email, password);
  }

  Future<void> logout() async {
    await _authRepository.logout();
    _isAuthenticated = false;
    _email = null;
    _user = null;
    notifyListeners();
  }
}
