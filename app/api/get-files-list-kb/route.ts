import { FilesResponse, SelectedFilesResponse } from '@/lib/types/files';
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
        const kbFilesResponse = await response.json();
        const kbFilesList: SelectedFilesResponse[] = kbFilesResponse.map((file: FilesResponse) => ({
            id: file.id,
            name: file.name,
        }));
        console.log('List of files from Knowledge base:', kbFilesList);

        return NextResponse.json({ message: 'List of files from Knowledge base fetched successfully', kbFilesList });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch files from Knowledge base' }, { status: 500 });
    }
}