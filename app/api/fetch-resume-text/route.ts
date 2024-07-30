import { pdfToText } from 'pdf-ts';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { filePath } = await request.json();
        const pdf = await fs.readFile(filePath);
        const text = await pdfToText(pdf);
        return NextResponse.json({ message: 'Text extracted from PDF successfully', text });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to extract text from PDF' }, { status: 500 });
    }
}