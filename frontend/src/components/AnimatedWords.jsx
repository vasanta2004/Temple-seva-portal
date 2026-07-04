import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedWords component
 * Splits text into words or characters and animates them as they enter the viewport.
 * 
 * Props:
 * - text (string): The text to animate
 * - type (string): "words" or "letters"
 * - className (string): Additional classes to apply to the container
 * - delay (number): Initial delay before animation starts
 * - duration (number): Duration of each word/letter animation
 * - stagger (number): Delay between successive words/letters
 * - luxury (boolean): Whether to apply the luxury golden gradient text-luxury styling
 * - once (boolean): Whether to animate only once when entering viewport
 */
const AnimatedWords = ({
  text,
  type = 'words',
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  luxury = false,
  once = true,
}) => {
  // Split the text into words
  const words = text.split(' ');

  // Variants for container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  // Variants for individual words
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.2, 0.65, 0.3, 0.9], // Premium custom cubic-bezier
      },
    },
  };

  // Variants for individual letters
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: '80%',
      rotateX: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: duration * 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  if (type === 'letters') {
    return (
      <motion.span
        className={`inline-block perspective-500 py-1 ${className}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-50px' }}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden py-1">
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className={`inline-block origin-bottom ${luxury ? 'text-luxury' : ''}`}
                variants={letterVariants}
                style={{ backfaceVisibility: 'hidden' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    );
  }

  // Default: animate word-by-word
  return (
    <motion.span
      className={`inline-block py-1 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em] py-1">
          <motion.span
            className={`inline-block ${luxury ? 'text-luxury' : ''}`}
            variants={wordVariants}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default AnimatedWords;
