import React from "react";
import Card from "../components/Card";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col px-4 sm:px-6 py-4">
      <nav className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <div className="text-2xl font-extrabold text-decoration-uppercase mb-4 sm:mb-0">
          <Link to="/">AFFINITY</Link>
        </div>
        <div className="flex flex-row gap-4">
          <Link to="/login">
            <button className="bg-stone-700 w-24 hover:bg-stone-600 text-white px-4 py-2 rounded-md">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-[#ff0059] w-24 hover:bg-red-500 text-white px-4 py-2 rounded-md">
              Register
            </button>
          </Link>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          <Typewriter
            words={[
              "Find love in the dark... it's less awkward that way.",
              "Swipe right... because love at first sight is overrated.",
              "Heartbreak? There's an website for that.",
              "Single? There's someone out there as twisted as you.",
              "Swipe left on loneliness... you deserve better.",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={20}
            delaySpeed={1500}
          />
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl mb-8">
          Meet your match in a world that understands you.
        </p>
        <Link to="/register">
          <button className="w-48 text-xl bg-[#ff0059] hover:bg-red-500 text-white px-4 py-2 rounded-md mb-12">
            Get Started
          </button>
        </Link>

        <motion.div
          className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="w-64 h-80 sm:w-72 sm:h-96"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card image={img1} name={"Emily"} age={25} />
          </motion.div>

          <motion.div
            className="w-64 h-80 sm:w-72 sm:h-96"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card image={img2} />
          </motion.div>
        </motion.div>
      </main>

      <footer className="flex justify-center mt-8">
        <div className="flex flex-row text-3xl sm:text-4xl opacity-70 gap-5 cursor-pointer">
          <FaInstagram />
          <FaTwitter />
          <FaLinkedin />
          <FaFacebook />
        </div>
      </footer>
    </div>
  );
};

export default Landing;



// register.jsx

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
      className="w-full min-h-screen flex justify-center items-center overflow-hidden p-4"
      variants={backgroundVariants}
      animate="animate"
      style={{
        backgroundImage: 'radial-gradient(circle, #1a1a1a 10%, transparent 10%)',
        backgroundSize: '25px 25px',
        backgroundColor: 'black'
      }}
    >
      <div className="flex flex-col md:flex-row bg-neutral-900 rounded-[30px] w-full max-w-7xl p-4 md:p-7 relative">
        <div className="w-full md:w-3/5 mb-6 md:mb-0 md:mr-6">
          <MultiStepForm />
        </div>
        <div className="w-full md:w-2/5">
          <Carousel />
        </div>
        <motion.svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="absolute -bottom-10 -right-10 opacity-20 hidden md:block"
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