import { useState } from "react";

const apiOptions = {
  cat: {
    name: "Cat Fact",
    url: "https://catfact.ninja/fact",
    extract: (data) => data.fact,
  },
  joke: {
    name: "Random Joke",
    url: "https://official-joke-api.appspot.com/random_joke",
    extract: (data) => `${data.setup} — ${data.punchline}`,
  },
  advice: {
    name: "Advice",
    url: "https://api.adviceslip.com/advice",
    extract: (data) => data.slip.advice,
  },
  trivia: {
    name: "Trivia",
    url: "https://uselessfacts.jsph.pl/random.json?language=en",
    extract: (data) => data.text,
  },
};

function App() {
  const [selectedApi, setSelectedApi] = useState("cat");
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    setLoading(true);
    setFact("");
    try {
      const { url, extract } = apiOptions[selectedApi];
      const res = await fetch(url);
      const data = await res.json();
      setFact(extract(data));
    } catch (err) {
      setFact("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <main className="flex flex-col items-center justify-center px-4 text-center flex-grow">
        <h1 className="text-3xl font-bold mb-4">🧠 Fun Fact Generator</h1>

        <div className="mb-4">
          <select
            value={selectedApi}
            onChange={(e) => setSelectedApi(e.target.value)}
            className="p-2 rounded border border-gray-300 cursor-pointer"
          >
            {Object.entries(apiOptions).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchFact}
          className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Fact"}
        </button>

        {fact && <p className="mt-6 max-w-xl text-lg text-gray-800">{fact}</p>}
      </main>

      {/* Styled Footer */}
      <footer className="w-full py-4 bg-white border-t text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Made with{" "}
        <span className="text-red-500">❤️</span> by{" "}
        <span className="text-blue-600 font-medium">Souvik Das</span>
      </footer>
    </div>
  );
}

export default App;
