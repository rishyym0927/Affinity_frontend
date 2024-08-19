// src/App.js
import React from 'react';
import MultiStepForm from '../components/MultiStepForm'; // Update the import path if needed
import Carousel from '../components/Carousel';


function Register() {
  return (
    <div className='flex flex-row w-full h-screen justify-center bg-black gap-20'>
       
            <Carousel />
        
    <div className=" register-page bg-black text-gray-200 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-[#ff0059] mb-8">Register</h1>
      <MultiStepForm />
    </div>
    </div>
  );
}

export default Register;
