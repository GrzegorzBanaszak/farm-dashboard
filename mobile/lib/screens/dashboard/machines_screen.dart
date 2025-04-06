import 'package:flutter/material.dart';
import 'package:mobile/data/models/machine_model.dart';
import 'package:mobile/data/providers/machine_provider.dart';
import 'package:mobile/widgets/dashboard/machine_list_screen.dart';
import 'package:provider/provider.dart';

class MachinesPage extends StatefulWidget {
  const MachinesPage({Key? key}) : super(key: key);

  @override
  State<MachinesPage> createState() => _MachinesPageState();
}

class _MachinesPageState extends State<MachinesPage> {
  // Lista maszyn - w prawdziwej aplikacji mogłaby być pobierana z API lub bazy danych
  List<MachineModel> _machines = [];

  @override
  void initState() {
    super.initState();
    _loadMachines();
  }

  Future<void> _loadMachines() async {
    Provider.of<MachineProvider>(context, listen: false).getMachines();
  }

  void _loadSampleData() {
    setState(() {
      _machines = [
        MachineModel(
          id: '1',
          name: 'Maszyna CNC Model X1',
          type: 'CNC',
          purchaseDate: DateTime(2023, 5, 12),
          condition: 'Excellent',
        ),
        MachineModel(
          id: '2',
          name: 'Prasa hydrauliczna P50',
          type: 'Hydraulic',
          purchaseDate: DateTime(2022, 3, 27),
          condition: 'Good',
        ),
        MachineModel(
          id: '3',
          name: 'Tokarka T-100',
          type: 'Lathe',
          purchaseDate: DateTime(2021, 7, 8),
          condition: 'Fair',
        ),
        MachineModel(
          id: '4',
          name: 'Robot przemysłowy RX-200',
          type: 'Robot',
          purchaseDate: DateTime(2024, 1, 15),
          condition: 'Excellent',
        ),
      ];
    });
  }

  // Metoda obsługująca dodawanie nowej maszyny
  void _handleAddMachine() {
    // Navigator.push(
    //   context,
    //   MaterialPageRoute(
    //     builder: (context) => MachineForm(
    //       onSave: (newMachine) {
    //         setState(() {
    //           _machines.add(newMachine);
    //         });
    //         Navigator.pop(context);
    //       },
    //       onCancel: () {
    //         Navigator.pop(context);
    //       },
    //     ),
    //   ),
    // );
  }

  // Metoda obsługująca edycję maszyny
  void _handleEditMachine(MachineModel machine) {
    // Navigator.push(
    //   context,
    //   MaterialPageRoute(
    //     builder: (context) => MachineForm(
    //       machine: machine,
    //       onSave: (updatedMachine) {
    //         setState(() {
    //           final index =
    //               _machines.indexWhere((m) => m.id == updatedMachine.id);
    //           if (index != -1) {
    //             _machines[index] = updatedMachine;
    //           }
    //         });
    //         Navigator.pop(context);
    //       },
    //       onCancel: () {
    //         Navigator.pop(context);
    //       },
    //     ),
    //   ),
    // );
  }

  // Metoda obsługująca usuwanie maszyny
  void _handleDeleteMachine(MachineModel machine) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Potwierdzenie'),
        content: Text('Czy na pewno chcesz usunąć maszynę ${machine.name}?'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('Anuluj'),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                _machines.removeWhere((m) => m.id == machine.id);
              });
              Navigator.pop(context);
            },
            child: const Text('Usuń'),
          ),
        ],
      ),
    );
  }

  // Metoda obsługująca wyświetlanie szczegółów maszyny
  void _handleViewMachineDetails(MachineModel machine) {
    // Navigator.push(
    //   context,
    //   MaterialPageRoute(
    //     builder: (context) => MachineDetailScreen(
    //       machine: machine,
    //       onEdit: _handleEditMachine,
    //       onDelete: _handleDeleteMachine,
    //     ),
    //   ),
    // );
  }

  @override
  Widget build(BuildContext context) {
    if (Provider.of<MachineProvider>(context, listen: true).isLoading) {
      return const Center(
        child: CircularProgressIndicator(),
      );
    }

    return MachineListScreen(
      machines: Provider.of<MachineProvider>(context).machines,
      onAddMachine: _handleAddMachine,
    );
  }
}
