import { NextRequest, NextResponse } from 'next/server';

const VAPI_PRIVATE_API_KEY = process.env.NEXT_PUBLIC_VAPI_PRIVATE_API_KEY!;

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const apiFormData = new FormData();
        apiFormData.append('file', file);

        const response = await fetch('https://api.vapi.ai/file', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${VAPI_PRIVATE_API_KEY}`,
            },
            body: apiFormData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json({ message: 'File uploaded to Knowledge base successfully', data });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to upload file to Knowledge base' }, { status: 500 });
    }
}