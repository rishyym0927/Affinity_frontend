// src/components/Carousel.js
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card1 from './Card1';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);

  const cards = [
    { id: 1, front: <img src="https://www.pexels.com/photo/woman-in-brown-button-up-shirt-and-blue-denim-jeans-standing-near-brown-wooden-table-4107104/" alt="Card 1" />, back: <div>Back 1</div> },
    { id: 2, front: <img src="https://www.pexels.com/photo/woman-in-white-crew-neck-shirt-under-white-clouds-4919373/" alt="Card 2" />, back: <div>Back 2</div> },
    { id: 3, front: <img src="https://www.pexels.com/photo/woman-in-white-crew-neck-shirt-sitting-on-brown-wooden-bench-4917824/" alt="Card 3" />, back: <div>Back 3</div> }
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
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={carouselRef}
    >
      <div className="carousel">
        <AnimatePresence mode='wait'>
          <motion.div
            key={cards[currentIndex].id}
            className="carousel-card"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Card1 front={cards[currentIndex].front} back={cards[currentIndex].back} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Carousel;
