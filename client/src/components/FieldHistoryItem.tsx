import UprawySchemaWithoutField from "@/features/uprawy/types/UprawySchemaWithoutField";
import { WheatIcon } from "lucide-react";

interface FieldHistoryItemProps {
  data: UprawySchemaWithoutField;
}

const FieldHistoryItem: React.FC<FieldHistoryItemProps> = ({ data }) => (
  <div className="flex items-start mb-3">
    <div
      className={`rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0 ${
        data.isGrowing ? "bg-green-300" : "bg-yellow-400"
      }`}
    >
      <WheatIcon size={16} />
    </div>
    <div>
      <p className="font-medium">{data.type}</p>
      <div className="flex gap-2">
        <p className="text-sm text-gray-500">
          Zasiano {new Date(data.plantedAt).toLocaleDateString("pl-PL")}
        </p>
        <p className="text-sm text-gray-500">
          {data.harvestedAt
            ? `Zebrano ${new Date(data.harvestedAt).toLocaleDateString(
                "pl-PL"
              )}`
            : "Nie zebranio jeszcze"}
        </p>
      </div>
    </div>
  </div>
);

export default FieldHistoryItem;
