import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authThunk } from "@/features/auth/authThunk";
import RegisterSchema from "@/features/auth/types/RegisterSchema";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { registerState } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState<RegisterSchema>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(authThunk.register(formData));
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
            Dołącz do społeczności rolników, którzy zwiększają wydajność swoich
            gospodarstw
          </p>
        </div>
      </div>

      {/* Prawa strona - formularz rejestracji */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo na małych ekranach */}
          <div className="md:hidden flex justify-center mb-8 items-center space-x-1.5">
            <img
              src="logo.jpg"
              alt="Logo"
              className="h-16 w-16 rounded-full "
            />
            <h1 className="text-3xl font-bold text-green-700"> AgroManager</h1>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Zarejestruj nowe konto
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
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

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Hasło
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 8 znaków, w tym duża litera i cyfra
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Potwierdź hasło
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {registerState.error && (
              <div className="text-red-500 font-black  my-4">
                Nieprawidłowy dane rejestracji
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 mt-4 cursor-pointer"
            >
              Zarejestruj się
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Masz już konto?
              <Link
                to="/login"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Zaloguj się
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
