export default function BaseLogo({ size = "md", showText = true, className = "" }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-base",
    md: "w-12 h-12 text-2xl",
    lg: "w-12 h-12 text-2xl",
    xl: "w-16 h-16 text-3xl"
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className={`relative flex items-center justify-center rounded-full bg-[#6155F5] text-white ${sizeClasses[size] || sizeClasses.md}`}>
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full p-1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 27 L15 31 L33 18 L45 26"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="15" cy="31" r="3" fill="white" />
          <circle cx="33" cy="18" r="3" fill="white" />
        </svg>
      </div>
      {showText && (
        <span className="font-medium text-[#10102D] tracking-tight font-sans">
          Base
        </span>
      )}
    </div>
  );
}
