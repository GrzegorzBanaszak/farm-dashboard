const page = () => {
  return (
    <main className="flex-1 p-10 bg-gray-100 min-h-[calc(100%-64px)]">
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
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 p-5 rounded-lg shadow text-center"
            >
              <img
                src={member.image}
                width={120}
                height={80}
                className="w-30 h-20 rounded-full mx-auto mb-3"
                alt={member.name}
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

const teamMembers = [
  {
    name: "Grzegorz Banaszak",
    role: "Założyciel & Główny Programista",
    image: "/person1.png",
  },
  { name: "Patryk Bednarek", role: "Programista", image: "/person2.png" },
  { name: "Krzysztof Wasiak", role: "Programista", image: "/person3.png" },
];

export default page;
