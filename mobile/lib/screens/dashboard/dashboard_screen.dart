import 'package:flutter/material.dart';
import 'package:mobile/core/routes/app_routes.dart';
import 'package:provider/provider.dart';
import 'package:mobile/data/providers/auth_provider.dart';
import 'package:fl_chart/fl_chart.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  late AuthProvider authProvider;
  int _selectedIndex = 0;
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    authProvider = Provider.of<AuthProvider>(context);
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    switch (index) {
      case 1:
        // Nawigacja do ekranu pól
        Navigator.pushNamed(context, AppRoutes.machine);
        break;
    }
  }

  // Dane farmera - normalnie pobieralibyśmy je z API/bazy danych
  final Map<String, dynamic> farmerData = {
    "machinesCount": 9,
    "animalsCount": 20,
    "thisYearYield": 4950,
    "plantedFieldsCount": 1,
    "animalsByType": {
      "INDYK": {"name": "INDYK", "count": 1},
      "KOZA": {"name": "KOZA", "count": 2},
      "KACZKA": {"name": "KACZKA", "count": 2},
      "KURA": {"name": "KURA", "count": 2},
      "KROWA": {"name": "KROWA", "count": 3},
      "KON": {"name": "KON", "count": 2},
      "OWCA": {"name": "OWCA", "count": 2},
      "OSIOL": {"name": "OSIOL", "count": 1},
      "SWINIA": {"name": "SWINIA", "count": 3},
      "KROLIK": {"name": "KROLIK", "count": 2}
    },
    "cropsByType": {
      "OWIES": {"name": "OWIES", "count": 1},
      "ZYTNO": {"name": "ZYTNO", "count": 1},
      "PSZENICA": {"name": "PSZENICA", "count": 2},
      "ZIEMNIAK": {"name": "ZIEMNIAK", "count": 3}
    }
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await authProvider.logout();
            },
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.agriculture),
            label: 'Maszyny',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.landscape),
            label: 'Pola',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.pets),
            label: 'Zwierzęta',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.grass),
            label: 'Rośliny',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.green[700],
        unselectedItemColor: Colors.grey[600],
        onTap: _onItemTapped,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Statystyki gospodarstwa',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              _buildSummaryCards(),
              const SizedBox(height: 30),
              _buildAnimalSection(),
              const SizedBox(height: 30),
              _buildCropsSection(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSummaryCards() {
    return GridView.count(
      crossAxisCount: 2,
      crossAxisSpacing: 16,
      mainAxisSpacing: 16,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      children: [
        _buildSummaryCard(
          title: 'Maszyny',
          value: farmerData['machinesCount'].toString(),
          icon: Icons.agriculture,
          color: Colors.blue,
        ),
        _buildSummaryCard(
          title: 'Zwierzęta',
          value: farmerData['animalsCount'].toString(),
          icon: Icons.pets,
          color: Colors.orange,
        ),
        _buildSummaryCard(
          title: 'Plony (w tym roku)',
          value: '${farmerData['thisYearYield']} kg',
          icon: Icons.grass,
          color: Colors.green,
        ),
        _buildSummaryCard(
          title: 'Obsiane pola',
          value: farmerData['plantedFieldsCount'].toString(),
          icon: Icons.landscape,
          color: Colors.brown,
        ),
      ],
    );
  }

  Widget _buildSummaryCard({
    required String title,
    required String value,
    required IconData icon,
    required Color color,
  }) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              icon,
              size: 40,
              color: color,
            ),
            const SizedBox(height: 12),
            Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              value,
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAnimalSection() {
    Map<String, dynamic> animalsByType = farmerData['animalsByType'];

    // Przygotowanie danych do wykresu
    List<PieChartSectionData> sections = [];
    List<MapEntry<String, dynamic>> sortedAnimals = animalsByType.entries
        .toList()
      ..sort((a, b) => b.value['count'].compareTo(a.value['count']));

    final colors = [
      Colors.red,
      Colors.blue,
      Colors.green,
      Colors.orange,
      Colors.purple,
      Colors.teal,
      Colors.pink,
      Colors.amber,
      Colors.indigo,
      Colors.brown,
    ];

    for (int i = 0; i < sortedAnimals.length; i++) {
      final animal = sortedAnimals[i];
      sections.add(
        PieChartSectionData(
          title: animal.value['count'].toString(),
          value: animal.value['count'].toDouble(),
          color: colors[i % colors.length],
          radius: 100,
          titleStyle: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Zwierzęta według typu',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 20),
        Column(
          children: [
            SizedBox(
              height: 250,
              child: PieChart(
                PieChartData(
                  sections: sections,
                  centerSpaceRadius: 40,
                  sectionsSpace: 2,
                ),
              ),
            ),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Wrap(
                spacing: 16.0,
                runSpacing: 8.0,
                children: List.generate(
                  sortedAnimals.length,
                  (index) => Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 12.0, vertical: 8.0),
                    decoration: BoxDecoration(
                      color: Colors.grey[100],
                      borderRadius: BorderRadius.circular(8.0),
                      border: Border.all(color: Colors.grey[300]!),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 16,
                          height: 16,
                          decoration: BoxDecoration(
                            color: colors[index % colors.length],
                            borderRadius: BorderRadius.circular(4),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          '${sortedAnimals[index].value['name']} (${sortedAnimals[index].value['count']})',
                          style: const TextStyle(
                              fontSize: 14, fontWeight: FontWeight.w500),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildCropsSection() {
    Map<String, dynamic> cropsByType = farmerData['cropsByType'];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Uprawy według typu',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 20),
        SizedBox(
          height: 300,
          child: BarChart(
            BarChartData(
              alignment: BarChartAlignment.spaceAround,
              maxY: cropsByType.values
                      .map<int>((crop) => crop['count'] as int)
                      .reduce((a, b) => a > b ? a : b)
                      .toDouble() +
                  1,
              titlesData: FlTitlesData(
                leftTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    reservedSize: 28,
                    getTitlesWidget: (value, meta) {
                      if (value == 0) return const SizedBox();
                      return Text(
                        value.toInt().toString(),
                        style: const TextStyle(
                          color: Colors.grey,
                          fontSize: 12,
                        ),
                      );
                    },
                  ),
                ),
                bottomTitles: AxisTitles(
                  sideTitles: SideTitles(
                    showTitles: true,
                    getTitlesWidget: (value, meta) {
                      List<String> crops = cropsByType.keys.toList();
                      if (value >= crops.length || value < 0)
                        return const SizedBox();

                      return Padding(
                        padding: const EdgeInsets.only(top: 8.0),
                        child: Text(
                          crops[value.toInt()],
                          style: const TextStyle(
                            color: Colors.grey,
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      );
                    },
                  ),
                ),
                rightTitles: AxisTitles(
                  sideTitles: SideTitles(showTitles: false),
                ),
                topTitles: AxisTitles(
                  sideTitles: SideTitles(showTitles: false),
                ),
              ),
              borderData: FlBorderData(show: false),
              gridData: FlGridData(
                drawHorizontalLine: true,
                drawVerticalLine: false,
              ),
              barGroups:
                  cropsByType.entries.toList().asMap().entries.map((entry) {
                int index = entry.key;
                MapEntry<String, dynamic> crop = entry.value;

                return BarChartGroupData(
                  x: index,
                  barRods: [
                    BarChartRodData(
                      toY: crop.value['count'].toDouble(),
                      color: Colors.green,
                      width: 20,
                      borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(6),
                        topRight: Radius.circular(6),
                      ),
                    ),
                  ],
                );
              }).toList(),
            ),
          ),
        ),
      ],
    );
  }
}
