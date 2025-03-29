import { useAppDispatch, useAppSelector } from "@/app/hooks";
import DeleteConfirmationAndNotification from "@/components/DeleteConfirmationAndNotification";
import ItemCard from "@/components/ItemCard";
import ItemRow from "@/components/ItemRow";
import ItemsListHeader from "@/components/ItemsListHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/Pagination";
import { clearPoleDeleteState } from "@/features/pola/polaSlice";
import { polaThunk } from "@/features/pola/polaThunk";
import PolaSchema from "@/features/pola/types/PolaSchema";
import LoadingState from "@/types/LoadingState";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemsList = () => {
  const dispatch = useAppDispatch();
  const { pola, poleRemoveState } = useAppSelector(state => state.pola);
  const [items, setItems] = useState<PolaSchema[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [itemToDelete, setItemToDelete] = useState<PolaSchema | null>(null);

  const nav = useNavigate();

  useEffect(() => {
    dispatch(polaThunk.getAll());
  }, []);

  useEffect(() => {
    if (pola.state.loading === LoadingState.SUCCEEDED) {
      const newItems = Object.values(pola.data);
      setItems(newItems);

      // Sprawdź, czy obecna strona powinna zostać zmieniona
      const newTotalPages = Math.ceil(newItems.length / itemsPerPage);

      // Jeśli obecna strona jest większa niż nowa całkowita liczba stron
      // i jest większa niż 1, przenieś do poprzedniej strony
      if (currentPage > newTotalPages && currentPage > 1) {
        setCurrentPage(Math.max(1, newTotalPages));
      }
    }
  }, [pola.state.loading]);

  // Funkcje obsługujące akcje
  const handleViewDetails = (item: any) => {
    nav(`/dashboard/pola/${item.id}`);
  };

  const handleEdit = (item: any) => {
    nav(`/dashboard/pola/${item.id}/edit`);
  };

  const displayDeleteConfirmation = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item) {
      setItemToDelete(item);
    }
  };

  const closeDeleteConfirmation = () => {
    setItemToDelete(null);
  };

  const afterDelete = () => {
    setItemToDelete(null);
    dispatch(clearPoleDeleteState());
    dispatch(polaThunk.getAll());
  };

  const handleDelete = (id: string) => {
    dispatch(polaThunk.remove(id));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Obliczenia związane z paginacją
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  if (pola.state.loading === LoadingState.PENDING) {
    return <LoadingSpinner />;
  }
  return (
    <div className="bg-white rounded-lg shadow p-6 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-6">Lista pól</h2>
        <button
          onClick={() => nav("/dashboard/pola/add")}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer flex items-center gap-2"
        >
          <CirclePlus size={20} /> Dodaj nowy
        </button>
      </div>
      <div className="block sm:hidden">
        {currentItems &&
          currentItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onDelete={displayDeleteConfirmation}
              titles={["Nazwa", "Rozmiar", "Lokalizacja"]}
            />
          ))}
      </div>

      <div className="hidden sm:block  overflow-x-auto">
        <table className="min-w-full bg-white">
          <ItemsListHeader items={["Nazwa", "Rozmiar", "Lokalizacja"]} />
          <tbody>
            {currentItems.map((item: PolaSchema) => (
              <ItemRow
                key={item.id}
                item={item}
                onViewDetails={handleViewDetails}
                onEdit={handleEdit}
                onDelete={displayDeleteConfirmation}
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {itemToDelete && (
        <DeleteConfirmationAndNotification
          item={itemToDelete}
          onBack={closeDeleteConfirmation}
          onDelete={handleDelete}
          afterDelete={afterDelete}
          loadingState={poleRemoveState.loading}
        />
      )}
    </div>
  );
};

export default ItemsList;
