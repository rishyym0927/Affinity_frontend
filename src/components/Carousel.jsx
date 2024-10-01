import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card1 from './Card1';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);  // Manages the current card index
  const [isHovered, setIsHovered] = useState(false);    // Detects if the carousel is being hovered
  const carouselRef = useRef(null);  // Reference for future use (if needed)

  // Define the cards array with front and back content for each card
  const cards = [
    {
      id: 1,
      front: (
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/4107104/pexels-photo-4107104.jpeg"
            alt="Card 1"
            className="rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
            The Last Sunset
          </div>
        </div>
      ),
      back: (
        <div className="p-4 text-white">
          <h2 className="text-xl font-bold">Goodbye, Daylight</h2>
          <p>Enjoy the sunset, because the sun is just a giant flaming ball that will eventually burn out.</p>
          <p className="mt-2 text-gray-400">Fact: The sun loses 4.2 million tons of mass every second, so soak in that sunlight!</p>
        </div>
      ),
    },
    // More card objects follow...
    {
      id: 2,
      front: (
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg"
            alt="Card 2"
            className="rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
            Forest of Solitude
          </div>
        </div>
      ),
      back: (
        <div className="p-4 text-white">
          <h2 className="text-xl font-bold">Enter the Woods</h2>
          <p>The forest is peaceful... unless you remember it’s filled with creatures that could probably outrun you.</p>
          <p className="mt-2 text-gray-400">Fact: Trees can communicate with each other through an underground network of fungi. Nature’s secret internet!</p>
        </div>
      ),
    },
    // Add more cards as needed
  ];

  // Auto slide effect with interval unless carousel is hovered
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      }
    }, 3000);  // Changes slide every 3 seconds if not hovered

    return () => clearInterval(interval);  // Cleanup the interval on unmount
  }, [isHovered, cards.length]);

  return (
    <div
      className="carousel-container mx-auto p-4 max-w-2xl"
      onMouseEnter={() => setIsHovered(true)}  // Pause auto slide on hover
      onMouseLeave={() => setIsHovered(false)} // Resume auto slide when not hovered
    >
      <div className="carousel w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={cards[currentIndex].id}
            className="carousel-card w-full h-full absolute top-0 left-0"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}  // Animation starting point
            animate={{ opacity: 1, x: 0, scale: 1 }}      // Animation to the center
            exit={{ opacity: 0, x: -100, scale: 0.8 }}    // Animation when leaving the view
            transition={{ duration: 0.8, ease: 'easeInOut' }}  // Smooth transitions
          >
            <Card1 front={cards[currentIndex].front} back={cards[currentIndex].back} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Carousel;
