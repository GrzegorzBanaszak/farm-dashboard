import React from "react";

// Typ generyczny dla enuma, rozszerzony o możliwość wartości null
type EnumSelectProps<T extends string | number> = {
  label: string;
  options: Record<string, T>;
  value: T | null;
  onChange: (value: T | null) => void;
  name?: string;
  id?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  allowNull?: boolean; // Nowy parametr określający, czy null jest dozwoloną wartością
  nullLabel?: string; // Etykieta dla opcji null
};

// Zmodyfikowany komponent EnumSelect
export const EnumSelect = <T extends string | number>({
  label,
  options,
  value,
  onChange,
  name,
  id,
  required = false,
  className = "",
  placeholder = "Wybierz opcję",
  disabled = false,
  allowNull = true, // Domyślnie pozwalamy na wartość null
  nullLabel = "Brak wartości", // Domyślna etykieta dla opcji null
}: EnumSelectProps<T>) => {
  // Konwertuje enum na tablicę par [klucz, wartość]
  const enumEntries = Object.entries(options).filter(
    ([key]) => isNaN(Number(key)) // Filtruje numeryczne klucze, które są automatycznie generowane dla enumów numerycznych
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    // Jeśli wybrano pustą wartość (reprezentującą null)
    if (selectedValue === "") {
      onChange(null);
    } else {
      // Konwersja wartości na odpowiedni typ
      const newValue = selectedValue as unknown as T;
      onChange(newValue);
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={id || name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id || name}
        name={name}
        value={value === null ? "" : (value as string)}
        onChange={handleChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required={required}
        disabled={disabled}
      >
        {/* Opcja placeholder, wyświetlana gdy nie wybrano wartości */}
        <option value="" disabled={!allowNull}>
          {placeholder}
        </option>

        {/* Opcja null, jeśli jest dozwolona */}
        {allowNull && <option value="">{nullLabel}</option>}

        {/* Opcje z enuma */}
        {enumEntries.map(([key, val]) => (
          <option key={key} value={val as string}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
