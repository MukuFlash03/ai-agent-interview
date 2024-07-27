import * as pdfjsLib from 'pdfjs-dist';

// Ensure the workerSrc is set
pdfjsLib.GlobalWorkerOptions.workerSrc = 'path/to/pdf.worker.js';

async function readResumeFromPDF(filePath: string): Promise<string> {
    try {
        const doc = await pdfjsLib.getDocument(filePath).promise;
        const page = await doc.getPage(1); // Get the first (and only) page
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item: any) => item.str).join(' ');
        return text;
    } catch (error) {
        console.error('Error reading PDF:', error);
        return '';
    }
}