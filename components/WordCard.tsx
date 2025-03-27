import { motion, AnimatePresence } from "framer-motion";
import { Word } from "../types/word";

interface WordCardProps {
  word: Word;
  onCardClick: (wordId: string) => void;
  isVisible: boolean;
}

const WordCard: React.FC<WordCardProps> = ({ word, onCardClick, isVisible }) => {
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
          className={`bg-gradient-to-br ${randomGradient} rounded-md px-2 py-1 text-white text-sm sm:text-base font-semibold shadow-md border border-white/20 cursor-pointer inline-block hover:shadow-lg`}
          whileHover={{ scale: 1.1 }}
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
        >
          {word.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WordCard;
