import { ChangeEvent } from "react";

function useFormChangeHandler<T>(
  setItem: React.Dispatch<React.SetStateAction<T>>
) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: name === "size" ? Number(value) : value,
    }));
  };

  const handleEnumSelectChange = (fieldName: any, value: any) => {
    setItem((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return { handleChange, handleEnumSelectChange };
}

export default useFormChangeHandler;
