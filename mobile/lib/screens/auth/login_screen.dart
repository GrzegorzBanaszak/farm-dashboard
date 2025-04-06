import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile/data/providers/auth_provider.dart';
import 'package:mobile/widgets/common/app_widgets.dart';
import 'package:mobile/core/constants/app_constants.dart';
import 'package:mobile/core/routes/app_routes.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  String? _errorMessage;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _login() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
        _errorMessage = null;
      });

      final result = await Provider.of<AuthProvider>(context, listen: false)
          .login(_emailController.text, _passwordController.text);

      setState(() {
        _isLoading = false;
      });

      if (!result['success']) {
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
        title: Text('Logowanie'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
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
                text: 'Zaloguj się',
                onPressed: _login,
                isLoading: _isLoading,
              ),
              SizedBox(height: 16),
              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, AppRoutes.register);
                },
                child: Text('Nie masz konta? Zarejestruj się'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
