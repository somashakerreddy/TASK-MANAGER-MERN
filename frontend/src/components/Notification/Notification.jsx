import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function Notification({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // Delay actual close to allow exit animation
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm z-40
          transition-all duration-300 ease-out
          ${isVisible && !isClosing ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={handleClose}
      />

      {/* Main notification modal */}
      <div
        className={`
          fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50
          transition-all duration-500 ease-out
          ${isVisible && !isClosing 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
          }
        `}
      >
        <div className="relative">
          {/* Animated background elements */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-pulse"></div>
          
          {/* Main content container */}
          <div className="relative bg-white/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden max-w-md w-full mx-4">
            
            {/* Header section with gradient */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-t-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Animated icon */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-pulse">
                        <svg className="w-6 h-6 text-white animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                    </div>
                    
                    {/* Title with gradient text */}
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Important Notice
                    </h1>
                  </div>
                  
                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="group p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Message content */}
            <div className="p-6 pt-4">
              <div className="relative">
                {/* Message text with enhanced styling */}
                <p className="text-gray-700 leading-relaxed text-base mb-6 relative">
                  <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                  {message}
                </p>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full opacity-50 animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-100 rounded-full opacity-50 animate-ping delay-500"></div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 justify-end">
                {/* Secondary button */}
                <button
                  onClick={handleClose}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-all duration-200 hover:bg-gray-100 rounded-xl transform hover:scale-105 active:scale-95"
                >
                  Later
                </button>

                {/* Primary button */}
                <button
                  onClick={handleClose}
                  className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Okay
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>
            </div>

            {/* Bottom decorative border */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          </div>

          {/* Floating particles around the modal */}
          <div className="absolute -top-8 -left-8 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute -top-4 -right-6 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300 opacity-60"></div>
          <div className="absolute -bottom-6 -left-4 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-700 opacity-60"></div>
          <div className="absolute -bottom-8 -right-8 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-1000 opacity-60"></div>
        </div>
      </div>
    </>
  );
}

export default Notification;