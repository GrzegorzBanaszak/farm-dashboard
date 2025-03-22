import { FC } from "react";

interface EditNotificationProps {
  message: string;
  close: () => void;
}

const EditNotification: FC<EditNotificationProps> = ({ message, close }) => {
  return (
    <div className="mt-4 p-4 bg-purple-100 border-l-4 border-purple-500 rounded-md flex items-start">
      <div className="text-purple-500 mr-3">
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
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      </div>
      <div className="flex-grow">
        <p className="text-purple-800 font-medium">
          Element został zaktualizowany
        </p>
        <p className="text-purple-600 text-sm mt-1">
          Zmiany wprowadzone dla {message}
        </p>
      </div>
      <button
        onClick={close}
        className="text-purple-500 hover:text-purple-700 cursor-pointer"
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

export default EditNotification;
