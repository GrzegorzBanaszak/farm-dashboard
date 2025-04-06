import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile/data/providers/auth_provider.dart';
import 'package:mobile/widgets/dashboard/dashboard_widgets.dart';

class DashboardScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    // Przykładowe dane statystyk
    final stats = [
      {
        'title': 'Projekty',
        'value': '12',
        'color': Colors.blue,
        'icon': Icons.folder,
      },
      {
        'title': 'Zadania',
        'value': '48',
        'color': Colors.green,
        'icon': Icons.check_circle,
      },
      {
        'title': 'Wiadomości',
        'value': '24',
        'color': Colors.orange,
        'icon': Icons.message,
      },
      {
        'title': 'Powiadomienia',
        'value': '8',
        'color': Colors.purple,
        'icon': Icons.notifications,
      },
    ];

    // Przykładowe dane aktywności
    final activities = [
      {
        'title': 'Nowy projekt',
        'description': 'Utworzono nowy projekt "App Redesign"',
        'timeAgo': '1h temu',
        'icon': Icons.create_new_folder,
        'iconColor': Colors.blue,
      },
      {
        'title': 'Zadanie ukończone',
        'description': 'Ukończono zadanie "Ekran logowania"',
        'timeAgo': '2h temu',
        'icon': Icons.task_alt,
        'iconColor': Colors.green,
      },
      {
        'title': 'Nowa wiadomość',
        'description': 'Otrzymano wiadomość od Jana Kowalskiego',
        'timeAgo': '3h temu',
        'icon': Icons.message,
        'iconColor': Colors.orange,
      },
      {
        'title': 'Spotkanie',
        'description': 'Zaplanowano spotkanie na jutro, 10:00',
        'timeAgo': '4h temu',
        'icon': Icons.calendar_today,
        'iconColor': Colors.purple,
      },
      {
        'title': 'Nowy komentarz',
        'description': 'Anna Nowak skomentowała twój post',
        'timeAgo': '5h temu',
        'icon': Icons.comment,
        'iconColor': Colors.teal,
      },
    ];

    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () async {
              await authProvider.logout();
            },
          ),
        ],
      ),
      body: Text('Dashboard'),
      // Można dodać dolną nawigację dla bardziej złożonej aplikacji
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.folder),
            label: 'Projekty',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.message),
            label: 'Wiadomości',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profil',
          ),
        ],
        onTap: (index) {
          // Obsługa nawigacji
        },
      ),
    );
  }
}
