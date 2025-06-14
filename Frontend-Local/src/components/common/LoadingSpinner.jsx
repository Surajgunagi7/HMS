const LoadingSpinner = ({ size = "md", color = "blue" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const colorClasses = {
    blue: "border-blue-500",
    white: "border-white",
    gray: "border-gray-500",
    green: "border-green-500",
    red: "border-red-500"
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizeClasses[size]} border-2 border-t-transparent ${colorClasses[color]} rounded-full animate-spin`}
      />
    </div>
  );
};

export default LoadingSpinner;