import { useState } from "react";
import { OpenAI } from "openai";

const openai = new OpenAI({
	baseURL: import.meta.env.VITE_GROK_API_URL,
	apiKey: import.meta.env.VITE_GROK_API_KEY,
	dangerouslyAllowBrowser: true,
});

const PROMPT = (data: unknown) => `
Analyze retirement investment:

${JSON.stringify(data, null, 2)}

Give:
• Best investment option
• Risk analysis
• Tax saving tips
• Profit optimization
`;

export default function AISuggestion({ data }: { data: unknown }) {
	const [res, setRes] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const askAI = async () => {
		setLoading(true);
		setError(null);
		setRes("");

		try {
			const chatCompletion = await openai.chat.completions.create({
				messages: [
					{
						role: "user",
						content: PROMPT(data),
					},
				],
				model: "llama-3.3-70b-versatile",
				max_tokens: 1024,
			});

			const content =
				chatCompletion.choices[0]?.message?.content?.trim() ?? "";
			setRes(content || "No response.");
		} catch (e) {
			const message =
				e instanceof Error ? e.message : "Failed to get AI suggestion";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-black text-white p-6 rounded-xl">
			<button
				onClick={askAI}
				disabled={loading}
				className="bg-white text-black px-4 py-2 rounded mb-3 disabled:opacity-50"
			>
				{loading ? "Loading…" : "AI Suggestion"}
			</button>

			{error && (
				<p className="text-red-400 mb-2" role="alert">
					{error}
				</p>
			)}

			{res && (
				<pre className="whitespace-pre-wrap text-sm">{res}</pre>
			)}
		</div>
	);
}
