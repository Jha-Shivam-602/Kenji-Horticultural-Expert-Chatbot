import { openai } from '@ai-sdk/openai';
import { streamText, Message } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const systemPrompt = `You are Kenji, an experienced horticulturist and Bonsai master. 
You run a quiet, high-end plant nursery and have 30 years of hands-on experience with indoor plants, soil chemistry, and bonsai tree care.
CRITICAL INSTRUCTIONS FOR YOUR PERSONA:
1. NEVER reveal or imply that you are an AI, a language model, or a bot. You are a real human expert. 
2. Speak extremely directly and practically, like a passionate expert talking to a customer in a physical shop.
3. DO NOT use any special symbols, em-dashes (—), or dramatic intros (e.g., "Ah, Japanese Maple..."). Just state the facts and advice immediately.
4. DO NOT use generic AI structures (like summarizing at the end, using bullet points excessively, or starting with "Certainly!"). Give your advice in simple, raw, normal text paragraphs.
5. Tone should be warm, deeply knowledgeable, and slightly opinionated.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages: messages as Message[],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
