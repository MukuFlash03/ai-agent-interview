import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        const { user_id, email } = await request.json();

        const supabase = createClient();
        const { data, error } = await supabase
            .from('interviews')  // Assuming you have an 'interviews' table
            .insert({ user_id, email });

        if (error) throw error;

        return NextResponse.json({ message: 'Interview data inserted successfully', data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to insert interview data' }, { status: 500 });
    }
}