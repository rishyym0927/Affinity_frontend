import React from "react";
import { motion } from 'framer-motion';
import MultiStepForm from "../components/MultiStepForm";
import Carousel from "../components/Carousel";

function Register() {
  const backgroundVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  };

  return (
    <motion.div 
      className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center overflow-hidden p-4"
      variants={backgroundVariants}
      animate="animate"
      style={{
        backgroundImage: 'radial-gradient(circle, #1a1a1a 10%, transparent 10%)',
        backgroundSize: '50px 50px',
        backgroundColor: 'black'
      }}
    >
      <div className="flex flex-col md:flex-row bg-neutral-900 rounded-[30px] w-full max-w-7xl h-auto md:h-[40rem] p-4 md:p-7 relative overflow-hidden">
        <div className="w-full md:w-3/5 h-full overflow-y-auto mb-4 md:mb-0">
          <MultiStepForm />
        </div>
        <div className="w-full md:w-2/5 h-64 md:h-full">
          <Carousel />
        </div>
        <motion.svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
          className="absolute -bottom-5 -right-5 md:-bottom-10 md:-right-10 opacity-20"
          initial={{ scale: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path
            d="M50 90 C75 65, 95 33, 50 10 C5 33, 25 65, 50 90Z"
            fill="#ff0059"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}

export default Register;