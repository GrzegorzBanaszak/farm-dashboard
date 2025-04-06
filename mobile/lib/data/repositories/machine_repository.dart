import 'package:mobile/config/api_config.dart';
import 'package:mobile/services/http_service.dart';

class MachneRepository {
  final HttpService _httpService = HttpService();

  Future<Map<String, dynamic>> getMachines() async {
    try {
      final response = await _httpService.get(ApiConfig.allMachines);

      if (response.statusCode == 200) {
        return {
          'success': true,
          'machines': response.data,
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
}
