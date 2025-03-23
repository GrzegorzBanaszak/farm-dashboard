import { useAppDispatch, useAppSelector } from "@/app/hooks";
import DeleteConfirmationAndNotification from "@/components/DeleteConfirmationAndNotification";
import ItemCard from "@/components/ItemCard";
import ItemRow from "@/components/ItemRow";
import ItemsListHeader from "@/components/ItemsListHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/Pagination";
import { clearMaszynyRemoveState } from "@/features/maszyny/maszynySlice";
import { maszynyThunk } from "@/features/maszyny/maszynyThunk";
import MaszynySchema from "@/features/maszyny/types/MaszynySchema";
import LoadingState from "@/types/LoadingState";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const page = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { maszyny, maszynaRemoveState } = useAppSelector(
    state => state.maszyny
  );
  const [items, setItems] = useState<MaszynySchema[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [itemToDelete, setItemToDelete] = useState<MaszynySchema | null>(null);

  // Obliczenia związane z paginacją
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Funkcje obsługujące akcje
  const handleViewDetails = (item: any) => {
    nav(`/dashboard/maszyny/${item.id}`);
  };

  const handleEdit = (item: any) => {
    nav(`/dashboard/maszyny/${item.id}/edit`);
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
    dispatch(clearMaszynyRemoveState());
    dispatch(maszynyThunk.getAll());
  };

  const handleDelete = (id: string) => {
    dispatch(maszynyThunk.remove(id));
  };

  useEffect(() => {
    dispatch(maszynyThunk.getAll());
  }, []);

  useEffect(() => {
    if (maszyny.state.loading === LoadingState.SUCCEEDED) {
      const newItems = Object.values(maszyny.data);
      setItems(newItems);

      // Sprawdź, czy obecna strona powinna zostać zmieniona
      const newTotalPages = Math.ceil(newItems.length / itemsPerPage);

      // Jeśli obecna strona jest większa niż nowa całkowita liczba stron
      // i jest większa niż 1, przenieś do poprzedniej strony
      if (currentPage > newTotalPages && currentPage > 1) {
        setCurrentPage(Math.max(1, newTotalPages));
      }
    }
  }, [maszyny.state.loading]);

  if (maszyny.state.loading === LoadingState.PENDING) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-6">Lista zwierząt</h2>
        <button
          onClick={() => nav("/dashboard/maszyny/add")}
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
              titles={[
                "Imię",
                "Gatunek",
                "Data urodzenia",
                "Stan zdrowia",
                "Numer zwierzecia",
              ]}
            />
          ))}
      </div>

      <div className="hidden sm:block  overflow-x-auto">
        <table className="min-w-full bg-white">
          <ItemsListHeader
            items={["Nazwa maszyny", "Typ", "Data zakupu", "Stan "]}
          />
          <tbody>
            {currentItems.map((item: MaszynySchema) => (
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
          loadingState={maszynaRemoveState.loading}
        />
      )}
    </div>
  );
};

export default page;
