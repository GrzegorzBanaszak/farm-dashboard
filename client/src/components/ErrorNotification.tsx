import { FC } from "react";

interface ErrorNotificationProps {
  errorMessage: string[];
  close: () => void;
}

const ErrorNotification: FC<ErrorNotificationProps> = ({
  errorMessage,
  close,
}) => {
  return (
    <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 rounded-md flex items-start">
      <div className="text-red-500 mr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <div className="flex-grow">
        <p className="text-red-800 font-medium">
          Błąd podczas dodawania elementu
        </p>
        {errorMessage.map((error, index) => (
          <p key={index} className="text-red-600 text-sm mt-1">
            {error}
          </p>
        ))}
      </div>
      <button
        onClick={close}
        className="text-red-500 hover:text-red-700 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default ErrorNotification;
