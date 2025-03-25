// components/SynonymCardDisplay.tsx
import { SynonymCard } from "../pages/types";

interface CardProps {
  card: SynonymCard;
  onToggleRemembered: () => void;
}

export default function SynonymCardDisplay({ card, onToggleRemembered }: CardProps) {
  const getLabel = () => {
    if (card.id.startsWith("i")) return "Idiom";
    if (card.id.startsWith("s")) return "Substitution";
    return "Word";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      <h2 className="text-2xl font-bold text-purple-700 mb-3">{card.text || "Missing Word"}</h2>
      <div className="space-y-2">
        {/* <p>
          <span className="font-semibold text-gray-800">{getLabel()}:</span>{" "}
          <span className="text-blue-600">{card.text || "Missing Text"}</span>
        </p> */}
        <p>
          <span className="font-semibold text-gray-800">English:</span>{" "}
          <span className="text-blue-600">{card.eng || "Missing English"}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-800">Room:</span>{" "}
          <span className="text-blue-600">{card.room || "Missing Room"}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-800">Hindi:</span>{" "}
          <span className="text-green-600">{card.meaning || "Missing Hindi"}</span>
        </p>
        <p className="text-gray-600 italic bg-yellow-50 p-2 rounded">
          <span className="font-semibold">English Mnemonic:</span> {card.mnemonicEnglish || "No Mnemonic"}
        </p>
        <p className="text-gray-600 italic bg-orange-50 p-2 rounded">
          <span className="font-semibold">Hindi Mnemonic:</span> {card.mnemonicHindi || "No Mnemonic"}
        </p>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            checked={card.remembered}
            onChange={onToggleRemembered}
            className="form-checkbox h-5 w-5 text-purple-600"
          />
          <span className="text-gray-700">
            {card.remembered ? "Unmark as Remembered" : "Mark as Remembered"}
          </span>
        </label>
      </div>
    </div>
  );
}