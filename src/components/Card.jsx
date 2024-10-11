import React from 'react';

const Card = ({ title, description, image }) => {
  return (
    <div className="w-full h-full #000000 rounded-lg shadow-lg">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-80 object-cover" />
      
      {/* Text Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default Card;