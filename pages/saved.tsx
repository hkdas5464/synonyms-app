// pages/saved.tsx
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { wordGroups } from "../data/synonyms";
import { Word } from "../types/word";

const SavedPage: React.FC = () => {
  const router = useRouter();
  const { ids } = router.query;

  const savedIds = typeof ids === "string" ? ids.split(",") : [];

  const savedWords: Word[] = wordGroups
    .flatMap((group) => group.words)
    .filter((word) => savedIds.includes(word.id));

  const handleMoveToMain = (wordId: string) => {
    const storedWords = localStorage.getItem("savedWords");
    let currentSavedWords: string[] = storedWords ? JSON.parse(storedWords) : [];
    currentSavedWords = currentSavedWords.filter((id) => id !== wordId);

    if (currentSavedWords.length > 0) {
      localStorage.setItem("savedWords", JSON.stringify(currentSavedWords));
    } else {
      localStorage.removeItem("savedWords");
    }

    router.push(
      {
        pathname: "/saved",
        query: { ids: currentSavedWords.join(",") },
      },
      undefined,
      { shallow: true }
    );
  };

  if (savedWords.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900">
        <motion.div
          className="text-center bg-white/10 backdrop-blur-lg rounded-xl p-6 sm:p-8 shadow-xl border border-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 font-orbitron tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            No Words Saved Yet
          </h1>
          <Link
            href="/memory"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg font-roboto text-base sm:text-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Back to Explorer
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-8 sm:mb-10 md:mb-12 font-orbitron tracking-wide bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Saved AI Words
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {savedWords.map((word) => (
            <motion.div
              key={word.id}
              className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-lg p-4 sm:p-5 shadow-xl border border-white/20 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 255, 255, 0.1)" }}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 font-orbitron text-center bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                {word.text}
              </h2>
              <p className="text-sm sm:text-base text-gray-200 mb-1 font-roboto">
                <strong className="text-cyan-300">Eng:</strong> {word.eng}
              </p>
              <p className="text-sm sm:text-base text-gray-200 mb-3 font-roboto">
                <strong className="text-cyan-300">Mean:</strong> {word.meaning}
              </p>
              <button
                onClick={() => handleMoveToMain(word.id)}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:from-green-600 hover:to-teal-700 transition-all duration-300 font-roboto text-sm sm:text-base shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Move to Main
              </button>
            </motion.div>
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
      </div>
    </div>
  );
};

export default SavedPage;