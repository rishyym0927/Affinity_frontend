import React from "react";
import Card from "../components/Card";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const Landing = () => {
  return (
    <div className="bg-black text-gray-200 w-full h-screen flex flex-col px-6 py-4">
      <div className="min-h-12 text-gray-400 h-auto flex flex-row items-center justify-between">
        <div className="text-xl">StepDate</div>
        <div className="flex flex-row gap-4">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">Login</button>
          <button className="bg-[#ff0059] hover:bg-red-500 text-white px-4 py-2 rounded-md">Register</button>
        </div>
      </div>
      <div className="flex flex-row h-full">
        <div className="w-1/2 pr-12 flex flex-col h-[100%] justify-center text-gray-100 gap-5">
          <h1 className="text-4xl font-extrabold">
            <Typewriter
              words={[
                "Find love in the dark... it’s less awkward that way.",
                "Swipe right... because love at first sight is overrated.",
                "Heartbreak? There’s an app for that.",
                "Single? There's someone out there as twisted as you.",
                "Swipe left on loneliness... you deserve better."
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </h1>
          <p className="text-gray-400">Meet your match in a world that understands you.</p>
          <button className="w-1/3 bg-[#ff0059] hover:bg-red-500 text-white px-4 py-2 rounded-md mt-4">Get Started</button>
        </div>

        <motion.div
  className="w-1/2 h-full relative flex items-center justify-center"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
>
  <motion.div
    className="w-64 h-80 absolute z-20 transform -rotate-12"
    style={{ left: '-10%', top: '-10%' }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Card image={img1} name={"Emily"} age={25} />
  </motion.div>

  <motion.div
    className="w-64 h-80 absolute z-10 transform rotate-6"
    style={{ left: '10%', top: '10%' }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Card image={img2} />
  </motion.div>
</motion.div>
      </div>
    </div>
  );
};

export default Landing;
