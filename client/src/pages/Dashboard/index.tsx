const Dashboard = () => {
  return (
    <div className="min-h-screen h-1 bg-[url(/open-bg.jpg)] bg-cover relative overflow-hidden">
      <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50"></div>
      <nav className="bg-white shadow-md relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img
                  src="logo.jpg"
                  alt="Logo"
                  className="h-8 w-8 rounded-full"
                />
                <span className="ml-2 text-xl font-bold text-gray-800">
                  FarmManager
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-green-600">
                O nas
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Funkcje
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Cennik
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden z-10 w-full h-full flex items-center justify-center flex-col ">
        <h1 className="text-center text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Zarządzaj swoim gospodarstwem
          <span className="text-green-600 ml-4">efektywniej</span>
        </h1>
        <p className="mt-5 text-xl text-gray-200 text-center w-3/4 mx-auto lg:w-1/2">
          Kompleksowe rozwiązanie do zarządzania gospodarstwem rolnym. Monitoruj
          uprawy, śledź wydatki i zwiększaj swoje zyski dzięki naszemu
          inteligentnemu dashboardowi.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <a
            href="/login"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-md"
          >
            Zaloguj się
          </a>
          <a
            href="/register"
            className="inline-flex items-center justify-center px-5 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 shadow-md"
          >
            Zarejestruj się
          </a>
        </div>
        <div className="mt-6 text-sm text-gray-100">
          <p>Wypróbuj za darmo przez 14 dni. Nie wymagamy karty kredytowej.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
