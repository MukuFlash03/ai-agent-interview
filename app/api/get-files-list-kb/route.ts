import { NextResponse } from 'next/server';

const VAPI_PRIVATE_API_KEY = process.env.NEXT_PUBLIC_VAPI_PRIVATE_API_KEY!;

export async function GET() {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${VAPI_PRIVATE_API_KEY}`
        }
    };

    try {
        const response = await fetch('https://api.vapi.ai/file', options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const kbFilesList = await response.json();
        const fileNames: string[] = kbFilesList.map((file: any) => file.name);
        console.log('List of files from Knowledge based:', fileNames);

        return NextResponse.json({ message: 'List of files from Knowledge based fetched successfully', fileNames });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch files from Knowledge base' }, { status: 500 });
    }
}