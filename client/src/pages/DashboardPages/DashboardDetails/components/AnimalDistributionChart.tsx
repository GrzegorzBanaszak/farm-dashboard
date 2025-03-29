import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { COLORS } from "./helpers";
import { CountType } from "@/features/stats/schema/GetStatsSchema";

interface AnimalDistributionChartProps {
  animals: Record<string, CountType>;
  labes: Record<string, string>;
  header: string;
}

export const AnimalDistributionChart: React.FC<
  AnimalDistributionChartProps
> = ({ animals, labes, header }) => {
  // Przygotowanie danych do wykresu
  const data = Object.entries(animals).map(([specie, item], index) => ({
    name: labes[specie] || specie,
    value: item.count,
    color: COLORS[index % COLORS.length],
  }));

  const [outerRadius, setOuterRadius] = useState(50);

  useEffect(() => {
    function handleResize() {
      // Dostosuj promień na podstawie szerokości okna
      if (window.innerWidth < 480) {
        setOuterRadius(40);
      } else if (window.innerWidth < 768) {
        setOuterRadius(50);
      } else {
        setOuterRadius(100);
      }
    }

    // Wywołaj funkcję przy montowaniu komponentu
    handleResize();

    // Dodaj nasłuchiwanie na zdarzenie zmiany rozmiaru
    window.addEventListener("resize", handleResize);

    // Sprzątanie po komponencie
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow h-full  p-4 pb-8">
      <h3 className="text-lg font-semibold mb-2">{header}</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={outerRadius}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={value => [`${value} sztuk`, "Ilość"]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
