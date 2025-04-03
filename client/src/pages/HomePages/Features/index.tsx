const FeaturesPage = () => {
  return (
    <body className="bg-gray-100">
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-700">Funkcje aplikacji</h1>
        <div className="bg-white shadow-lg rounded-xl p-6 mt-5">
          <p className="text-gray-600">Poznaj zaawansowane funkcje naszej aplikacji do zarządzania gospodarstwem rolnym, zaprojektowanej w celu optymalizacji i usprawnienia działalności rolniczej.</p>
          
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700">Zarządzanie uprawami</h2>
              <p className="text-gray-600 mt-3">Monitoruj stan upraw, śledź cykle wzrostu i efektywnie zarządzaj działaniami w terenie.</p>
            </div>
        
            <div className="bg-gray-50 p-5 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700">Monitorowanie zwierząt gospodarskich</h2>
              <p className="text-gray-600 mt-3">Prowadzenie ewidencji zwierząt gospodarskich, śledzenie harmonogramów karmienia i monitorowanie stanu zdrowia.</p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700">Inwentaryzacja i przechowywanie</h2>
              <p className="text-gray-600 mt-3">Zarządzanie zapasami w gospodarstwie, śledzenie dostaw i optymalizacja magazynów.</p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700">Harmonogram zadań</h2>
              <p className="text-gray-600 mt-3">Planowanie codziennych zadań, ustawianie przypomnień i efektywne przydzielanie pracy pracownikom gospodarstwa.</p>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
};

export default FeaturesPage;