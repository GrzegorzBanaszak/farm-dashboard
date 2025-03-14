import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <img src="logo.jpg" alt="Logo" className="h-8 w-8 rounded-full" />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium"
            >
              Strona główna
            </Link>
            <Link
              to="/about-us"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium"
            >
              O nas
            </Link>
            <Link
              to="/features"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium"
            >
              Funkcje
            </Link>
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium"
            >
              Cennik
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium"
            >
              Kontakt
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block text-gray-600 hover:text-blue-500 px-3 py-2 text-base font-medium"
            >
              Strona główna
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-blue-500 px-3 py-2 text-base font-medium"
            >
              O nas
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-blue-500 px-3 py-2 text-base font-medium"
            >
              Usługi
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-blue-500 px-3 py-2 text-base font-medium"
            >
              Kontakt
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;

{
  /* */
}
