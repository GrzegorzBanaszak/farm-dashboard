import React, { ChangeEvent } from "react";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string | number | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  type = "text",
}) => {
  // Konwertuje null na pusty string dla pola input
  const inputValue = value === null ? "" : value;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={inputValue}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        required={required}
      />
    </div>
  );
};

export default FormField;
