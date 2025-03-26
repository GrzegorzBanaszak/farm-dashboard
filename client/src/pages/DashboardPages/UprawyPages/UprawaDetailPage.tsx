import { useAppDispatch, useAppSelector } from "@/app/hooks";
import DeleteConfirmationAndNotification from "@/components/DeleteConfirmationAndNotification";
import ItemDetails from "@/components/ItemDetails";
import { clearUprawyRemoveState } from "@/features/uprawy/uprawySlice";
import { uprawyThunk } from "@/features/uprawy/uprawyThunk";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UprawyDetailDisplay from "./components/UprawyDetailDisplay";

const UprawaDetailPage = () => {
  const { itemId = "" } = useParams();
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const { uprawyDetails, uprawyRemoveState } = useAppSelector(
    state => state.uprawy
  );

  const getItemDetails = async () => {
    // W rzeczywistej aplikacji: pobierz szczegóły przedmiotu z serwera
    await dispatch(uprawyThunk.getOne(itemId));
  };
  useEffect(() => {
    getItemDetails();
  }, []);

  const handleBack = () => {
    nav(-1);
  };

  const handleEdit = (itemId: string) => {
    nav(`/dashboard/pola/${itemId}/edit`);
  };

  const toggleDeleteConfirmation = () => {
    setDisplayDeleteConfirmation(state => !state);
  };

  const afterDelete = () => {
    dispatch(clearUprawyRemoveState());
    nav("/dashboard/uprawy");
  };

  const handleDelete = (itemId: string) => {
    dispatch(uprawyThunk.remove(itemId));
  };

  return (
    <>
      <ItemDetails
        itemId={itemId}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={toggleDeleteConfirmation}
        detailComponent={<UprawyDetailDisplay item={uprawyDetails.data} />}
        loadingState={uprawyDetails.state.loading}
        item={uprawyDetails.data}
      />
      {displayDeleteConfirmation && (
        <DeleteConfirmationAndNotification
          item={{
            field: uprawyDetails.data.field,
            id: uprawyDetails.data.id,
            plantedAt: uprawyDetails.data.plantedAt,
            harvestedAt: uprawyDetails.data.harvestedAt,
          }}
          onBack={toggleDeleteConfirmation}
          onDelete={handleDelete}
          afterDelete={afterDelete}
          loadingState={uprawyRemoveState.loading}
        />
      )}
    </>
  );
};

export default UprawaDetailPage;
