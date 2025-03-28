import { motion, AnimatePresence } from "framer-motion";
import { Word } from "../types/word";
import { useState, useEffect } from "react";

interface WordCardProps {
  word: Word;
  onCardClick: (wordId: string) => void; // Removes the word when called
  isVisible: boolean;
}

const WordCard: React.FC<WordCardProps> = ({ word, onCardClick, isVisible }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [lastTap, setLastTap] = useState<number>(0); // For manual double-tap detection

  // Detect if the device supports touch
  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  const colors = [
    "from-red-500 to-pink-600",
    "from-blue-500 to-indigo-600",
    "from-green-500 to-teal-600",
    "from-yellow-500 to-orange-600",
    "from-purple-500 to-violet-600",
    "from-pink-500 to-rose-600",
  ];

  const randomGradient = colors[Math.floor(Math.random() * colors.length)];

  // Handle click/tap events
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) {
      const currentTime = new Date().getTime();
      const tapGap = currentTime - lastTap;
      const DOUBLE_TAP_DELAY = 300; // Time in ms to detect double tap

      if (tapGap < DOUBLE_TAP_DELAY && tapGap > 0) {
        // Double tap detected on mobile
        onCardClick(word.id); // Remove the word
        setIsTooltipVisible(false);
      } else {
        // Single tap: toggle tooltip
        setIsTooltipVisible((prev) => !prev);
      }
      setLastTap(currentTime);
    } else {
      // Desktop: Single click triggers onCardClick
      onCardClick(word.id);
    }
  };

  // Handle cross mark click to remove the word (mobile only)
  const handleCrossClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent triggering handleClick
    onCardClick(word.id); // Remove the word
    setIsTooltipVisible(false); // Hide tooltip
  };

  // Desktop: Show tooltip on hover
  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsTooltipVisible(true);
    }
  };

  // Desktop: Hide tooltip on mouse leave
  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsTooltipVisible(false);
    }
  };

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
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
                  <div className="bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap flex items-center">
                    {word.meaning}
                    {isTouchDevice && (
                      <div
                        className="ml-2 cursor-pointer text-white hover:text-red-400"
                        onClick={handleCrossClick}
                      >
                        ✕
                      </div>
                    )}
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