import { FC, useEffect } from "react";
import DeleteNotification from "./DeleteNotification";
import LoadingState from "@/types/LoadingState";

interface DeleteConfirmationAndNotificationProps {
  item: any;
  onBack: () => void;
  onDelete: (id: string) => void;
  afterDelete: () => void;
  loadingState: LoadingState;
}

const DeleteConfirmationAndNotification: FC<
  DeleteConfirmationAndNotificationProps
> = ({ item, onBack, onDelete, loadingState, afterDelete }) => {
  const { id, ...rest } = item;

  useEffect(() => {
    if (loadingState === LoadingState.SUCCEEDED) {
      setTimeout(() => {
        afterDelete();
      }, 1000);
    }
  }, [loadingState]);

  if (loadingState === LoadingState.SUCCEEDED) {
    return <DeleteNotification closeNotification={() => afterDelete()} />;
  }

  return (
    <>
      {/* Dialog potwierdzenia usunięcia */}

      <div className="fixed inset-0 bg-gray-600/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Potwierdzenie usunięcia
            </h3>
            <p className="text-gray-600 mt-2">
              Czy na pewno chcesz usunąć element?
            </p>
            <div className="mt-3 bg-gray-100 p-3 rounded-md">
              {item &&
                Object.values(rest).map((value: any, index: number) => (
                  <p key={index} className="text-gray-700 text-center">
                    <span className="font-medium">{value}</span>
                  </p>
                ))}
            </div>
            <p className="text-red-600 text-sm mt-4">
              Ta operacja jest nieodwracalna!
            </p>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Anuluj
            </button>
            <button
              onClick={() => onDelete(id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Usuń
            </button>
          </div>
        </div>
      </div>

      {/* Notyfikacja o usunięciu */}
    </>
  );
};

export default DeleteConfirmationAndNotification;
