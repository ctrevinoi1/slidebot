import { useState } from "react";
import Dropzone from "./components/Dropzone";
import QuizDisplay from "./components/QuizDisplay";

// Use environment variable for API URL, fallback to relative path
const API_URL = import.meta.env.VITE_API_URL || "";

function App() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError("");
    setQuiz(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/generate-quiz`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate quiz");
      }

      const data = await response.json();
      setQuiz(data.quiz);
    } catch (err) {
      setError("Failed to generate quiz. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">SlideBot</h1>
          <p className="text-lg text-gray-600">
            AI-powered quiz generation from your slides
          </p>
        </header>

        {!quiz && (
          <Dropzone
            onFileUpload={handleFileUpload}
            loading={loading}
            error={error}
          />
        )}

        {quiz && (
          <>
            <QuizDisplay quiz={quiz} />
            <div className="text-center mt-6">
              <button
                onClick={() => setQuiz(null)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Upload Another File
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App; 