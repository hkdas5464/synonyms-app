import { motion, AnimatePresence } from "framer-motion";
import { Word } from "../types/word";
import { useState } from "react";

interface WordCardProps {
  word: Word;
  onCardClick: (wordId: string) => void;
  isVisible: boolean;
}

const WordCard: React.FC<WordCardProps> = ({ word, onCardClick, isVisible }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const colors = [
    "from-red-500 to-pink-600",
    "from-blue-500 to-indigo-600",
    "from-green-500 to-teal-600",
    "from-yellow-500 to-orange-600",
    "from-purple-500 to-violet-600",
    "from-pink-500 to-rose-600",
  ];

  const randomGradient = colors[Math.floor(Math.random() * colors.length)];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`relative bg-gradient-to-br ${randomGradient} rounded-md px-2 text-white text-sm sm:text-base font-semibold shadow-md border border-white/20 cursor-pointer inline-block hover:shadow-lg`}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0,
            rotate: 180,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          onClick={() => onCardClick(word.id)}
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          {word.text}
          {/* Tailwind CSS Tooltip */}
          {word.meaning && (
            <AnimatePresence>
              {isTooltipVisible && (
                <motion.div
                  className="absolute z-10 -top-2 left-1/2 -translate-x-1/2 -translate-y-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap">
                    {word.meaning}
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-gray-800" />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WordCard;