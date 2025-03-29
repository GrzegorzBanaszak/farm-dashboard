import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100">
        <main className="flex-1 p-10">
          <h1 className="text-3xl font-bold text-gray-700">O Nas</h1>
          <div className="bg-white shadow-lg rounded-xl p-6 mt-5">
            <p className="text-gray-600 leading-relaxed">
              Jesteśmy zespołem oddanych profesjonalistów, których celem jest
              zrewolucjonizowanie zarządzania gospodarstwem za pomocą
              najnowocześniejszych technologii. Nasza platforma pomaga rolnikom
              optymalizować ich działania, śledzić zapasy i zapewniać dobrostan
              zwierząt gospodarskich i upraw.
            </p>

            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg shadow">
                <img
                  src="/person1.png"
                  className="w-30 h-20 rounded-full mx-auto mb-3"
                  alt="Team Member"
                />
                <h3 className="text-center text-lg font-semibold">
                  Grzegorz Banaszak
                </h3>
                <p className="text-center text-gray-500">
                  Założyciel & Główny Programista
                </p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg shadow">
                <img
                  src="/person2.png"
                  className="w-30 h-20 rounded-full mx-auto mb-3"
                  alt="Team Member"
                />
                <h3 className="text-center text-lg font-semibold">
                  Patryk Bednarek
                </h3>
                <p className="text-center text-gray-500">Programista</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg shadow">
                <img
                  src="/person3.png"
                  className="w-30 h-20 rounded-full mx-auto mb-3"
                  alt="Team Member"
                />
                <h3 className="text-center text-lg font-semibold">
                  Krzysztof Wasiak
                </h3>
                <p className="text-center text-gray-500">Programista</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-700 mt-8">
              Our Mission
            </h2>
            <p className="text-gray-600 mt-2">
              Naszą misją jest zapewnienie rolnikom intuicyjnych i wydajnych
              narzędzi do zarządzania gospodarstwem, które usprawniają procesy,
              zmniejszają ilość odpadów i maksymalizują produktywność. Wierzymy
              w przyszłość inteligentnego rolnictwa, w którym technologia i
              rolnictwo płynnie się łączą.
            </p>

            <h2 className="text-2xl font-bold text-gray-700 mt-8">
              Nasze usługi
            </h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Planowanie i zarządzanie gospodarstwem</li>
              <li>Śledzenie upraw i zwierząt gospodarskich</li>
              <li>Automatyczne generowanie raportów</li>
              <li>Inteligentne rozwiązania nawadniające</li>
              <li>Optymalizacja łańcucha dostaw</li>
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-4 mt-10">
            <h2 className="text-2xl font-bold text-gray-700 mt-8">Kontakt</h2>
            <p className="text-gray-600 mt-2">
              Masz pytania lub chcesz dowiedzieć się więcej o naszej platformie?
              Skontaktuj się z nami pod adresem:
            </p>
            <p className="text-gray-700 font-semibold mt-2">
              Email:{" "}
              <a
                href="mailto:support@farmmanagement.com"
                className="text-blue-600 hover:underline"
              >
                support@farmmanagement.com
              </a>
            </p>
            <p className="text-gray-700 font-semibold">
              Telefon:{" "}
              <a
                href="tel:+48 123 456 789"
                className="text-blue-600 hover:underline"
              >
                +48 123 456 789
              </a>
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default AboutUsPage;
