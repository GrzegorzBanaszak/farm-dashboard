import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { cleanError } from "@/features/auth/authSlice";

import { authThunk } from "@/features/auth/authThunk";
import LoginSchema from "@/features/auth/types/LoginSchema";

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { globalState, isAuthenticated } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<LoginSchema>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      // Przekierowanie do strony, do której użytkownik próbował uzyskać dostęp,
      // lub do dashboardu, jeśli nie ma takiej informacji
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    dispatch(cleanError());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(authThunk.login(formData));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Lewa strona - obraz */}
      <div className="hidden md:block md:w-1/2 bg-green-700 relative">
        <img
          src="login-image.jpg"
          alt="Gospodarstwo rolne"
          className="object-cover h-full w-full opacity-80"
        />
        <div className="absolute inset-0 bg-black/30  flex flex-col justify-center items-center text-white p-8">
          <img
            src="logo.jpg"
            alt="Logo"
            className="h-24 w-24 rounded-full mb-4"
          />
          <h1 className="text-4xl font-bold mb-4">Agro Manager</h1>
          <p className="text-xl text-center">
            Nowoczesne rozwiązanie dla efektywnego zarządzania Twoim
            gospodarstwem rolnym
          </p>
        </div>
      </div>

      {/* Prawa strona - formularz logowania */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo na małych ekranach */}
          <div className="md:hidden flex justify-center mb-8 items-center space-x-1.5">
            <img
              src="logo.jpg"
              alt="Logo"
              className="h-16 w-16 rounded-full "
            />
            <h1 className="text-3xl font-bold text-green-700">AgroManager</h1>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Logowanie do systemu
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Adres e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hasło
                </label>
                <a
                  href="#"
                  className="text-sm text-green-600 hover:text-green-800"
                >
                  Zapomniałeś hasła?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {globalState.error && (
              <div className="text-red-500 font-black  my-4">
                Nieprawidłowy login lub hasło
              </div>
            )}

            <div className="flex items-center mb-6">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Zapamiętaj mnie
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 cursor-pointer"
            >
              Zaloguj się
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Nie masz jeszcze konta?
              <Link
                to="/register"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Zarejestruj się
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
