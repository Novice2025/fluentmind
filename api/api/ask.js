import OpenAI from "openai";

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
Responda sempre seguindo esta estrutura:

1️⃣ Saudação e empatia em português ("Isso é super comum, não se preocupe...").
2️⃣ Casual English: maneira natural e educada para o trabalho.
3️⃣ Semi-formal English: versão neutra e polida.
4️⃣ Formal Writing English: versão profissional para e-mails ou apresentações.
5️⃣ Contexto real de uso (como um brasileiro em reunião usaria).
6️⃣ Diálogo entre dois brasileiros discutindo o uso.
7️⃣ Explicação da expressão em português.
8️⃣ Associação em inglês (sinônimos, equivalentes).
9️⃣ Dica para uso por americanos/brasileiros.
10️⃣ Destaque final da expressão-chave.
`
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7
    });

    const answer = completion.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
