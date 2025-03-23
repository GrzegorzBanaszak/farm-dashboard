import { Edit, Info, Trash2 } from "lucide-react";
import { FC } from "react";

interface IItemCardProps {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onViewDetails: (item: any) => void;
  titles: string[];
}

const ItemCard: FC<IItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  onViewDetails,
  titles,
}) => {
  const { id, ...rest } = item;

  const dispalyValue = (value: any) => {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    if (isoDateRegex.test(value)) {
      return new Date(value).toLocaleDateString("pl-PL");
    }

    return value;
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium"></h3>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => onViewDetails(item)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Szczegóły"
          >
            <Info size={18} />
          </button>
          <button
            onClick={() => onEdit(item)}
            className="p-1 text-yellow-600 hover:text-yellow-800"
            title="Edytuj"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-1 text-red-600 hover:text-red-800"
            title="Usuń"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
        {Object.values(rest).map((value: any, index) => (
          <div key={index}>
            <span className="text-gray-500">{titles[index]}:</span>
            {dispalyValue(value)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemCard;
