import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ItemCard from "@/components/ItemCard";
import ItemRow from "@/components/ItemRow";
import ItemsListHeader from "@/components/ItemsListHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/Pagination";
import ZwierzetaSchema from "@/features/zwierzeta/types/ZwierzetaSchema";
import { zwierzetaThunk } from "@/features/zwierzeta/zwierzetaThunk";
import LoadingState from "@/types/LoadingState";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const page = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { zwierzeta } = useAppSelector((state) => state.zwierzeta);
  const [items, setItems] = useState<ZwierzetaSchema[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [itemToDelete, setItemToDelete] = useState<ZwierzetaSchema | null>(
    null
  );

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
    nav(`/dashboard/zwierzeta/${item.id}`);
  };

  const handleEdit = (item: any) => {
    nav(`/dashboard/zwierzeta/${item.id}/edit`);
  };

  const displayDeleteConfirmation = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setItemToDelete(item);
    }
  };

  // const closeDeleteConfirmation = () => {
  //   setItemToDelete(null);
  // };

  // const afterDelete = () => {
  //   setItemToDelete(null);
  //   dispatch(clearPoleDeleteState());
  //   dispatch(polaThunk.getAll());
  // };

  // const handleDelete = (id: string) => {
  //   dispatch(polaThunk.remove(id));
  // };

  useEffect(() => {
    dispatch(zwierzetaThunk.getAll());
  }, []);

  useEffect(() => {
    if (zwierzeta.state.loading === LoadingState.SUCCEEDED) {
      setItems(Object.values(zwierzeta.data));
    }
  }, [zwierzeta.state.loading]);

  if (zwierzeta.state.loading === LoadingState.PENDING) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-6">Lista zwierząt</h2>
        <button
          onClick={() => nav("/dashboard/zwierzeta/add")}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer flex items-center gap-2"
        >
          <CirclePlus size={20} /> Dodaj nowy
        </button>
      </div>
      <div className="block sm:hidden">
        {currentItems &&
          currentItems.map((item) => (
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
            items={[
              "Imię",
              "Gatunek",
              "Data urodzenia",
              "Stan zdrowia",
              "Numer zwierzecia",
            ]}
          />
          <tbody>
            {currentItems.map((item: ZwierzetaSchema) => (
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

      {/* {itemToDelete && (
        <DeleteConfirmationAndNotification
          item={itemToDelete}
          onBack={closeDeleteConfirmation}
          onDelete={handleDelete}
          afterDelete={afterDelete}
          loadingState={poleRemoveState.loading}
        />
      )} */}
    </div>
  );
};

export default page;
