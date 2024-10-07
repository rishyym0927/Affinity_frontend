import React from "react";
import Card from "../components/Card";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/darkModeToggle";

const Landing = () => {
  return (
    <div className="w-full h-screen flex flex-col px-6 py-4 bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      {/* Header Section */}
      <div className="min-h-12 h-auto flex flex-row items-center justify-between">
        <div className="text-2xl font-extrabold">
          <Link to="/" className="text-black dark:text-white">AFFINITY</Link>
        </div>
        <div className="flex flex-row gap-4">
          <DarkModeToggle />
          <Link to="/login">
            <button className="bg-stone-700 hover:bg-stone-600 text-white px-4 py-2 rounded-md">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-[#ff0059] hover:bg-red-500 text-white px-4 py-2 rounded-md">
              Register
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-row h-full">
        {/* Text Content */}
        <div className="w-1/2 pr-12 flex flex-col justify-center gap-5 relative">
          <h1 className="text-5xl font-extrabold">
            <Typewriter
              words={[
                "Find love in the dark... it’s less awkward that way.",
                "Swipe right... because love at first sight is overrated.",
                "Heartbreak? There’s a website for that.",
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
          <p className="text-gray-500 dark:text-gray-400 text-xl">
            Meet your match in a world that understands you.
          </p>
          <Link to="/register">
            <button className="w-1/3 text-xl bg-[#ff0059] hover:bg-red-500 text-white px-4 py-2 rounded-md mt-4">
              Get Started
            </button>
          </Link>
          <div className="flex flex-row text-4xl opacity-70 gap-5 cursor-pointer absolute bottom-10">
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
            <FaFacebook />
          </div>
        </div>

        {/* Card Section */}
        <motion.div
          className="w-1/2 h-full relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="max-w-[22rem] max-h-[28rem] w-[22rem] h-[28rem] z-20 transform -rotate-12"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card image={img1} name={"Emily"} age={25} />
          </motion.div>

          <motion.div
            className="max-w-[22rem] max-h-[28rem] w-[22rem] h-[28rem] z-10 transform rotate-6"
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
