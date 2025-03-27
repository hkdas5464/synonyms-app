// pages/index.tsx
import { useState, useEffect } from "react";
import { SynonymCard, WordGroup } from "../types/types";
import SynonymCardDisplay from "../components/SynonymCardDisplay";
import { wordGroups, idiomGroups, substitutionGroups } from "../data/words";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<string>("Day_1");
  const [selectedCategory, setSelectedCategory] = useState<"words" | "idioms" | "substitutions">("words");
  const [cards, setCards] = useState<SynonymCard[]>([]);
  const [newText, setNewText] = useState<string>("");
  const [newEng, setNewEng] = useState<string>("");
  const [newMeaning, setNewMeaning] = useState<string>("");
  const [newRoom, setNewRoom] = useState<string>("");

  const getGroups = () => {
    switch (selectedCategory) {
      case "words": return wordGroups;
      case "idioms": return idiomGroups;
      case "substitutions": return substitutionGroups;
      default: return wordGroups;
    }
  };

  useEffect(() => {
    const groups = getGroups();
    console.log("Selected Groups:", groups);
    const selectedGroup = groups.find(group => group.title === selectedDay);
    console.log("Selected Group:", selectedGroup);

    if (selectedGroup) {
      const saved = localStorage.getItem("allCards");
      const allCards: SynonymCard[] = saved ? JSON.parse(saved) : [];
      console.log("All Cards from LocalStorage:", allCards);

      const dayCards = selectedGroup.words.map(word => {
        const existingCard = allCards.find(c => c.id === word.id);
        const card: SynonymCard = {
          id: word.id,
          text: word.text,
          eng: word.eng,
          meaning: word.meaning,
          mnemonicEnglish: generateMnemonicEnglish(word.text, word.eng),
          mnemonicHindi: generateMnemonicHindi(word.text, word.meaning),
          room: generateRoom(word.text),
          remembered: existingCard ? existingCard.remembered : false,
        };
        console.log("Generated Card:", card);
        return card;
      });

      const filteredCards = dayCards.filter(card => !card.remembered);
      console.log("Filtered Cards (unremembered):", filteredCards);
      setCards(filteredCards);

      localStorage.setItem("allCards", JSON.stringify([...allCards.filter(c => !dayCards.some(dc => dc.id === c.id)), ...dayCards]));
    } else {
      console.log(`No group found for ${selectedDay} in ${selectedCategory}`);
      setCards([]);
    }
  }, [selectedDay, selectedCategory]);

  const generateMnemonicEnglish = (text: string, eng: string): string => {
    const actions = ["dancing", "singing", "jumping", "painting"];
    const characters = ["elephant", "wizard", "dragon", "clown"];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const randomChar = characters[Math.floor(Math.random() * actions.length)];
    return `A ${randomAction} ${randomChar} in a room ${text}ing with ${eng.split(" ")[0]}`;
  };

  const generateMnemonicHindi = (text: string, meaning: string): string => {
    const actions = ["नाचता हुआ", "गाता हुआ", "कूदता हुआ", "चित्र बनाता हुआ"];
    const characters = ["हाथी", "जादूगर", "ड्रैगन", "जोकर"];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const randomChar = characters[Math.floor(Math.random() * actions.length)];
    return `एक ${randomAction} ${randomChar} कमरे में ${text} के साथ ${meaning} चिल्लाता हुआ`;
  };

  const generateRoom = (text: string): string => {
    const rooms = ["Magic Chamber", "Sky Tower", "Golden Hall", "Crystal Cave"];
    return rooms[Math.floor(Math.random() * rooms.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: SynonymCard = {
      id: Date.now().toString(),
      text: newText,
      eng: newEng,
      meaning: newMeaning,
      mnemonicEnglish: generateMnemonicEnglish(newText, newEng),
      mnemonicHindi: generateMnemonicHindi(newText, newMeaning),
      room: newRoom || generateRoom(newText),
      remembered: false,
    };
    const saved = localStorage.getItem("allCards");
    const allCards: SynonymCard[] = saved ? JSON.parse(saved) : [];
    localStorage.setItem("allCards", JSON.stringify([...allCards, newCard]));
    setCards([...cards, newCard]);
    setNewText("");
    setNewEng("");
    setNewMeaning("");
    setNewRoom("");
  };

  const toggleRemembered = (id: string) => {
    const saved = localStorage.getItem("allCards");
    const allCards: SynonymCard[] = saved ? JSON.parse(saved) : [];
    const updatedCards = allCards.map(card =>
      card.id === id ? { ...card, remembered: !card.remembered } : card
    );
    localStorage.setItem("allCards", JSON.stringify(updatedCards));
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-100 to-green-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-800 animate-pulse">
        AI Mnemonic Word Palace
      </h1>
      <div className="flex justify-center items-center gap-4 mb-4">
        <Link href="/remembered" className="text-blue-600 underline">
          View Remembered Items
        </Link>
        <Link
          href="/memory"
         className="text-blue-600 underline"
        >
          Go to Blackbook
        </Link>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex space-x-4">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="p-3 border rounded-lg w-full md:w-1/4"
          >
            {getGroups().map(group => (
              <option key={group.title} value={group.title}>{group.title}</option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as "words" | "idioms" | "substitutions")}
            className="p-3 border rounded-lg w-full md:w-1/4"
          >
            <option value="words">Words</option>
            <option value="idioms">Idioms</option>
            <option value="substitutions">One-Word Substitutions</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="mb-12 bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder={selectedCategory === "idioms" ? "Idiom (e.g., Bite the bullet)" : selectedCategory === "substitutions" ? "Substitution (e.g., Omniscient)" : "Word (e.g., Abate)"}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="text"
              value={newEng}
              onChange={(e) => setNewEng(e.target.value)}
              placeholder="English Meaning (e.g., To reduce)"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="text"
              value={newMeaning}
              onChange={(e) => setNewMeaning(e.target.value)}
              placeholder="Hindi (e.g., कम करना)"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              placeholder="Memory Room (e.g., Sky Tower)"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Add to Memory Palace
          </button>
        </form>

        {cards.length === 0 ? (
          <p className="text-center text-gray-600">No unremembered {selectedCategory} for this day.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    rotate: 10,
                    transition: { duration: 0.5, ease: "easeInOut" }
                  }}
                  layout
                >
                  <SynonymCardDisplay
                    card={card}
                    onToggleRemembered={() => toggleRemembered(card.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}