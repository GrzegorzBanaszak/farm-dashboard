import React, { useState, useRef, useEffect } from "react";

export type SelectOption = { name: string; id: string };

interface ItemSelectorProps {
  items: SelectOption[];
  placeholder: string;
  onItemSelect: (item: string) => void;
  label: string;
  required?: boolean;
  defaultSearchTerm: string;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
  items,
  placeholder,
  label,
  onItemSelect,
  defaultSearchTerm = "",
  required = false,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(defaultSearchTerm);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(
    defaultSearchTerm !== ""
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filtracja listy przedmiotów
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Zamykanie dropdown po kliknięciu poza
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isSelected) {
      onItemSelect("");
      setIsSelected(false);
    }
    setSearchTerm(value);
    setIsDropdownOpen(value.length > 0);
  };

  const handleItemSelect = (item: any) => {
    setSearchTerm(item.name);
    setIsDropdownOpen(false);
    setIsSelected(true);

    // Opcjonalne wywołanie callbacka, jeśli został przekazany
    onItemSelect(item.id);
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />

      {isDropdownOpen && filteredItems.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemSelect(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemSelector;
