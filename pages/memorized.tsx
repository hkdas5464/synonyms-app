// pages/memorized.tsx
import { useRouter } from "next/router";
import Link from "next/link";
import { wordGroups } from "../data/words";
import { Word } from "../types/word";

const MemorizedPage: React.FC = () => {
  const router = useRouter();
  const { ids } = router.query;

  const memorizedIds = Array.isArray(ids) ? ids : ids ? [ids] : [];

  const memorizedWords: Word[] = wordGroups
    .flatMap((group) => group.words)
    .filter((word) => memorizedIds.includes(word.id));

  if (memorizedWords.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">No words memorized yet</h1>
        <Link href="/" className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Memorized Words</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {memorizedWords.map((word) => (
            <div key={word.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{word.text}</h2>
              <p className="text-gray-600 mb-2"><strong>English:</strong> {word.eng}</p>
              <p className="text-gray-600"><strong>Meaning:</strong> {word.meaning}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/memory" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Back to Cards
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemorizedPage;