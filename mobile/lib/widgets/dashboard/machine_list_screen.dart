import 'package:flutter/material.dart';
import 'package:mobile/data/models/machine_model.dart';
import 'machine_list_item.dart';

class MachineListScreen extends StatelessWidget {
  // Lista maszyn do wyświetlenia
  final List<MachineModel> machines;

  // Opcjonalna funkcja callback wywoływana po dodaniu nowej maszyny
  final Function()? onAddMachine;

  // Konstruktor
  const MachineListScreen({
    Key? key,
    required this.machines,
    this.onAddMachine,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lista maszyn'),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {
              // Tutaj można dodać funkcjonalność filtrowania
            },
          ),
        ],
      ),
      body: machines.isEmpty
          ? const Center(
              child: Text('Brak maszyn do wyświetlenia'),
            )
          : ListView.builder(
              itemCount: machines.length,
              itemBuilder: (context, index) {
                return MachineListItem(
                  machine: machines[index],
                  onEdit: (machine) {
                    // Przekaż obsługę edycji do rodzica
                  },
                  onDelete: (machine) {
                    // Przekaż obsługę usuwania do rodzica
                  },
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: onAddMachine,
        tooltip: 'Dodaj maszynę',
        child: const Icon(Icons.add),
      ),
    );
  }
}
