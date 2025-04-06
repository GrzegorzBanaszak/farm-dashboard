import 'package:dio/dio.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

class HttpService {
  static final HttpService _instance = HttpService._internal();
  final Dio dio = Dio();
  late PersistCookieJar cookieJar;

  factory HttpService() {
    return _instance;
  }

  // Inicjalizacja serwisu
  Future<void> init() async {
    // Pobierz ścieżkę do przechowywania plików aplikacji
    final Directory appDocDir = await getApplicationDocumentsDirectory();
    final String appDocPath = appDocDir.path;

    // Utwórz katalog na ciasteczka, jeśli nie istnieje
    final cookiesPath = Directory('$appDocPath/.cookies');
    if (!cookiesPath.existsSync()) {
      cookiesPath.createSync(recursive: true);
    }

    // Inicjalizacja persistent cookie jar z określonym katalogiem
    cookieJar = PersistCookieJar(
      storage: FileStorage(cookiesPath.path),
      ignoreExpires:
          false, // Domyślnie false, ustawia czy ignorować datę wygaśnięcia ciasteczek
    );

    // Dodaj interceptor do zarządzania ciasteczkami
    dio.interceptors.add(CookieManager(cookieJar));

    // Dodaj konfigurację Dio do debugowania
    dio.interceptors.add(LogInterceptor(
      request: true,
      requestHeader: true,
      requestBody: true,
      responseHeader: true,
      responseBody: true,
      error: true,
    ));

    // Konfiguracja domyślna dla requestów
    dio.options.validateStatus = (status) {
      return status! < 500;
    };
    dio.options.followRedirects = false;
    dio.options.contentType = Headers.jsonContentType;
  }

  HttpService._internal();

  // Metoda do wykonywania requestów GET
  Future<Response> get(String url,
      {Map<String, dynamic>? queryParameters, Options? options}) {
    Options requestOptions = options ?? Options(extra: {});

    requestOptions.extra = requestOptions.extra ?? {};
    requestOptions.extra!['withCredentials'] = true;
    return dio.get(
      url,
      queryParameters: queryParameters,
      options: requestOptions,
    );
  }

  // Metoda do wykonywania requestów POST
  Future<Response> post(String url,
      {dynamic data,
      Map<String, dynamic>? queryParameters,
      Options? options}) async {
    Options requestOptions = options ?? Options(extra: {});

    requestOptions.extra = requestOptions.extra ?? {};
    requestOptions.extra!['withCredentials'] = true;
    return dio.post(
      url,
      data: data,
      queryParameters: queryParameters,
      options: requestOptions,
    );
  }

  // Metoda do wykonywania requestów PUT
  Future<Response> put(String url,
      {dynamic data, Map<String, dynamic>? queryParameters, Options? options}) {
    Options requestOptions = options ?? Options(extra: {});

    requestOptions.extra = requestOptions.extra ?? {};
    requestOptions.extra!['withCredentials'] = true;
    return dio.put(
      url,
      data: data,
      queryParameters: queryParameters,
      options: requestOptions,
    );
  }

  // Metoda do wykonywania requestów DELETE
  Future<Response> delete(String url,
      {dynamic data, Map<String, dynamic>? queryParameters, Options? options}) {
    Options requestOptions = options ?? Options(extra: {});

    requestOptions.extra = requestOptions.extra ?? {};
    requestOptions.extra!['withCredentials'] = true;
    return dio.delete(
      url,
      data: data,
      queryParameters: queryParameters,
      options: options,
    );
  }

  // Metoda do czyszczenia wszystkich ciasteczek
  Future<void> clearCookies() async {
    await cookieJar.deleteAll();
  }

  // Metoda do czyszczenia ciasteczek dla konkretnego URL
  Future<void> clearCookiesForUrl(Uri url) async {
    await cookieJar.delete(url);
  }

  Future<List<Cookie>> getCookiesForUrl(Uri url) async {
    return await cookieJar.loadForRequest(url);
  }
}
