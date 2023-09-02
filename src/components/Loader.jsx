import React from "react";

const Loader = ({ h, w }) => {
  // Define CSS styles for the loader
  const loaderStyle = {
    height: h || "8px", // Default height is 8px if not provided
    width: w || "8px", // Default width is 8px if not provided
  };

  return (
    <div
      className={`inline-block h-${loaderStyle.height} w-${loaderStyle.width} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Loader;
