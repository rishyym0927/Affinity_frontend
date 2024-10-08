import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card1 from './Card1';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const cards = [
    { id: 1, image: "https://images.pexels.com/photos/4107104/pexels-photo-4107104.jpeg", name: "The Last Sunset", age: "Eternal" },
    { id: 2, image: "https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg", name: "Forest of Solitude", age: "Ancient" },
    { id: 3, image: "https://images.pexels.com/photos/1031081/pexels-photo-1031081.jpeg", name: "City Lights", age: "Modern" },
    { id: 4, image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg", name: "Peak of Insanity", age: "Timeless" },
  ];

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = cards.map(card => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = card.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, cards.length, imagesLoaded]);

  if (!imagesLoaded) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full relative">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={cards[currentIndex].id}
            className="w-full h-full absolute"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Card1 
              image={cards[currentIndex].image}
              name={cards[currentIndex].name}
              age={cards[currentIndex].age}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Carousel;