import fs from'fs';
import pdfParse from'pdf-parse';
import { ChromaClient } from'chromadb';

const chroma = new ChromaClient(); // ChromaDB istemcisi

async function processPDF(pdfPath) {
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(pdfBuffer);
    const text = pdfData.text.replace(/\n+/g, ' '); // Metni temizle

    // Nomic Embed API ile metni vektöre dönüştür
    const response = await fetch('https://api.nomic.ai/embed-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: [text] })
    });

    const data = await response.json();
    const embedding = data.embeddings[0];

    // ChromaDB'ye kaydet
    await chroma.addDocuments({
        collection: 'pdf_data',
        documents: [{ id: 'pdf_1', text, embedding }]
    });

    console.log('PDF işlendi ve veritabanına eklendi.');
}

processPDF('C:\Users\selhack\Desktop\Chatbot\belge.pdf');
