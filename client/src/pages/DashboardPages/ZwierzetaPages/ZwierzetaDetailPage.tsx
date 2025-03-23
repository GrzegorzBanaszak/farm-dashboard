import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ItemDetails from "@/components/ItemDetails";
import { zwierzetaThunk } from "@/features/zwierzeta/zwierzetaThunk";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ZwierzetaDetailDisplay from "./components/ZwierzetaDetaliDisplay";
import DeleteConfirmationAndNotification from "@/components/DeleteConfirmationAndNotification";
import { resetRemoveZwierzetaState } from "@/features/zwierzeta/zwierzetaSlice";

const ZwierzetaDetailPage = () => {
  const { itemId = "" } = useParams();
  const dispatch = useAppDispatch();
  const { zwierzetaDetails, zwierzetaRemoveState } = useAppSelector(
    (state) => state.zwierzeta
  );
  const nav = useNavigate();
  const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
    useState(false);

  const handleBack = () => {
    nav(-1);
  };

  const handleEdit = (itemId: string) => {
    nav(`/dashboard/zwierzeta/${itemId}/edit`);
  };
  const toggleDeleteConfirmation = () => {
    setDisplayDeleteConfirmation((state) => !state);
  };

  useEffect(() => {
    dispatch(zwierzetaThunk.getOne(itemId));
  }, []);

  const afterDelete = () => {
    dispatch(resetRemoveZwierzetaState());
    nav("/dashboard/zwierzeta");
  };

  const handleDelete = (itemId: string) => {
    dispatch(zwierzetaThunk.remove(itemId));
  };

  return (
    <>
      <ItemDetails
        itemId={itemId}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={toggleDeleteConfirmation}
        detailComponent={
          <ZwierzetaDetailDisplay item={zwierzetaDetails.data} />
        }
        loadingState={zwierzetaDetails.state.loading}
        item={zwierzetaDetails.data}
      />
      {displayDeleteConfirmation && (
        <DeleteConfirmationAndNotification
          item={zwierzetaDetails.data}
          onBack={toggleDeleteConfirmation}
          onDelete={handleDelete}
          afterDelete={afterDelete}
          loadingState={zwierzetaRemoveState.loading}
        />
      )}
    </>
  );
};

export default ZwierzetaDetailPage;
