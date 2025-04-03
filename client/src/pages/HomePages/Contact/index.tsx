import React from "react";

const ContactPage: React.FC = () => {
  return (
     <main className="flex-1 p-10">
     <h1 className="text-3xl font-bold text-gray-700">Skontaktuj się z nami</h1>
     <div className="bg-white shadow-lg rounded-xl p-6 mt-5">
       <p className="text-gray-600">Masz pytania lub chcesz dowiedzieć się więcej o naszej platformie? Skontaktuj się z nami!</p>
       
       <div className="mt-6 grid md:grid-cols-2 gap-6">
         <div className="bg-gray-50 p-5 rounded-lg shadow">
           <h2 className="text-xl font-semibold text-gray-700">Kontakt z nami</h2>
           <p className="text-gray-700 font-semibold mt-2">Email:{" "}<a href="mailto:support@farmmanagement.com">support@farmmanagement.com</a></p>
           <p className="text-gray-700 font-semibold">Telefon:{" "}<a href="tel:+48 123 456 789" className="text-blue-600 hover:underline">+48 123 456 789</a></p>
           <p className="text-gray-700 font-semibold mt-2">Addres: Strzegomska 55, Wrocław</p>
         </div>
         
         <div className="bg-gray-50 p-5 rounded-lg shadow">
           <h2 className="text-xl font-semibold text-gray-700">Wyślij nam swoją wiadomość</h2>
           <form className="mt-4">
             <div className="mb-4">
               <label className="block text-gray-600 font-medium">Imię i Nazwisko</label>
               <input type="text" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
             </div>
             <div className="mb-4">
               <label className="block text-gray-600 font-medium">Adres Email</label>
               <input type="email" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
             </div>
             <div className="mb-4">
               <label className="block text-gray-600 font-medium">Wiadomość</label>
               <textarea className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4}></textarea>
             </div>
             <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Wyślij wiadomość</button>
           </form>
         </div>
       </div>
     </div>
   </main>
  );
};

export default ContactPage;

