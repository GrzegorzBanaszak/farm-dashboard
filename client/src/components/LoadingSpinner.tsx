const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full md:h-full h-screen">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-6 border-gray-200"></div>
        <div className="w-24 h-24 rounded-full border-6 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0 animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
