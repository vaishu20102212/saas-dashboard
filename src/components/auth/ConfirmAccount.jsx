import React from 'react';
import { ThumbsUp } from 'lucide-react';

export default function ConfirmAccount({ onGoHome }) {
  return (
    <div className="min-h-screen w-full bg-[#F4F5F9] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 sm:p-12 space-y-6 text-center animate-in fade-in zoom-in-95">
        {/* Celebration Thumbs-Up Graphic with Confetti matching Screenshot 21 */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          {/* Confetti particles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Confetti ribbons */}
              <path d="M20 30 Q30 15 25 35" stroke="#FF4081" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M75 25 Q85 35 70 45" stroke="#FF9800" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M25 70 Q15 60 30 50" stroke="#AB47BC" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M80 65 Q90 75 75 80" stroke="#29B6F6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Stars */}
              <circle cx="20" cy="45" r="2" fill="#7E57C2" />
              <circle cx="85" cy="40" r="2.5" fill="#3F51B5" />
              <circle cx="35" cy="20" r="1.5" fill="#FF7043" />
              <circle cx="65" cy="18" r="2" fill="#26A69A" />
            </svg>
          </div>

          {/* Central soft purple circular disc */}
          <div className="w-24 h-24 rounded-full bg-[#ECEBFE] flex items-center justify-center shadow-inner">
            <div className="w-14 h-14 rounded-2xl bg-[#5B52F9] text-white flex items-center justify-center shadow-md shadow-indigo-300">
              <ThumbsUp size={28} className="fill-current" />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-[#1E1B3A]">
          Your account successfully created.
        </h2>

        <div className="pt-2">
          <button
            onClick={onGoHome}
            className="w-full py-3 px-6 bg-[#5B52F9] hover:bg-[#4a42db] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 transition-all active:scale-98"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
