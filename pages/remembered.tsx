// pages/remembered.tsx
import { useState, useEffect } from "react";
import { SynonymCard } from "../types";
import SynonymCardDisplay from "../components/SynonymCardDisplay";
import Link from "next/link";

export default function RememberedSynonyms() {
  const [rememberedCards, setRememberedCards] = useState<SynonymCard[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("allCards");
    const allCards: SynonymCard[] = saved ? JSON.parse(saved) : [];
    setRememberedCards(allCards.filter(card => card.remembered));
  }, []);

  const toggleRemembered = (id: string) => {
    const saved = localStorage.getItem("allCards");
    const allCards: SynonymCard[] = saved ? JSON.parse(saved) : [];
    const updatedCards = allCards.map(card =>
      card.id === id ? { ...card, remembered: !card.remembered } : card
    );
    localStorage.setItem("allCards", JSON.stringify(updatedCards));
    setRememberedCards(updatedCards.filter(card => card.remembered));
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-blue-100 to-green-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-800 animate-pulse">
        Remembered Items
      </h1>
      <Link href="/" className="text-blue-600 underline mb-4 block text-center">
        Back to Main Page
      </Link>
      <div className="max-w-5xl mx-auto">
        {rememberedCards.length === 0 ? (
          <p className="text-center text-gray-600">No items remembered yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rememberedCards.map((card) => (
              <SynonymCardDisplay
                key={card.id}
                card={card}
                onToggleRemembered={() => toggleRemembered(card.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}