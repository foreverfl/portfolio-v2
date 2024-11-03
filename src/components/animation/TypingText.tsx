import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TypingTextProps {
  text: string; // text prop의 타입 정의
}

const TypingText: React.FC<TypingTextProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");

    const timeout = setTimeout(() => {
      setDisplayedText(text);
    }, text.length * 100 + 600); // 사라지는 시간 + 새 텍스트가 나타나는 시간

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div className="font-title text-8xl">
      <AnimatePresence>
        {displayedText.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial={{ opacity: 0, x: 50 }} // 시작 위치와 투명도
            animate={{ opacity: 1, x: 0 }} // 애니메이션 시작 위치
            exit={{ opacity: 0, x: -50 }} // 종료 위치와 투명도
            transition={{ delay: index * 0.1, duration: 0.5 }} // 타이핑 효과
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TypingText;
