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
      className="w-full flex flex-row h-screen justify-center items-center overflow-hidden"
      variants={backgroundVariants}
      animate="animate"
      style={{
        backgroundImage: 'radial-gradient(circle, #1a1a1a 10%, transparent 10%)',
        backgroundSize: '50px 50px',
        backgroundColor: 'black'
      }}
    >
      <div className="flex flex-row bg-neutral-900 rounded-[30px] w-[85rem] h-[40rem] p-7 relative">
        <div className="w-3/5 h-full">
          <MultiStepForm />
        </div>
        <div className="w-2/5">
          <Carousel />
        </div>
        <motion.svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="absolute -bottom-10 -right-10 opacity-20"
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