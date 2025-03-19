import ItemDetails from "@/components/ItemDetails";
import PolaDetailDisplay from "./components/PolaDetailDisplay";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { polaThunk } from "@/features/pola/polaThunk";

const PolaDetailPage = () => {
  // W rzeczywistej aplikacji ID byłoby pobierane z parametrów URL
  const { itemId = "" } = useParams();
  const nav = useNavigate();
  const { poleDetails } = useAppSelector((state) => state.pole);
  const dispatch = useAppDispatch();

  const getItemDetails = async () => {
    // W rzeczywistej aplikacji: pobierz szczegóły przedmiotu z serwera
    await dispatch(polaThunk.getOne(itemId));
  };
  useEffect(() => {
    getItemDetails();
  }, []);

  const handleBack = () => {
    nav("/dashboard/pola");
  };

  const handleEdit = (item: any) => {
    console.log("Edytuj przedmiot:", item);
    // W rzeczywistej aplikacji: navigate(`/items/${item.id}/edit`);
  };

  const handleDelete = (itemId: string) => {
    console.log("Usuń przedmiot o ID:", itemId);
    // W rzeczywistej aplikacji: pokazałby się dialog potwierdzenia
  };

  return (
    <ItemDetails
      itemId={itemId}
      onBack={handleBack}
      onEdit={handleEdit}
      onDelete={handleDelete}
      detailComponent={<PolaDetailDisplay item={poleDetails.data} />}
      loading={false}
      item={poleDetails}
    />
  );
};

export default PolaDetailPage;
