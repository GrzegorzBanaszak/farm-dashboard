import { useAppDispatch, useAppSelector } from "@/app/hooks";
import EditNotification from "@/components/EditNotification";
import ErrorNotification from "@/components/ErrorNotification";
import FormField from "@/components/FormField";
import LoadingSpinner from "@/components/LoadingSpinner";
import { clearEditState } from "@/features/pola/polaSlice";
import { polaThunk } from "@/features/pola/polaThunk";
import EditPoleSchema from "@/features/pola/types/EditPoleSchema";
import LoadingState from "@/types/LoadingState";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PoleEditPage: React.FC = () => {
  const { itemId } = useParams();
  const dispatch = useAppDispatch();
  const { poleDetails, poleUpdateState } = useAppSelector(
    (state) => state.pola
  );
  const nav = useNavigate();

  useEffect(() => {
    if (itemId) {
      dispatch(polaThunk.getOne(itemId));
    }
  }, []);

  useEffect(() => {
    if (poleDetails.data) {
      setItem({
        name: poleDetails.data.name,
        size: poleDetails.data.size,
        location: poleDetails.data.location,
      });
    }
  }, [poleDetails.data]);

  const [item, setItem] = useState<EditPoleSchema>({
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
    if (itemId) {
      dispatch(polaThunk.update({ id: itemId, data: item }));
    }
  };

  const handleBack = () => {
    dispatch(clearEditState());
    nav(-1);
  };

  const closeError = () => {
    dispatch(clearEditState());
  };

  if (poleDetails.state.loading === LoadingState.PENDING)
    return <LoadingSpinner />;

  if (poleUpdateState.loading === LoadingState.PENDING) {
    return <LoadingSpinner />;
  }

  if (poleUpdateState.loading === LoadingState.SUCCEEDED) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <EditNotification
          message="Pole zostało zaktualizowane"
          close={handleBack}
        />
      </div>
    );
  }

  if (poleUpdateState.loading === LoadingState.FAILED) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <ErrorNotification
          errorMessage={poleUpdateState.messages}
          close={closeError}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edycja pola</h2>

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

export default PoleEditPage;
