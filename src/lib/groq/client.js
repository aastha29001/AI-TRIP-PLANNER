import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const SYSTEM_PROMPT =
  'You are a travel planner assistant. Always respond with valid raw JSON only — ' +
  'no markdown, no code fences, no extra text before or after the JSON object.';

/**
 * chatSession — matches the legacy sendMessage() interface so pages
 * don't need to change call sites.
 *
 * Usage: const result = await chatSession.sendMessage(prompt)
 *        const text   = result.response.text()
 */
export const chatSession = {
  sendMessage: async (prompt) => {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: prompt },
      ],
      temperature: 1,
      max_tokens: 8192,
      response_format: { type: 'json_object' },
    });

    const text = completion.choices[0]?.message?.content ?? '{}';
    return { response: { text: () => text } };
  },
};

/**
 * sendPrompt — lower-level helper if you just want the raw JSON string.
 */
export const sendPrompt = async (prompt) => {
  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
};
