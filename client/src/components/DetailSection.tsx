import { FC } from "react";

interface DetailSectionProps {
  label: string;
  value: string;
}

const DetailSection: FC<DetailSectionProps> = ({ label, value }) => (
  <div className="py-3 border-b border-gray-200">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default DetailSection;
