import { motion } from "framer-motion";
import { useState, useMemo, Suspense, lazy } from "react";
import Link from "next/link";
import { wordGroups } from "../data/synonyms";
import { WordData } from "../types/types";

// Lazy load WordCard component
const WordCard = lazy(() => import("../components/WordCard"));

const AllWordsPage: React.FC = () => {
  const allWords: WordData[] = useMemo(() => wordGroups.flatMap((group) => group.words), []);
  const [hiddenWords, setHiddenWords] = useState<string[]>([]);

  const handleWordClick = (wordId: string) => {
    setHiddenWords((prev) => (prev.includes(wordId) ? prev : [...prev, wordId]));
  };

  return (
    <div className="min-h-screen py-6 px-4 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 overflow-x-hidden">
      <motion.div
        className="max-w-[90vw] sm:max-w-5xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center text-white mb-6 font-orbitron tracking-wide drop-shadow-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          All AI Words
        </h1>

        <Suspense fallback={<div className="text-white text-center">Loading words...</div>}>
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
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
        </Suspense>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link
            href="/memory"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg font-roboto text-sm xs:text-base hover:shadow-xl transform hover:-translate-y-1"
          >
            Back to Explorer
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Enable static generation for faster initial load
export const getStaticProps = async () => {
  return {
    props: {}, // No dynamic props needed since wordGroups is imported
  };
};

export default AllWordsPage;