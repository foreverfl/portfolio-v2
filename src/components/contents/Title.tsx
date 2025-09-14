import { motion } from "framer-motion";
import React from "react";

interface TitleProps {
  title?: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  const dotVariants = {
    animate: {
      backgroundColor: ["#000", "#555", "#fff", "#555"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const dotVariantsDark = {
    animate: {
      backgroundColor: ["#fff", "#aaa", "#333", "#aaa"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div
      className="container mx-auto px-4 pt-[100px] md:pt-[150px] lg:pt-[200px] font-body dark:text-gray-200"
      id={title ? title.toLowerCase().replace(/\s+/g, "-") : undefined}
    >
      {title && (
        <div className="flex items-center">
          <div className="pe-3"> (</div>
          <div>{title}</div>
          <motion.div
            className="ml-2 w-2 h-2 rounded-full"
            variants={dotVariants}
            animate="animate"
          />
          <div className="ps-3"> )</div>
        </div>
      )}
    </div>
  );
};

export default Title;
