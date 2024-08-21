// src/App.js
import React from "react";
import MultiStepForm from "../components/MultiStepForm"; // Update the import path if needed
import Carousel from "../components/Carousel";

function Register() {
  return (
    <div className="w-full flex flex-row h-screen justify-center bg-neutral-800 items-center">
      <div className="flex flex-row bg-black rounded-[30px] w-[85rem] h-[40rem] p-7  ">
        <div className="w-3/5 h-full   ">
          <MultiStepForm />
        </div>
        <div className="w-2/5 bg-green-200 ">
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default Register;
