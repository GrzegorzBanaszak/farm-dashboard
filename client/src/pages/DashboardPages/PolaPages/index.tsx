import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ItemCard from "@/components/ItemCard";
import ItemRow from "@/components/ItemRow";
import ItemsListHeader from "@/components/ItemsListHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/Pagination";
import { polaThunk } from "@/features/pola/polaThunk";
import PolaSchema from "@/features/pola/types/PolaSchema";
import LoadingState from "@/types/LoadingState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemsList = () => {
  const dispatch = useAppDispatch();
  const { pola } = useAppSelector((state) => state.pole);
  const [items, setItems] = useState<PolaSchema[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const nav = useNavigate();

  const getItems = async () => {
    await dispatch(polaThunk.getAll());
    if (pola.state.loading === LoadingState.SUCCEEDED && pola.data) {
      setItems(Object.values(pola.data));
    }
  };

  useEffect(() => {
    getItems();
  }, [pola.state.loading]);
  // Funkcje obsługujące akcje
  const handleViewDetails = (item: any) => {
    nav(`/dashboard/pola/${item.id}`);
  };

  const handleEdit = (item: any) => {
    console.log("Edytuj przedmiot:", item);
    // Tutaj można zaimplementować otwieranie formularza edycji
  };

  const handleDelete = (id: string) => {
    console.log("Usuń przedmiot o ID:", id);
    // Tutaj można zaimplementować potwierdzenie usunięcia i wywołanie API
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
      <h2 className="text-2xl font-semibold mb-6">Lista pól</h2>
      <div className="block sm:hidden">
        {currentItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
                onDelete={handleDelete}
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
    </div>
  );
};

export default ItemsList;
