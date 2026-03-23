import { Message } from 'ai';

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

    const encoder = new TextEncoder();
    const customStream = new ReadableStream({
      async start(controller) {
        const text = "The OpenAI API has been disabled as requested. This is a local mock response from Master Kenji. I am still here to help with your plant care needs, without hitting any external APIs!";
        const chunks = text.split(' ');
        for (let i = 0; i < chunks.length; i++) {
          controller.enqueue(encoder.encode(`0:"${chunks[i]}${i === chunks.length - 1 ? '' : ' '}"\n`));
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        controller.close();
      },
    });

    return new Response(customStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'x-vercel-ai-data-stream': 'v1',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
