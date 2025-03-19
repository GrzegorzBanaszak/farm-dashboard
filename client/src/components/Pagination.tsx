import { ChevronLeft, ChevronRight } from "lucide-react";
import PaginationButton from "./PaginationButton";
import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600">
        Strona {currentPage} z {totalPages}
      </div>
      <div className="flex space-x-2 ">
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
          <span className="ml-1">Poprzednia</span>
        </PaginationButton>

        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="mr-1">Następna</span>
          <ChevronRight size={16} />
        </PaginationButton>
      </div>
    </div>
  );
};

export default Pagination;
