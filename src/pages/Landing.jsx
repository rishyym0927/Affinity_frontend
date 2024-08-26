import React from "react";
import Card from "../components/Card";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="bg-black text-gray-200 w-full h-screen flex flex-col px-6 py-4">
      <div className="min-h-12 text-gray-400 h-auto flex flex-row items-center justify-between">
        <div className="text-2xl font-extrabold text-decoration-uppercase ">
          <Link to="/">
          AFFINITY</Link>
       
        </div>
        <div className="flex flex-row gap-4">
          <Link to="/login">
          <button className="bg-stone-700 w-24 hover:bg-stone-600 text-white px-4 py-2 rounded-md">
            Login
          </button></Link>
         <Link to="/register">
         <button className="bg-[#ff0059] w-24 hover:bg-red-500 text-white px-4 py-2 rounded-md">
            Register
          </button></Link>
          
        </div>
      </div>
      <div className="flex flex-row h-full">
        <div className="w-1/2 pr-12 flex flex-col h-[100%] justify-center text-gray-100 gap-5 relative">
          <h1 className="text-5xl font-extrabold">
            <Typewriter
              words={[
                "Find love in the dark... it’s less awkward that way.",
                "Swipe right... because love at first sight is overrated.",
                "Heartbreak? There’s an website for that.",
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
          <p className="text-gray-400 text-xl">
            Meet your match in a world that understands you.
          </p>
          <button className="w-1/3 text-xl  bg-[#ff0059] hover:bg-red-500 text-white px-4 py-2 rounded-md mt-4">
         
            <Link to="/register">
            Get Started
            </Link>
          </button>

          <div className="flex flex-row text-4xl opacity-70 gap-5  cursor-pointer absolute bottom-10">
          <FaInstagram />
          <FaTwitter />
          <FaLinkedin />
          <FaFacebook />
          </div>
        </div>

        <motion.div
          className="w-1/2 h-full relative flex items-center justify-center parent "
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="max-w-[22rem] max-h-[28rem] w-[22rem] h-[28rem] z-20 transform -rotate-12 child1 "
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card image={img1} name={"Emily"} age={25} />
          </motion.div>

          <motion.div
            className="max-w-[22rem] max-h-[28rem]  w-[22rem] h-[28rem] z-10 transform rotate-6 child2"
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
