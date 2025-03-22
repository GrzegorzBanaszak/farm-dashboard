import ItemDetails from "@/components/ItemDetails";
import PolaDetailDisplay from "./components/PolaDetailDisplay";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { polaThunk } from "@/features/pola/polaThunk";
import DeleteConfirmationAndNotification from "@/components/DeleteConfirmationAndNotification";
import { clearPoleDeleteState } from "@/features/pola/polaSlice";

const PolaDetailPage = () => {
  // W rzeczywistej aplikacji ID byłoby pobierane z parametrów URL
  const { itemId = "" } = useParams();
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);
  const nav = useNavigate();
  const { poleDetails, poleRemoveState } = useAppSelector(
    (state) => state.pola
  );
  const dispatch = useAppDispatch();

  const getItemDetails = async () => {
    // W rzeczywistej aplikacji: pobierz szczegóły przedmiotu z serwera
    await dispatch(polaThunk.getOne(itemId));
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
    setDisplayDeleteConfirmation((state) => !state);
  };

  const afterDelete = () => {
    dispatch(clearPoleDeleteState());
    nav("/dashboard/pola");
  };

  const handleDelete = (itemId: string) => {
    dispatch(polaThunk.remove(itemId));
  };

  return (
    <>
      <ItemDetails
        itemId={itemId}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={toggleDeleteConfirmation}
        detailComponent={<PolaDetailDisplay item={poleDetails.data} />}
        loadingState={poleDetails.state.loading}
        item={poleDetails.data}
      />
      {displayDeleteConfirmation && (
        <DeleteConfirmationAndNotification
          item={{
            name: poleDetails.data.name,
            id: poleDetails.data.id,
            size: poleDetails.data.size,
            location: poleDetails.data.location,
          }}
          onBack={toggleDeleteConfirmation}
          onDelete={handleDelete}
          afterDelete={afterDelete}
          loadingState={poleRemoveState.loading}
        />
      )}
    </>
  );
};

export default PolaDetailPage;
