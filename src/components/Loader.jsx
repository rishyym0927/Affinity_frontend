// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent text-[#ff0059]" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
