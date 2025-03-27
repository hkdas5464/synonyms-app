// pages/index.tsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import WordCard from "../../components/WordCard";
import { wordGroups } from "../../data/synonyms";
import { WordGroup, Word } from "../../types/word";

const WordCardsPage: React.FC = () => {
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const storedWords = localStorage.getItem("savedWords");
    if (storedWords) {
      setSavedWords(JSON.parse(storedWords));
    }
  }, []);

  useEffect(() => {
    if (savedWords.length > 0) {
      localStorage.setItem("savedWords", JSON.stringify(savedWords));
    } else {
      localStorage.removeItem("savedWords");
    }
  }, [savedWords]);

  const handleCardClick = (wordId: string) => {
    setSavedWords((prev) => {
      if (!prev.includes(wordId)) {
        return [...prev, wordId];
      }
      return prev;
    });
  };

  const totalSlides = wordGroups.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Animation variants for smooth sliding
  const slideVariants = {
    initial: { opacity: 0, x: 100, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      <motion.div
        className="max-w-full mx-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-8 sm:mb-10 md:mb-12 font-orbitron tracking-wide drop-shadow-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          AI Word Explorer
        </h1>

        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {savedWords.length > 0 && (
            <Link
              href={{ pathname: "/saved", query: { ids: savedWords.join(",") } }}
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg font-roboto text-base sm:text-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View Saved Words ({savedWords.length})
            </Link>
          )}
          <Link
            href="/all-words"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg font-roboto text-base sm:text-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Words
          </Link>
        </motion.div>

        {/* Slider Container */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="overflow-hidden"
            key={currentSlide}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-xl border border-white/20">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-4 sm:mb-6 font-orbitron tracking-tight bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                {wordGroups[currentSlide].title}
              </h2>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {wordGroups[currentSlide].words.map((word: Word) => (
                  <WordCard
                    key={word.id}
                    word={word}
                    onCardClick={handleCardClick}
                    isVisible={!savedWords.includes(word.id)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-700 to-gray-800 text-white p-2 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-700 to-gray-800 text-white p-2 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Slide Indicator */}
        <div className="text-center mt-4 text-white font-roboto">
          Day {currentSlide + 1} of {totalSlides}
        </div>
      </motion.div>
    </div>
  );
};

export default WordCardsPage;