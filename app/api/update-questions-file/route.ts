import { NextRequest, NextResponse } from 'next/server';

const VAPI_PRIVATE_API_KEY = process.env.NEXT_PUBLIC_VAPI_PRIVATE_API_KEY!;

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await request.json();

        if (!body.name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const response = await fetch(`https://api.vapi.ai/file/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${VAPI_PRIVATE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: body.name })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json({ message: 'File updated successfully', data });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to update file' }, { status: 500 });
    }
}