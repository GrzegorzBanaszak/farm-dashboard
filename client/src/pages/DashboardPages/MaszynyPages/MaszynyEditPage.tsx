import { useAppDispatch, useAppSelector } from "@/app/hooks";
import EditNotification from "@/components/EditNotification";
import { EnumSelect } from "@/components/EnumSelect";
import ErrorNotification from "@/components/ErrorNotification";
import FormField from "@/components/FormField";
import LoadingSpinner from "@/components/LoadingSpinner";
import { clearMaszynyEditState } from "@/features/maszyny/maszynySlice";
import { maszynyThunk } from "@/features/maszyny/maszynyThunk";
import { MachineCondition } from "@/features/maszyny/types/MachineCondition";
import UpdateMaszynySchema from "@/features/maszyny/types/UpdateMaszynySchema";
import useConvert from "@/hooks/useConvert";
import useFormChangeHandler from "@/hooks/useFormChangeHandler";
import LoadingState from "@/types/LoadingState";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MaszynyEditPage = () => {
  const { itemId } = useParams();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const { maszynaUpdateState, maszynaDetails } = useAppSelector(
    state => state.maszyny
  );
  const [item, setItem] = useState<UpdateMaszynySchema>({
    name: "",
    type: "",
    purchaseDate: "",
    condition: MachineCondition.NEW,
  });
  const { stringToEnum, isoStringToDateInputValue } = useConvert();
  const { handleChange, handleEnumSelectChange } =
    useFormChangeHandler<UpdateMaszynySchema>(setItem);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(maszynyThunk.update({ id: itemId!, data: item }));
  };

  const handleBack = () => {
    dispatch(clearMaszynyEditState());
    nav("/dashboard/maszyny");
  };

  useEffect(() => {
    dispatch(maszynyThunk.getOne(itemId!));
  }, []);

  useEffect(() => {
    if (maszynaDetails.state.loading === LoadingState.SUCCEEDED) {
      setItem({
        name: maszynaDetails.data.name,
        type: maszynaDetails.data.type,
        purchaseDate: isoStringToDateInputValue(
          maszynaDetails.data.purchaseDate as string
        ),
        condition: stringToEnum(
          MachineCondition,
          maszynaDetails.data.condition
        )!,
      });
    }
  }, [maszynaDetails.state.loading]);

  if (maszynaUpdateState.loading === LoadingState.SUCCEEDED) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <EditNotification
          message="Maszyna zostało zaktualizowana"
          close={handleBack}
        />
      </div>
    );
  }

  if (maszynaDetails.state.loading === LoadingState.PENDING) {
    return <LoadingSpinner />;
  }

  if (maszynaDetails.state.loading === LoadingState.FAILED) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <ErrorNotification
          errorMessage={maszynaUpdateState.messages}
          close={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edycja maszyny</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          id="name"
          name="name"
          label="Nazwa maszyny"
          value={item.name}
          onChange={handleChange}
          required={true}
        />
        <FormField
          id="type"
          name="type"
          label="Typ maszyny"
          value={item.type}
          onChange={handleChange}
          required={true}
        />
        <FormField
          id="purchaseDate"
          name="purchaseDate"
          type="date"
          label="Data urodzenia"
          value={item.purchaseDate}
          onChange={handleChange}
          required={false}
        />
        <EnumSelect
          label="Stan maszyny"
          options={MachineCondition}
          value={item.condition}
          id="condition"
          name="condition"
          onChange={value => handleEnumSelectChange("condition", value)}
          required={false}
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

export default MaszynyEditPage;
