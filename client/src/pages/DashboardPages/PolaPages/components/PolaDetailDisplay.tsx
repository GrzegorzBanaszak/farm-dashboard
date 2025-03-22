import DetailSection from "@/components/DetailSection";
import FieldHistoryItem from "@/components/FieldHistoryItem";
import PoleDetailSchema from "@/features/pola/types/PoleDetailSchema";
import { FC, useState } from "react";

interface PolaDetailDisplayProps {
  item: PoleDetailSchema;
}

const tabs = [
  {
    type: "info",
    name: "Informacje",
  },
  {
    type: "history",
    name: "Historia upraw",
  },
];

const PolaDetailDisplay: FC<PolaDetailDisplayProps> = ({ item }) => {
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
                <DetailSection label="Rozmiar" value={item.size.toString()} />
                <DetailSection label="Lokalizacja" value={item.location} />
              </div>
              {item.currentCropGrowing && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-medium mb-4">
                    Aktualnie zasiane
                  </h2>
                  <DetailSection
                    label="ID"
                    value={item.currentCropGrowing.id}
                  />
                  <DetailSection
                    label="Typ"
                    value={item.currentCropGrowing.type}
                  />

                  <DetailSection
                    label="Data zasiania"
                    value={new Date(
                      item.currentCropGrowing.plantedAt
                    ).toLocaleDateString("pl-PL")}
                  />
                </div>
              )}
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-medium mb-4">Informacje dodatkowe</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <h2 className="text-lg font-medium mb-4">Historia upraw</h2>
            {item.histroyCrops.length > 0 ? (
              item.histroyCrops.map((item, index) => (
                <FieldHistoryItem key={index} data={item} />
              ))
            ) : (
              <div className="text-gray-500">Brak historii upraw</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default PolaDetailDisplay;
