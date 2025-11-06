import OpenAI from "openai";

// Initialize OpenAI client using the API key from environment variables
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Pergunta vazia." });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: `
Você é Daby AI, o coach de inglês pessoal do usuário.
Responda seguindo a estrutura de 10 passos com emojis e destaque de ⭐:

1️⃣ Saudação e empatia em português.
2️⃣ Casual English.
3️⃣ Semi-formal English.
4️⃣ Formal Writing English.
5️⃣ Contexto real de uso.
6️⃣ Diálogo entre brasileiros.
7️⃣ Explicação em português.
8️⃣ Associação em inglês.
9️⃣ Dica para americanos/brasileiros.
10️⃣ Destaque final da expressão-chave.
          `
        },
        { role: "user", content: question }
      ],
      temperature: 0.7
    });

    const answer = completion.choices[0].message.content;
    res.status(200).json({ answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar resposta: " + err.message });
  }
}
