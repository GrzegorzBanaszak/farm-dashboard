import { useAppDispatch, useAppSelector } from "@/app/hooks";
import EditNotification from "@/components/EditNotification";
import { EnumSelect } from "@/components/EnumSelect";
import ErrorNotification from "@/components/ErrorNotification";
import FormField from "@/components/FormField";
import LoadingSpinner from "@/components/LoadingSpinner";
import UpdateZwierzetaSchema from "@/features/zwierzeta/types/UpdateZwierzetaSchema";
import { ZwierzetaHealthStatus } from "@/features/zwierzeta/types/ZwierzetaHealthStatus";
import { ZwierzetaSpices } from "@/features/zwierzeta/types/ZwierzetaSpices";
import { resetUpdateZwierzetaState } from "@/features/zwierzeta/zwierzetaSlice";
import { zwierzetaThunk } from "@/features/zwierzeta/zwierzetaThunk";
import useConvert from "@/hooks/useConvert";
import useFormChangeHandler from "@/hooks/useFormChangeHandler";
import LoadingState from "@/types/LoadingState";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ZwierzetaEditPage = () => {
  const { itemId } = useParams();
  const { zwierzetaUpdateState, zwierzetaDetails } = useAppSelector(
    (state) => state.zwierzeta
  );
  const { stringToEnum, isoStringToDateInputValue } = useConvert();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<UpdateZwierzetaSchema>({
    name: "",
    specie: ZwierzetaSpices.KROWA,
    health: ZwierzetaHealthStatus.DOSKONALY,
    number: 0,
    birthDate: "",
  });

  useEffect(() => {
    if (!itemId) return;

    dispatch(zwierzetaThunk.getOne(itemId));
  }, []);

  useEffect(() => {
    if (zwierzetaDetails.state.loading === LoadingState.SUCCEEDED) {
      setItem({
        name: zwierzetaDetails.data.name,
        specie: stringToEnum(ZwierzetaSpices, zwierzetaDetails.data.specie)!,
        health: stringToEnum(
          ZwierzetaHealthStatus,
          zwierzetaDetails.data.health
        )!,
        number: zwierzetaDetails.data.number,
        birthDate: isoStringToDateInputValue(
          zwierzetaDetails.data.birthDate as string
        ),
      });
    }
  }, [zwierzetaDetails.data]);

  const { handleChange, handleEnumSelectChange } =
    useFormChangeHandler<UpdateZwierzetaSchema>(setItem);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(zwierzetaThunk.update({ id: itemId!, dataToUpdate: item }));
  };

  const handleBack = () => {
    dispatch(resetUpdateZwierzetaState());
    nav("/dashboard/zwierzeta");
  };

  if (zwierzetaUpdateState.loading === LoadingState.SUCCEEDED) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <EditNotification message="Pole zostało dodane" close={handleBack} />
      </div>
    );
  }

  if (zwierzetaDetails.state.loading === LoadingState.PENDING) {
    return <LoadingSpinner />;
  }

  if (zwierzetaDetails.state.loading === LoadingState.FAILED) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <ErrorNotification
          errorMessage={zwierzetaUpdateState.messages}
          close={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edycja zwierzęcia</h2>

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
          id="number"
          name="number"
          label="Numer zwierzeta"
          value={item.number}
          onChange={handleChange}
          required={true}
        />
        <FormField
          id="birthDate"
          name="birthDate"
          type="date"
          label="Data urodzenia"
          value={item.birthDate}
          onChange={handleChange}
          required={false}
        />
        <EnumSelect
          label="Gatunek zwierzeta"
          options={ZwierzetaSpices}
          value={item.specie}
          id="specie"
          name="specie"
          onChange={(value) => handleEnumSelectChange("specie", value)}
          required={true}
        />
        <EnumSelect
          label="Stan zdrowia"
          options={ZwierzetaHealthStatus}
          value={item.health!}
          id="health"
          name="health"
          onChange={(value) => handleEnumSelectChange("health", value)}
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

export default ZwierzetaEditPage;
