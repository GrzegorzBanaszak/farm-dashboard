import { FC } from "react";

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const PaginationButton: FC<PaginationButtonProps> = ({
  onClick,
  disabled,
  children,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded flex items-center justify-center ${
      disabled
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer"
    }`}
  >
    {children}
  </button>
);
export default PaginationButton;
