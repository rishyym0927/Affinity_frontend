import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      {/* Top text with slow vertical motion */}
      <motion.div
        className="absolute left-1/2 transform top-4 md:left-[29%] md:top-8 text-white text-sm font-semibold md:text-2xl px-2 text-center"
        animate={{
          y: [-10, 10], // Vertical motion
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
          ease: "easeInOut",
        }}
      >
        The page you requested cannot be found ❌❌❌
      </motion.div>

      {/* Main content */}
      <div className="w-4/5 md:w-1/3 flex flex-col items-center px-4 md:px-0">
        <div className="text-[#ff0059] text-4xl md:text-6xl font-bold md:text-[100px] w-full text-center">Error404</div>

        {/* Mobile version of the text */}
        <div className="text-white md:hidden text-lg mt-2">Page not found</div>

        {/* Desktop version of the repeated text */}
        <div className="-mt-6 md:-mt-1 md:flex gap-4 w-full justify-center hidden">
          <p className="text-white">Page not found</p>
          <p className="text-white">Page not found</p>
          <p className="text-white">Page not found</p>
        </div>

        {/* Button for both mobile and desktop */}
        <Link to={"/"} className="w-full flex justify-center items-center md:block">
          <motion.button
            className="mt-2 bg-[#ff0059] w-1/2 md:w-full text-white font-semibold px-3 py-2 md:px-4 md:py-3 rounded-lg shadow-lg transform transition-all duration-300 text-base md:text-lg"
            whileHover={{ scale: 1.1, backgroundColor: "#ff3380" }}
            whileTap={{ scale: 0.95 }}
            transition={{
              repeat: Infinity,
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            Back to Home
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;