// pages/all-words.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import WordCard from "../components/WordCard";
import { wordGroups } from "../data/synonyms";
import { WordData } from "../types/types";

const AllWordsPage: React.FC = () => {
  const allWords: WordData[] = wordGroups.flatMap((group) => group.words);
  const [hiddenWords, setHiddenWords] = useState<string[]>([]);

  const handleWordClick = (wordId: string) => {
    setHiddenWords((prev) => {
      if (!prev.includes(wordId)) {
        return [...prev, wordId];
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-8 sm:mb-10 md:mb-12 font-orbitron tracking-wide drop-shadow-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          All AI Words
        </h1>

        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {allWords.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              onCardClick={handleWordClick}
              isVisible={!hiddenWords.includes(word.id)}
            />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-8 sm:mt-10 md:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/memory"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg font-roboto text-base sm:text-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Back to Explorer
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AllWordsPage;