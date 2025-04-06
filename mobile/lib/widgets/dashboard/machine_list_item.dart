import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile/data/models/machine_model.dart';

class MachineListItem extends StatelessWidget {
  final MachineModel machine;
  final Function(MachineModel)? onEdit;
  final Function(MachineModel)? onDelete;
  final Function(MachineModel)? onTap;

  const MachineListItem({
    Key? key,
    required this.machine,
    this.onEdit,
    this.onDelete,
    this.onTap,
  }) : super(key: key);

  // Pomocnicza funkcja do uzyskania koloru na podstawie stanu maszyny
  Color _getConditionColor() {
    switch (machine.condition.toLowerCase()) {
      case 'excellent':
      case 'doskonały':
        return Colors.green;
      case 'good':
      case 'dobry':
        return Colors.lightGreen;
      case 'fair':
      case 'średni':
        return Colors.orange;
      case 'poor':
      case 'zły':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  // Pomocnicza funkcja do tłumaczenia stanu maszyny (opcjonalnie)
  String _getLocalizedCondition() {
    return machine.condition;
    // Tutaj możesz dodać tłumaczenia stanów maszyn jeśli potrzebujesz
  }

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('dd.MM.yyyy');
    final formattedDate = dateFormat.format(machine.purchaseDate);

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      elevation: 3,
      child: InkWell(
        onTap: onTap != null ? () => onTap!(machine) : null,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      machine.name,
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, fontSize: 18),
                    ),
                  ),
                  PopupMenuButton<String>(
                    onSelected: (value) {
                      if (value == 'edit' && onEdit != null) {
                        onEdit!(machine);
                      } else if (value == 'delete' && onDelete != null) {
                        onDelete!(machine);
                      }
                    },
                    itemBuilder: (context) => [
                      const PopupMenuItem(
                        value: 'edit',
                        child: Row(
                          children: [
                            Icon(Icons.edit, color: Colors.blue),
                            SizedBox(width: 8),
                            Text('Edytuj'),
                          ],
                        ),
                      ),
                      const PopupMenuItem(
                        value: 'delete',
                        child: Row(
                          children: [
                            Icon(Icons.delete, color: Colors.red),
                            SizedBox(width: 8),
                            Text('Usuń'),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.category, size: 16, color: Colors.grey),
                  const SizedBox(width: 4),
                  Text('Typ: ${machine.type}'),
                ],
              ),
              const SizedBox(height: 4),
              Row(
                children: [
                  const Icon(Icons.calendar_today,
                      size: 16, color: Colors.grey),
                  const SizedBox(width: 4),
                  Text('Data zakupu: $formattedDate'),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Text('Stan: '),
                  const SizedBox(width: 4),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: _getConditionColor(),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      _getLocalizedCondition(),
                      style: const TextStyle(color: Colors.white),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
