const GlassCard = ({ 
  children, 
  className = "", 
  hover = true, 
  padding = "p-6",
  background = "glass-card"
}) => {
  return (
    <div 
      className={`
        ${background} 
        ${padding} 
        rounded-2xl 
        shadow-lg 
        ${hover ? 'hover-lift card-hover' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;