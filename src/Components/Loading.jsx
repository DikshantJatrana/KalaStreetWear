// src/LoadingSpinner.js

import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        <div className="dot bg-primaryBlue animate-bounce delay-200"></div>
        <div className="dot bg-primaryPink animate-bounce delay-300"></div>
        <div className="dot bg-primaryYellow animate-bounce delay-400"></div>
      </div>

      <style>{`
        .dot {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          animation-duration: 0.8s;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
        }
        .animate-bounce {
          animation-name: bounce;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
