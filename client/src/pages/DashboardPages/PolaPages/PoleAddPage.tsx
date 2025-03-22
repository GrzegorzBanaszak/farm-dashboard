import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ErrorNotification from "@/components/ErrorNotification";
import FormField from "@/components/FormField";
import LoadingSpinner from "@/components/LoadingSpinner";
import SuccessNotification from "@/components/SuccessNotification";
import { clearPoleAddState } from "@/features/pola/polaSlice";
import { polaThunk } from "@/features/pola/polaThunk";
import AddPoleSchema from "@/features/pola/types/AddPoleSchema";
import LoadingState from "@/types/LoadingState";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const PoleAddPage: React.FC = () => {
  const { poleCreateState } = useAppSelector((state) => state.pola);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<AddPoleSchema>({
    name: "",
    size: 0,
    location: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: name === "size" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(polaThunk.create(item));
  };

  const handleBack = () => {
    dispatch(clearPoleAddState());
    nav("/dashboard/pola");
  };

  if (poleCreateState.loading === LoadingState.SUCCEEDED) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <SuccessNotification message="Pole zostało dodane" close={handleBack} />
      </div>
    );
  }

  if (poleCreateState.loading === LoadingState.PENDING) {
    return <LoadingSpinner />;
  }

  if (poleCreateState.loading === LoadingState.FAILED) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <ErrorNotification
          errorMessage={poleCreateState.messages}
          close={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Dodanie nowego pola</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          id="name"
          name="name"
          label="Nazwa"
          value={item.name}
          onChange={handleChange}
          required={true}
        />

        <FormField
          id="size"
          name="size"
          label="Rozmiar"
          value={item.size}
          onChange={handleChange}
          required={true}
          type="number"
        />

        <FormField
          id="location"
          name="location"
          label="Lokalizacja"
          value={item.location}
          onChange={handleChange}
          required={true}
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

export default PoleAddPage;
