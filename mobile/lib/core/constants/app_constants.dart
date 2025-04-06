class AppConstants {
  // Secure storage keys
  static const String authTokenKey = 'jwt';

  // Form validation messages
  static const String requiredField = 'To pole jest wymagane';
  static const String invalidEmail = 'Proszę podać prawidłowy email';
  static const String passwordTooShort = 'Hasło musi mieć co najmniej 6 znaków';
  static const String passwordsNotMatch = 'Hasła nie są identyczne';

  // Success messages
  static const String registerSuccess =
      'Rejestracja zakończona pomyślnie. Możesz się zalogować.';

  // Error messages
  static const String loginError = 'Błąd logowania';
  static const String registerError = 'Błąd rejestracji';
  static const String serverError = 'Błąd połączenia z serwerem';
}
