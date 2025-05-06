import { useState } from "react";

export default function Error() {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full p-8 ">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            !
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-3">
          Oops! Something went wrong
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-600 mb-6">
          We encountered an error while processing your request.
        </p>

        {/* Error details */}
        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
          <p className="text-sm text-gray-700 mb-2 font-medium">
            Error details:
          </p>
          <p className="text-sm text-gray-500 mb-1">
            • Unable to connect to server
          </p>
          <p className="text-sm text-gray-500 mb-1">• Error code: 500</p>
          <p className="text-sm text-gray-500">• Request ID: XJ42-9087</p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-md transition duration-200 flex justify-center items-center"
          >
            {isRetrying ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Retrying...
              </>
            ) : (
              "Try Again"
            )}
          </button>

          <button className="w-full py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition duration-200">
            Go Back Home
          </button>

          <button className="w-full py-2 px-4 bg-white text-blue-500 font-medium rounded-md transition duration-200">
            Contact Support
          </button>
        </div>
      </div>

      {/* Additional help text */}
      <p className="text-sm text-gray-500 mt-6">
        Need help? Email us at support@yourapp.com
      </p>
    </div>
  );
}
