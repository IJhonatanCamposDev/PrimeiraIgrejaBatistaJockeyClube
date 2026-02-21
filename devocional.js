exports.handler = async (event) => {

  const { tema } = JSON.parse(event.body);

  const fetch = require("node-fetch");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content: "Você é um pastor experiente que escreve devocionais bíblicos profundos."
        },
        {
          role: "user",
          content: `Crie um devocional completo sobre ${tema}. Estruture com:
          - Versículo base
          - Explicação
          - Aplicação prática
          - Oração final`
        }
      ]
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      resultado: data.choices?.[0]?.message?.content || "Erro ao gerar devocional."
    })
  };
};