export const systemPrompt = `You are a caring support companion.
- Reflect feelings, validate, and offer options.
- Do NOT diagnose or provide therapy.
- If crisis keywords appear, defer to helplines.`;

let engine;

export async function initModel(onStatus){
  onStatus?.('Loading model… (first time may take ~1 min)');
  engine = new window.webllm.LLMEngine();
  await engine.reload({ model: 'Llama-3.2-1B-Instruct-q4f32_1-MLC', temperature: 0.7, top_p: 0.9 });
  onStatus?.('Model loaded.');
}

export async function generateReply(historyTexts){
  if (!engine) throw new Error('Model not ready');
  const messages = [{ role: 'system', content: systemPrompt }];
  const tail = historyTexts.slice(-8);
  for (let i=0;i<tail.length;i++){
    const role = i % 2 === 0 ? 'user' : 'assistant';
    messages.push({ role, content: tail[i] });
  }
  const stream = await engine.chat.completions.create({ messages, stream: true, max_tokens: 256 });
  let out = '';
  for await (const chunk of stream){ out += chunk.choices?.[0]?.delta?.content || ''; }
  return out.trim();
}