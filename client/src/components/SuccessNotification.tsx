import { FC } from "react";

interface SuccessNotificationProps {
  message: string;
  close: () => void;
}

const SuccessNotification: FC<SuccessNotificationProps> = ({
  message,
  close,
}) => {
  return (
    <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 rounded-md flex items-start">
      <div className="text-green-500 mr-3">
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
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <div className="flex-grow">
        <p className="text-green-800 font-medium">{message}</p>
        <p className="text-green-600 text-sm mt-1">
          Element został zapisany w bazie danych
        </p>
      </div>
      <button
        onClick={close}
        className="text-green-500 hover:text-green-700 cursor-pointer"
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

export default SuccessNotification;
