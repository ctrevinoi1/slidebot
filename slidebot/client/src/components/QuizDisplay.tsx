type QuizQuestion = {
  question: string;
  options?: string[];
  choices?: string[];
  correct?: string;
  answer?: string;
};

type Props = {
  quiz: QuizQuestion[];
};

const QuizDisplay: React.FC<Props> = ({ quiz }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Generated Quiz
      </h2>
      <ol className="space-y-6">
        {quiz.map((q, idx) => {
          const choices = q.options || q.choices || [];
          const correctAnswer = q.correct || q.answer || "";
          
          return (
            <li key={idx} className="text-gray-700">
              <p className="font-semibold mb-3">
                {idx + 1}. {q.question}
              </p>
              <ul className="space-y-2 ml-4">
                {choices.map((choice, ci) => (
                  <li key={ci} className="flex items-start">
                    <span className="font-medium mr-2">{String.fromCharCode(65 + ci)}.</span>
                    <span>{choice.replace(/^[A-D]\)\s*/, '')}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-green-600 font-medium">
                Correct Answer: {correctAnswer}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default QuizDisplay; 