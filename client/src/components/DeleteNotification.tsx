import React from "react";

interface DeleteNotificationProps {
  closeNotification: () => void;
}

const DeleteNotification: React.FC<DeleteNotificationProps> = ({
  closeNotification,
}) => {
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-md shadow-lg flex items-start max-w-sm z-50">
      <div className="text-red-400 mr-3">
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
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </div>
      <div className="flex-grow">
        <p className="font-medium">Element został usunięty</p>
        <p className="text-gray-300 text-sm mt-1">
          Element został trwale usunięty z systemu.
        </p>
      </div>
      <button
        onClick={closeNotification}
        className="text-gray-400 hover:text-white"
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

export default DeleteNotification;
