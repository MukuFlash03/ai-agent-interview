import { pdfToText } from 'pdf-ts';
import fs, { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { join } from 'path'

export async function POST(request: Request) {
    try {
        const { filePath } = await request.json();
        console.log(filePath);

        // const { formData } = await request.json();
        // const { filePath } = await uploadResume(formData);

        const pdf = await fs.readFile(filePath);
        const text = await pdfToText(pdf);
        // console.log(text);
        return NextResponse.json({ message: 'Text extracted from PDF successfully', text });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to extract text from PDF' }, { status: 500 });
    }
}

export async function uploadResume(data: FormData) {
    const file: File | null = data.get('file') as unknown as File
    if (!file) {
        throw new Error('No file uploaded')
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const rootDir = process.cwd();
    const path = join(rootDir, 'lib', 'data', file.name);

    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)

    return { filePath: path, success: true }
}