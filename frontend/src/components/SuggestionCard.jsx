export default function SuggestionCard({ name, message }) {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-5 rounded-2xl shadow-lg mb-4">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>

      <p className="text-sm opacity-90">{message}</p>
    </div>
  );
}
