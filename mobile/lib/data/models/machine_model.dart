class MachineModel {
  final String id;
  final String name;
  final String type;
  final DateTime purchaseDate;
  final String condition;

  MachineModel({
    required this.id,
    required this.name,
    required this.type,
    required this.purchaseDate,
    required this.condition,
  });

  factory MachineModel.fromJson(Map<String, dynamic> json) {
    // Konwersja warunku - przykład obsługi różnych formatów
    String normalizedCondition = json['condition'];

    // Jeśli warunek jest zapisany wielkimi literami, możesz go przekształcić
    if (normalizedCondition == normalizedCondition.toUpperCase()) {
      // Konwersja np. "POOR" na "Poor" lub "poor"
      normalizedCondition = normalizedCondition.substring(0, 1) +
          normalizedCondition.substring(1).toLowerCase();
    }

    return MachineModel(
      id: json['id'],
      name: json['name'],
      type: json['type'],
      purchaseDate: DateTime.parse(json['purchaseDate']),
      condition: normalizedCondition,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'type': type,
      'purchaseDate': purchaseDate.toIso8601String(),
      'condition': condition,
    };
  }
}
