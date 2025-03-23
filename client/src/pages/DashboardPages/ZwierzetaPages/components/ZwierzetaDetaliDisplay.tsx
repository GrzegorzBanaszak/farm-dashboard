import DetailSection from "@/components/DetailSection";
import ZwierzetaDetailSchema from "@/features/zwierzeta/types/ZwierzetaDetailSchema";
import { FC, useState } from "react";

interface ZwierzetaDetailDisplayProps {
  item: ZwierzetaDetailSchema;
}

const tabs = [
  {
    type: "info",
    name: "Informacje",
  },
];

const ZwierzetaDetailDisplay: FC<ZwierzetaDetailDisplayProps> = ({ item }) => {
  const [activeTab, setActiveTab] = useState("info");
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-auto">
      {/* Zakładki */}
      <div className="bg-white rounded-t-lg shadow-sm">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`py-4 px-6 font-medium cursor-pointer ${
                activeTab === tab.type
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.type)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Zawartość zakładek */}
      <div className="bg-white rounded-b-lg shadow-sm p-6">
        {activeTab === "info" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-medium mb-4">
                  Podstawowe informacje
                </h2>
                <DetailSection label="ID" value={item.id} />
                <DetailSection label="Nazwa" value={item.name} />
                <DetailSection label="Gatunek" value={item.specie} />
                <DetailSection
                  label="Numer chipa"
                  value={item.number.toString()}
                />
                <DetailSection label="Stan zdrowia" value={item.health} />

                <DetailSection
                  label="Data urodzenia"
                  value={new Date(item.birthDate).toLocaleDateString("pl-PL")}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ZwierzetaDetailDisplay;
