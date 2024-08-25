import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card1 from './Card1';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);

  const cards = [
    {
      id: 1,
      front: (
        <div className="relative">
          <img src="https://images.pexels.com/photos/4107104/pexels-photo-4107104.jpeg" alt="Card 1" className="rounded-lg shadow-lg" />
          <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
            The Last Sunset
          </div>
        </div>
      ),
      back: (
        <div className="p-4 text-white">
          <h2 className="text-xl font-bold">Goodbye, Daylight</h2>
          <p>Enjoy the sunset, because the sun is just a giant flaming ball that will eventually burn out. But hey, it’s pretty while it lasts!</p>
          <p className="mt-2 text-gray-400">Fact: The sun loses 4.2 million tons of mass every second, so soak in that sunlight!</p>
        </div>
      ),
    },
    {
      id: 2,
      front: (
        <div className="relative">
          <img src="https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg" alt="Card 2" className="rounded-lg shadow-lg" />
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
    {
      id: 3,
      front: (
        <div className="relative">
          <img src="https://images.pexels.com/photos/1031081/pexels-photo-1031081.jpeg" alt="Card 3" className="rounded-lg shadow-lg" />
          <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
            City Lights, City Fights
          </div>
        </div>
      ),
      back: (
        <div className="p-4 text-white">
          <h2 className="text-xl font-bold">Survive the Night</h2>
          <p>The city never sleeps... just like your ever-growing list of responsibilities.</p>
          <p className="mt-2 text-gray-400">Fact: New York City has over 8 million residents, and each of them has a unique way of ignoring you.</p>
        </div>
      ),
    },
    {
      id: 4,
      front: (
        <div className="relative">
          <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" alt="Card 4" className="rounded-lg shadow-lg" />
          <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
            Peak of Insanity
          </div>
        </div>
      ),
      back: (
        <div className="p-4 text-white">
          <h2 className="text-xl font-bold">Reach for the Sky</h2>
          <p>Climbing mountains is great exercise, and a reminder that nature always wins.</p>
          <p className="mt-2 text-gray-400">Fact: The highest mountain in the world, Mount Everest, grows about 4 millimeters each year. Because even mountains strive for more.</p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, cards.length]);

  return (
    <div
      className="carousel-container mx-auto p-4 max-w-2xl"
     
     
    >
      <div className="carousel w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={cards[currentIndex].id}
            className="carousel-card w-full h-full absolute top-0 left-0"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Card1 front={cards[currentIndex].front} back={cards[currentIndex].back} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Carousel;
