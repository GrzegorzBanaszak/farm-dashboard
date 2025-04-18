import 'package:flutter/material.dart';
import 'package:mobile/data/providers/machine_provider.dart';
import 'package:mobile/screens/dashboard/machines_screen.dart';
import 'package:provider/provider.dart';
import 'package:mobile/data/providers/auth_provider.dart';
import 'package:mobile/screens/auth/login_screen.dart';
import 'package:mobile/screens/dashboard/dashboard_screen.dart';
import 'package:mobile/screens/auth/register_screen.dart';
import 'package:mobile/core/theme/app_theme.dart';
import 'package:mobile/core/routes/app_routes.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => MachineProvider()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aplikacja do zarzadzania',
      theme: AppTheme.lightTheme,
      home: Consumer<AuthProvider>(
        builder: (context, authProvider, child) {
          if (authProvider.isLoading) {
            return const Scaffold(
              body: Center(
                child: CircularProgressIndicator(),
              ),
            );
          }

          if (authProvider.isAuthenticated) {
            return const DashboardScreen();
          } else {
            return LoginScreen();
          }
        },
      ),
      routes: {
        AppRoutes.login: (context) => LoginScreen(),
        AppRoutes.register: (context) => RegisterScreen(),
        AppRoutes.dashboard: (context) => const DashboardScreen(),
        AppRoutes.machine: (context) => const MachinesPage(),
      },
    );
  }
}
