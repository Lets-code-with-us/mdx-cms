"use client";
import { useState, useEffect } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading");

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Update loading text with dots animation
  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText((prevText) => {
        if (prevText === "Loading...") return "Loading";
        return prevText + ".";
      });
    }, 500);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full p-8 ">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            MDX CMS
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          MDX CMS
        </h1>

        {/* Spinner */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <div className="text-center text-gray-600 mb-4">
          <p className="text-lg">{loadingText}</p>
          <p className="text-sm mt-2">
            Please wait while we prepare everything
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress percentage */}
        <p className="text-xs text-right text-gray-500">{progress}%</p>
      </div>
    </div>
  );
}
