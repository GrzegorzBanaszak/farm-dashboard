import { Edit, Info, Trash2 } from "lucide-react";
import { FC } from "react";

interface IItemRowProps {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onViewDetails: (item: any) => void;
}

const ItemRow: FC<IItemRowProps> = ({
  item,
  onEdit,
  onDelete,
  onViewDetails,
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
    <tr className="border-b border-b-gray-200 hover:bg-gray-50">
      {Object.values(rest).map((item: any, index) => (
        <td key={index} className="py-3 px-4">
          {dispalyValue(item)}
        </td>
      ))}

      <td className="py-3 px-4">
        <div className="flex space-x-2 justify-end">
          <button
            onClick={() => onViewDetails(item)}
            className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer"
            title="Szczegóły"
          >
            <Info size={18} />
          </button>
          <button
            onClick={() => onEdit(item)}
            className="p-1 text-yellow-600 hover:text-yellow-800 cursor-pointer"
            title="Edytuj"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
            title="Usuń"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemRow;
