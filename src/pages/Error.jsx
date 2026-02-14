import React from "react";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="px-8 mx-auto">
        {/* header */}
        <div>
          <h1 className="text-[168px] font-semibold text-gray-800 text-center">
            404
          </h1>
        </div>
        <div className="text-center my-6">
          <h1 className="text-3xl text-[#0a303a] md:text-4xl font-bold my-3">
            Oops, page not found!
          </h1>
          <p className="text-gray-600 text-sm">
            The page you are looking for is not available.
          </p>
        </div>
        <div className="mt-4 sm:mt-8 mb-6 sm:mb-12 flex items-center justify-center">
          <button
            onClick={() => navigate("/")}
            className="btn border-none text-white text-lg bg-[#e83128] hover:bg-[#0a303a] hover:scale-105 transition-transform"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
