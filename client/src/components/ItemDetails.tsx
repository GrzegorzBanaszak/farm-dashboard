import LoadingState from "@/types/LoadingState";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

interface ItemDetailsProps {
  itemId: string;
  onBack: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  detailComponent: React.ReactNode;
  loadingState: LoadingState;
  item: any;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  itemId,
  onBack,
  onEdit,
  onDelete,
  detailComponent,
  loadingState,
  item,
}) => {
  // Jeśli trwa ładowanie, wyświetl informację
  if (loadingState === LoadingState.PENDING) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Ładowanie szczegółów przedmiotu...</p>
      </div>
    );
  }

  // Jeśli nie znaleziono przedmiotu
  if (loadingState === LoadingState.FAILED) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-xl text-gray-600">
          Nie znaleziono przedmiotu o ID: {itemId}
        </p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Wróć do listy
        </button>
      </div>
    );
  }

  return (
    <div className="h-full  bg-gray-50">
      {/* Nagłówek */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-3 text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl sm:text-2xl font-semibold">{item.name}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(itemId)}
                className="p-2 text-yellow-600 hover:text-yellow-800 rounded-full hover:bg-gray-100"
                title="Edytuj"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => onDelete(itemId)}
                className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-gray-100"
                title="Usuń"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      {detailComponent}
    </div>
  );
};

export default ItemDetails;
