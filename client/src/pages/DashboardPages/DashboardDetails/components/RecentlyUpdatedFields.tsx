// components/RecentlyUpdatedFields.tsx
import React from "react";
import { Field } from "./types";

interface RecentlyUpdatedFieldsProps {
  fields: Field[];
}

export const RecentlyUpdatedFields: React.FC<RecentlyUpdatedFieldsProps> = ({
  fields,
}) => {
  // Sortowanie pól według daty aktualizacji (od najnowszych)
  const sortedFields = [...fields].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow p-4 h-64 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-2">
        Ostatnio aktualizowane pola
      </h3>
      <div className="space-y-2">
        {sortedFields.slice(0, 10).map(field => (
          <div key={field.id} className="border-b pb-2 last:border-b-0">
            <div className="flex justify-between">
              <span className="font-medium">{field.name}</span>
              <span className="text-gray-500 text-sm">
                {new Date(field.updatedAt).toLocaleDateString("pl-PL")}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <span>Powierzchnia: {field.size} ha</span>
              <span className="ml-4">
                Uprawy: {field.crops?.filter(c => c.isGrowing).length || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
