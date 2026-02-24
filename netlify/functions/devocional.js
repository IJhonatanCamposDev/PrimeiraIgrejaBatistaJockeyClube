exports.handler = async function () {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      versiculo: "Salmos 23:1",
      mensagem: "O Senhor é o meu pastor; nada me faltará."
    })
  };
};