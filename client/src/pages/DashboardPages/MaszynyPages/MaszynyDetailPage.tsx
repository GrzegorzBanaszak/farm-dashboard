import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearMaszynyRemoveState } from "@/features/maszyny/maszynySlice";
import { maszynyThunk } from "@/features/maszyny/maszynyThunk";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MaszynyDetailDisplay from "./components/MaszynyDetailDisplay";
import DeleteConfirmationAndNotification from "@/components/DeleteConfirmationAndNotification";
import ItemDetails from "@/components/ItemDetails";

const MaszynyDetailPage = () => {
  const { itemId = "" } = useParams();
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);
  const { maszynaDetails, maszynaRemoveState } = useAppSelector(
    state => state.maszyny
  );

  const getItemDetails = async () => {
    await dispatch(maszynyThunk.getOne(itemId));
  };

  useEffect(() => {
    getItemDetails();
  }, []);

  const handleBack = () => {
    nav(-1);
  };

  const handleEdit = (itemId: string) => {
    nav(`/dashboard/maszyny/${itemId}/edit`);
  };

  const toggleDeleteConfirmation = () => {
    setDisplayDeleteConfirmation(state => !state);
  };

  const afterDelete = () => {
    dispatch(clearMaszynyRemoveState());
    nav("/dashboard/maszyny");
  };

  const handleDelete = (itemId: string) => {
    dispatch(maszynyThunk.remove(itemId));
  };
  return (
    <>
      <ItemDetails
        itemId={itemId}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={toggleDeleteConfirmation}
        detailComponent={<MaszynyDetailDisplay item={maszynaDetails.data} />}
        loadingState={maszynaDetails.state.loading}
        item={maszynaDetails.data}
      />
      {displayDeleteConfirmation && (
        <DeleteConfirmationAndNotification
          item={{
            name: maszynaDetails.data.name,
            id: maszynaDetails.data.id,
            type: maszynaDetails.data.type,
            purchaseDate: maszynaDetails.data.purchaseDate,
            condition: maszynaDetails.data.condition,
          }}
          onBack={toggleDeleteConfirmation}
          onDelete={handleDelete}
          afterDelete={afterDelete}
          loadingState={maszynaRemoveState.loading}
        />
      )}
    </>
  );
};

export default MaszynyDetailPage;
