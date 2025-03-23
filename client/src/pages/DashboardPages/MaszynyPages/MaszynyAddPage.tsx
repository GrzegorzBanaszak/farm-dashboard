import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { EnumSelect } from "@/components/EnumSelect";
import ErrorNotification from "@/components/ErrorNotification";
import FormField from "@/components/FormField";
import SuccessNotification from "@/components/SuccessNotification";
import { clearMaszynyAddState } from "@/features/maszyny/maszynySlice";
import { maszynyThunk } from "@/features/maszyny/maszynyThunk";
import AddMaszynySchema from "@/features/maszyny/types/AddMaszynySchema";
import { MachineCondition } from "@/features/maszyny/types/MachineCondition";
import useFormChangeHandler from "@/hooks/useFormChangeHandler";
import LoadingState from "@/types/LoadingState";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const MaszynyAddPage = () => {
  const { maszynaCreateState } = useAppSelector(state => state.maszyny);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<AddMaszynySchema>({
    name: "",
    type: "",
    purchaseDate: null,
    condition: null,
  });

  const { handleChange, handleEnumSelectChange } =
    useFormChangeHandler<AddMaszynySchema>(setItem);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(maszynyThunk.create(item));
  };

  const handleBack = () => {
    dispatch(clearMaszynyAddState());
    nav("/dashboard/maszyny");
  };

  if (maszynaCreateState.loading === LoadingState.SUCCEEDED) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <SuccessNotification
          message="Maszyna zostało dodane"
          close={handleBack}
        />
      </div>
    );
  }

  if (maszynaCreateState.loading === LoadingState.FAILED) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <ErrorNotification
          errorMessage={maszynaCreateState.messages}
          close={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Dodanie nowego zwierzęcia</h2>

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

export default MaszynyAddPage;
