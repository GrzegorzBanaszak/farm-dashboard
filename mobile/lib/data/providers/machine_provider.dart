import 'package:flutter/material.dart';
import 'package:mobile/data/models/machine_model.dart';
import 'package:mobile/data/repositories/machine_repository.dart';

class MachineProvider with ChangeNotifier {
  final MachneRepository _machineRepository = MachneRepository();
  List<MachineModel> _machines = [];
  bool _isLoading = false;

  List<MachineModel> get machines => _machines;
  bool get isLoading => _isLoading;
  Future<void> getMachines() async {
    try {
      _isLoading = true;
      final result = await _machineRepository.getMachines();

      if (result['success']) {
        List<MachineModel> machines = List<MachineModel>.from(
            result['machines'].map((json) => MachineModel.fromJson(json)));
        _machines = machines;

        _isLoading = false;
      }
    } catch (e) {
      print(e);
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
