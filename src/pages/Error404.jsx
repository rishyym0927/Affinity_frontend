import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      {/* Top text with slow vertical motion */}
      <motion.div
        className="absolute left-1/4 md:left-[29%] top-8 text-white text-sm font-semibold md:text-2xl" // used left for different screen sizes to center it
        animate={{
          y: [-10, 10], // for vertical motion
        }}
        transition={{ // transition for infitine to and fro motion for a better ux 
          repeat: Infinity,  
          repeatType: "reverse", 
          duration: 1,
          ease: "easeInOut", 
        }}
      >
        The page you requested cannot be found ❌❌❌
      </motion.div>

      {/* Main content */}
      <div className="w-1/3 flex flex-col items-center">
        <div className="text-[#ff0059] text-6xl font-bold md:text-[100px] w-full text-center">Error404</div>
        <div className="text-white md:hidden">Page not found</div>
        <div className="-mt-6 md:-mt-2 md:flex gap-4 w-full justify-center hidden">
          <p className="text-white">Page not found</p>md:
          <p className="text-white">Page not found</p>
          <p className="text-white">Page not found</p>
        </div>
        <Link to={"/"} className="w-full">
          <motion.button
            className="mt-4 bg-[#ff0059] w-full text-white font-semibold px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 text-lg"
            whileHover={{ scale: 1.1, backgroundColor: "#ff3380" }}
            whileTap={{ scale: 0.95 }}
            transition={{
              repeat: Infinity, // Keeps the animation looping
              duration: 0.4, // Duration of each animation cycle
              ease: "easeInOut", // Smooth animation
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
