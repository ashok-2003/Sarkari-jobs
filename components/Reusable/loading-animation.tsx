"use client";

import { motion } from "framer-motion";
import React from "react";

interface LoadingAnimationProps {
  message?: string;
  className?: string;
}

export function LoadingAnimation({ message = "Hold on, we're loading...", className }: LoadingAnimationProps) {
  // Variants for individual letters (for the looping ripple effect)
  const letterVariants = {
    // Initial state (hidden and slightly up)
    initial: {
      y: 0,
      opacity: 0,
    },
    // Animation to be applied on mount, and then repeated
    animate: {
      y: [0, -20, 0], // Move up then back down (ripple effect)
      opacity: [0.3, 1, 0.3], // Fade in, then fade out
      transition: {
        duration: 1.5, // Duration of one full ripple cycle for each letter
        ease: "easeInOut",
        repeat: Infinity, // Loop indefinitely
        repeatDelay: 1, // Pause before repeating the ripple for *this* letter after its initial animation
      },
    },
    // Exit animation (optional, but good practice)
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  // Variants for the overall text container
  // This will handle the initial staggered entry of letters.
  // The subsequent looping ripple will be handled by the letterVariants' `animate` property.
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger initial appearance of children
      },
    },
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 min-h-[200px] ${className || ''}`}>
      <motion.p
        className="text-3xl md:text-4xl scroll-m-20 text-center font-extrabold tracking-tight text-balance text-gray-700 dark:text-gray-300"
        variants={containerVariants} // Apply container variants
        initial="initial"
        animate="animate"
        exit="exit" // Important for when the component is unmounted
      >
        {message.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants} // Apply letter-specific animation
            // The `animate` prop here will implicitly pick up the `animate` state from its parent's `staggerChildren`
            // AND then the `repeat: Infinity` within its own `animate` transition will take over for the loop.
            className="inline-block mx-[0.5px]"
          >
            {char === " " ? "\u00A0" : char} {/* Use non-breaking space for actual spaces */}
          </motion.span>
        ))}
      </motion.p>
      {/* Subtle loading bar (remains the same continuous loop) */}
      <motion.div
        className="h-1 w-20 bg-primary rounded-full mt-4"
        initial={{ width: 0 }}
        animate={{ width: [0, 100, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}