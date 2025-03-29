import { FC } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}
const StatCard: FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className="text-blue-500 text-2xl">{icon}</div>
    </div>
  </div>
);

export default StatCard;
