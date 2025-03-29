import React from "react";
import StatCard from "./StatCard";

interface DashboardStatsProps {
  machinesCount: number;
  animalsCount: number;
  thisYearYield: number;
  plantedFieldsCount: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  machinesCount,
  animalsCount,
  thisYearYield,
  plantedFieldsCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Ilość maszyn"
        value={machinesCount}
        icon={<span>🚜</span>}
      />
      <StatCard
        title="Ilość zwierząt"
        value={animalsCount}
        icon={<span>🐄</span>}
      />
      <StatCard
        title="Zbiór z tego roku"
        value={`${thisYearYield} kg`}
        icon={<span>🌾</span>}
      />
      <StatCard
        title="Obsiane pola"
        value={plantedFieldsCount}
        icon={<span>🌱</span>}
      />
    </div>
  );
};
