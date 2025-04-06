import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile/data/providers/auth_provider.dart';
import 'package:mobile/widgets/common/app_widgets.dart';
import 'package:mobile/core/constants/app_constants.dart';
import 'package:mobile/core/routes/app_routes.dart';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _isLoading = false;
  String? _errorMessage;

  @override
  void dispose() {
    _usernameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  void _register() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
        _errorMessage = null;
      });

      final result =
          await Provider.of<AuthProvider>(context, listen: false).register(
        _usernameController.text,
        _emailController.text,
        _passwordController.text,
      );

      setState(() {
        _isLoading = false;
      });

      if (result['success']) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(AppConstants.registerSuccess),
            backgroundColor: Colors.green,
          ),
        );
        Navigator.pushReplacementNamed(context, AppRoutes.login);
      } else {
        setState(() {
          _errorMessage = result['message'];
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Rejestracja'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              AppTextField(
                controller: _usernameController,
                labelText: 'Nazwa użytkownika',
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return AppConstants.requiredField;
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              AppTextField(
                controller: _emailController,
                labelText: 'Email',
                keyboardType: TextInputType.emailAddress,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return AppConstants.requiredField;
                  }

                  return null;
                },
              ),
              SizedBox(height: 16),
              AppTextField(
                controller: _passwordController,
                labelText: 'Hasło',
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return AppConstants.requiredField;
                  }
                  if (value.length < 6) {
                    return AppConstants.passwordTooShort;
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              AppTextField(
                controller: _confirmPasswordController,
                labelText: 'Powtórz hasło',
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return AppConstants.requiredField;
                  }
                  if (value != _passwordController.text) {
                    return AppConstants.passwordsNotMatch;
                  }
                  return null;
                },
              ),
              if (_errorMessage != null)
                Padding(
                  padding: const EdgeInsets.only(top: 16.0),
                  child: ErrorMessage(message: _errorMessage!),
                ),
              SizedBox(height: 24),
              AppButton(
                text: 'Zarejestruj się',
                onPressed: _register,
                isLoading: _isLoading,
              ),
              SizedBox(height: 16),
              TextButton(
                onPressed: () {
                  Navigator.pushReplacementNamed(context, AppRoutes.login);
                },
                child: Text('Masz już konto? Zaloguj się'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
