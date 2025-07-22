import axios from "axios";
import { extractText } from "./fileParser";

interface QuizQuestion {
  question: string;
  choices: string[];
  answer: string;
}

export async function generateQuiz(fileBuffer: Buffer, extension: string): Promise<QuizQuestion[]> {
  // 1. Extract text from file
  const rawText = await extractText(fileBuffer, extension);

  // 2. Trim to a reasonable size (Azure OpenAI context limit). We'll take first 8000 characters.
  const text = rawText.length > 8000 ? rawText.slice(0, 8000) : rawText;

  // 3. Build prompt
  const systemPrompt = `You are an AI assistant that generates educational multiple choice quizzes strictly based on the provided source material. Avoid introducing any information that is not present in the source.`;

  const userPrompt = `Source material:\n"""\n${text}\n"""\n\nGenerate a quiz with 5 multiple choice questions (each with 4 options labeled A, B, C, D) based solely on the source material above. Answer format must be valid JSON array where each element has the following shape:\n{\n  \"question\": string,\n  \"choices\": string[4],\n  \"answer\": string (one of A|B|C|D)\n}`;

  const payload = {
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    max_tokens: 1024,
    temperature: 0.7,
    top_p: 0.95,
    n: 1
  };

  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

  if (!endpoint || !apiKey || !deployment) {
    throw new Error("Azure OpenAI environment variables are not set correctly.");
  }

  const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2023-05-15`;

  const headers = {
    "api-key": apiKey,
    "Content-Type": "application/json"
  };

  const response = await axios.post(url, payload, { headers });

  const content = response.data.choices[0].message.content as string;

  // Attempt to parse JSON
  let quiz: QuizQuestion[] = [];
  try {
    const jsonStart = content.indexOf("[");
    const jsonEnd = content.lastIndexOf("]");
    const jsonString = content.slice(jsonStart, jsonEnd + 1);
    quiz = JSON.parse(jsonString);
  } catch (err) {
    console.warn("Failed to parse JSON from Azure OpenAI output. Returning raw content.", err);
    throw new Error("Failed to parse quiz JSON");
  }

  return quiz;
} 