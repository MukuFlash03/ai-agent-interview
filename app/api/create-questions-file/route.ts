import { NextRequest, NextResponse } from 'next/server';

const VAPI_PRIVATE_API_KEY = process.env.NEXT_PUBLIC_VAPI_PRIVATE_API_KEY!;

export async function POST(request: NextRequest) {
    try {
        const { filename, content } = await request.json();

        if (!filename || !content) {
            return NextResponse.json({ error: 'Filename and content are required' }, { status: 400 });
        }

        const formData = new FormData();
        formData.append('file', new Blob([content], { type: 'text/plain' }), filename);

        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${VAPI_PRIVATE_API_KEY}`,
            },
            body: formData
        };

        const response = await fetch('https://api.vapi.ai/file', options);

        if (!response.ok) {
            throw new Error(`HTTP error - failed to upload file; status: ${response.status}`);
        }

        const result = await response.json();

        return NextResponse.json({ message: 'File uploaded successfully', data: result });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}