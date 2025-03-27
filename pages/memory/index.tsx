import { motion } from "framer-motion";
import { useState, useEffect, Suspense, lazy } from "react";
import Link from "next/link";
import { wordGroups } from "../../data/synonyms";
import { WordGroup, Word } from "../../types/word";

const WordCard = lazy(() => import("../../components/WordCard"));

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
    const timeout = setTimeout(() => {
      if (savedWords.length > 0) {
        localStorage.setItem("savedWords", JSON.stringify(savedWords));
      } else {
        localStorage.removeItem("savedWords");
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [savedWords]);

  const handleCardClick = (wordId: string) => {
    setSavedWords((prev) => (prev.includes(wordId) ? prev : [...prev, wordId]));
  };

  const totalSlides = wordGroups.length;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="min-h-screen py-6 px-4 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 overflow-x-hidden">
      <motion.div
        className="max-w-full mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center text-white mb-6 font-orbitron tracking-wide drop-shadow-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          AI Word Explorer
        </h1>

        <motion.div
          className="text-center mb-6 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {savedWords.length > 0 && (
            <Link
              href={{ pathname: "/saved", query: { ids: savedWords.join(",") } }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg font-roboto text-sm xs:text-base hover:shadow-xl transform hover:-translate-y-1"
            >
              View Saved ({savedWords.length})
            </Link>
          )}
          <Link
            href="/all-words"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1.5 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg font-roboto text-sm xs:text-base hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Words
          </Link>
          <Link
            href="/"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1.5 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg font-roboto text-sm xs:text-base hover:shadow-xl transform hover:-translate-y-1"
          >
            Home
          </Link>
        </motion.div>

        {/* Slider Container */}
        <div className="relative w-full max-w-[90vw] lg:max-w-full lg:h-[calc(100vh-200px)] mx-auto">
          <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
            <motion.div
              key={currentSlide}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 lg:p-6 shadow-xl border border-white/20 w-full h-full flex flex-col justify-center">
                <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-4 lg:mb-6 font-orbitron tracking-tight bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent text-center">
                  {wordGroups[currentSlide].title}
                </h2>
                <div className="flex flex-wrap justify-center gap-2 lg:gap-4 overflow-y-auto">
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
          </Suspense>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute cursor-pointer left-[-12px] lg:left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-700 to-gray-800 text-white p-2 lg:p-3 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none touch-manipulation z-10"
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute cursor-pointer right-[-12px] lg:right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-700 to-gray-800 text-white p-2 lg:p-3 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none touch-manipulation z-10"
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="text-center mt-4 text-white font-roboto text-sm">
          Day {currentSlide + 1} of {totalSlides}
        </div>
      </motion.div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default WordCardsPage;