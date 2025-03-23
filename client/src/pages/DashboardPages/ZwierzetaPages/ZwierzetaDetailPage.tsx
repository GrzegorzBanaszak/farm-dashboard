import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ItemDetails from "@/components/ItemDetails";
import { zwierzetaThunk } from "@/features/zwierzeta/zwierzetaThunk";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ZwierzetaDetailDisplay from "./components/ZwierzetaDetaliDisplay";

const ZwierzetaDetailPage = () => {
  const { itemId = "" } = useParams();
  const dispatch = useAppDispatch();
  const { zwierzetaDetails } = useAppSelector((state) => state.zwierzeta);
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

  return (
    <ItemDetails
      itemId={itemId}
      onBack={handleBack}
      onEdit={handleEdit}
      onDelete={toggleDeleteConfirmation}
      detailComponent={<ZwierzetaDetailDisplay item={zwierzetaDetails.data} />}
      loadingState={zwierzetaDetails.state.loading}
      item={zwierzetaDetails.data}
    />
  );
};

export default ZwierzetaDetailPage;
