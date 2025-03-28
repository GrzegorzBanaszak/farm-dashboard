import { useAppDispatch, useAppSelector } from "@/app/hooks";
import EditNotification from "@/components/EditNotification";
import { EnumSelect } from "@/components/EnumSelect";
import ErrorNotification from "@/components/ErrorNotification";
import FormField from "@/components/FormField";
import ItemSelector from "@/components/ItemSelector";
import LoadingSpinner from "@/components/LoadingSpinner";
import { polaThunk } from "@/features/pola/polaThunk";
import AddUprawySchema from "@/features/uprawy/types/AddUprawySchema";
import EditUprawySchema from "@/features/uprawy/types/EditUprawySchema";
import { UprawyType } from "@/features/uprawy/types/UprawyType";
import {
  clearUprawyAddState,
  clearUprawyEditState,
} from "@/features/uprawy/uprawySlice";
import { uprawyThunk } from "@/features/uprawy/uprawyThunk";
import useConvert from "@/hooks/useConvert";
import useFormChangeHandler from "@/hooks/useFormChangeHandler";
import LoadingState from "@/types/LoadingState";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UprawyEditPage = () => {
  const { itemId } = useParams();
  const { uprawyDetails, uprawyUpdateState } = useAppSelector(
    state => state.uprawy
  );
  const { pola } = useAppSelector(state => state.pola);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<EditUprawySchema>({
    type: UprawyType.KUKURYDZA,
    plantedAt: "",
    harvestedAt: null,
    yield: null,
    fieldId: "",
  });
  const [fields, setFields] = useState<{ name: string; id: string }[]>([]);
  const { isoStringToDateInputValue } = useConvert();

  //Pobranie listy pól
  useEffect(() => {
    dispatch(polaThunk.getAll());
    if (itemId) {
      dispatch(uprawyThunk.getOne(itemId));
    }
  }, []);

  useEffect(() => {
    if (pola.state.loading === LoadingState.SUCCEEDED) {
      setFields(
        Object.values(pola.data).map(field => {
          return {
            name: field.name,
            id: field.id,
          };
        })
      );
    }
  }, [pola.state.loading]);

  useEffect(() => {
    if (uprawyDetails.state.loading === LoadingState.SUCCEEDED) {
      setItem({
        type: uprawyDetails.data.type,
        plantedAt: isoStringToDateInputValue(uprawyDetails.data.plantedAt),
        harvestedAt:
          uprawyDetails.data.harvestedAt &&
          isoStringToDateInputValue(uprawyDetails.data.harvestedAt),
        yield: uprawyDetails.data.yield,
        fieldId: uprawyDetails.data.field.id,
      });
    }
  }, [uprawyDetails.state.loading]);

  const { handleChange, handleEnumSelectChange } =
    useFormChangeHandler<AddUprawySchema>(setItem);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(uprawyThunk.update({ id: itemId!, dataToUpdate: item }));
  };

  const setFieldId = (id: string) =>
    setItem(prev => ({ ...prev, fieldId: id }));
  const handleBack = () => {
    dispatch(clearUprawyEditState());
    nav("/dashboard/uprawy");
  };

  if (uprawyUpdateState.loading === LoadingState.SUCCEEDED) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <EditNotification message="Uprawa została dodana" close={handleBack} />
      </div>
    );
  }

  if (uprawyUpdateState.loading === LoadingState.PENDING) {
    return <LoadingSpinner />;
  }

  if (pola.state.loading === LoadingState.PENDING) {
    return <LoadingSpinner />;
  }

  if (uprawyUpdateState.loading === LoadingState.FAILED) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <ErrorNotification
          errorMessage={uprawyUpdateState.messages}
          close={() => {
            dispatch(clearUprawyEditState());
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Dodanie nowej uprawy</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <EnumSelect
          label="Gatunek zwierzeta"
          options={UprawyType}
          value={item.type}
          id="type"
          name="type"
          onChange={value => handleEnumSelectChange("type", value)}
          required={true}
        />
        <FormField
          id="plantedAt"
          name="plantedAt"
          label="Data zasiana"
          type="date"
          value={item.plantedAt}
          onChange={handleChange}
          required={true}
        />
        <FormField
          id="harvestedAt"
          name="harvestedAt"
          label="Data zbioru"
          type="date"
          value={item.harvestedAt}
          onChange={handleChange}
          required={false}
        />
        <FormField
          id="yield"
          name="yield"
          label="Zebrano z pola"
          type="number"
          value={item.yield}
          onChange={handleChange}
          required={false}
        />

        <ItemSelector
          items={fields}
          placeholder="Wybierz pole"
          defaultSearchTerm={pola.data[item.fieldId]?.name}
          label="Pole"
          required
          onItemSelect={setFieldId}
        />

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            onClick={handleBack}
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Zapisz
          </button>
        </div>
      </form>
    </div>
  );
};

export default UprawyEditPage;
