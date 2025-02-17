import ollama from "ollama";
import readline from "readline-sync";

console.log("Chatbot'a Hoş Geldiniz! (Çıkmak için 'exit' yazın)");

async function startChat() {
    while (true) {
        let userInput = readline.question("Sen: ");
        if (userInput.toLowerCase() === "exit") {
            console.log("Görüşmek üzere!");
            break;
        }

        try {
            const response = await ollama.chat({
                model: "deepseek-r1:7b",
                messages: [{ role: "user", content: userInput }]
            });

            console.log("Bot:", response.message.content);
        } catch (error) {
            console.error("Hata:", error.message);
        }
    }
}

processPDF();
