import { Link } from "react-router-dom";

const PricingPage = () => {
  return (
    <main className="flex-1 p-10">
    <h1 className="text-3xl font-bold text-gray-700">Cennik</h1>
    <div className="bg-white shadow-lg rounded-xl p-6 mt-5">
      <p className="text-gray-600">Wybierz najlepszy plan, dopasowany do twoich potrzeb!</p>
      
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-5 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Basic</h2>
          <p className="text-gray-600 mt-3">Free</p>
          <ul className="mt-3 text-gray-600 text-left">
            <li>- Ewidencja zwierząt</li>
            <li>- Ewidencja pól uprawnych</li>
            <li>- Zarządzanie uprawami</li>
            <li>- 1 - 4 Użytkowników</li>
          </ul>
          <Link to="" className="inline-block bg-blue-600 text-white mt-4 py-2 px-4 rounded-lg hover:bg-blue-700 transition">Rozpocznij</Link>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Pro</h2>
          <p className="text-gray-600 mt-3">$9.99/month</p>
          <ul className="mt-3 text-gray-600 text-left">
            <li>- Wszystkie funkcje zawarte w planie Basic</li>
            <li>- Zarządzanie maszynami</li>
            <li>- Zarządzanie magazynami</li>
            <li>- 1 - 20 Użytkowników</li>
          </ul>
          <Link to="" className="inline-block bg-blue-600 text-white mt-4 py-2 px-4 rounded-lg hover:bg-blue-700 transition">Wybierz plan</Link>
        </div>        

        <div className="bg-gray-50 p-5 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Enterprise</h2>
          <p className="text-gray-600 mt-3">Custom Pricing</p>
          <ul className="mt-3 text-gray-600 text-left">
            <li>- Wszystkie funkcje zawarte w planie Pro</li>
            <li>- Comiesięczne raporty</li>
            <li>- Dedykowane wsparcie</li>
            <li>- Nielimitowana ilość użytkowników</li>
          </ul>
          <Link to="/contact" className="inline-block bg-blue-600 text-white mt-4 py-2 px-4 rounded-lg hover:bg-blue-700 transition">Skontaktuj się z nami</Link>
        </div>
      </div>
    </div>
    </main>
  );
};

export default PricingPage;
