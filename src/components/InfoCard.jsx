import React from "react";

const InfoCard = () => {
  return (
    <div className="bg-white w-full h-[60%] shadow-[0px_20px_125px_10px_rgba(39,_70,_132,_1)] rounded-xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Sidharth Singh 28
        </h2>
        <p className="text-gray-600">Lucknow</p>
        <p className="mt-4 text-gray-800">Introvert</p>
        <p className="text-gray-600">Interests:Football</p>
        <p className="mt-4 text-gray-600">Looking for:Casual</p>
        <p className="mt-2 text-gray-600">Social habits: Dunno</p>
        <p className="mt-2 text-gray-600">Expectations: Cook</p>
        <p className="mt-2 text-gray-600">Past relationships: No</p>
      </div>
    </div>
  );
};

export default InfoCard;
