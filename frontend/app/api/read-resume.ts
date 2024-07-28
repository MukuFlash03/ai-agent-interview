import type { NextApiRequest, NextApiResponse } from 'next'
import * as pdfjsLib from 'pdfjs-dist'

// Ensure the workerSrc is set
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { filePath } = req.body;

            if (!filePath) {
                return res.status(400).json({ error: 'File path is required' });
            }

            const resumeText = await readResumeFromPDF(filePath);

            // Here you can add any processing logic for the resumeText

            res.status(200).json({ content: resumeText });
        } catch (error) {
            console.error('Error in read-resume API route:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}