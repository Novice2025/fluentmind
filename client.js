const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const responseText = document.getElementById("responseText");

sendBtn.addEventListener("click", async () => {
  const question = userInput.value.trim();
  if (!question) {
    alert("Por favor, digite uma dúvida primeiro.");
    return;
  }

  responseText.textContent = "💭 Gerando resposta... aguarde ⏳";

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();

    if (data.error) {
      responseText.textContent = "❌ Erro: " + data.error;
    } else {
      responseText.textContent = data.answer;
    }
  } catch (err) {
    responseText.textContent = "🚨 Ocorreu um erro: " + err.message;
  }
});
