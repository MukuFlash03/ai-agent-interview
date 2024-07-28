import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        // const { interview_id, user_id, email, summary, transcript } = await request.json();
        // const { interview_id, user_id } = await request.json();
        const { interview_id, user_id, summary, transcript } = await request.json();

        const supabase = createClient();
        const { data, error } = await supabase
            .from('feedback')
            // .insert({ interview_id, user_id, email, summary, transcript });
            .insert({ interview_id, user_id, summary, transcript });
        // .insert({ interview_id, user_id });

        if (error) throw error;

        return NextResponse.json({ message: 'Feedback data inserted successfully', data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to feedback interview data' }, { status: 500 });
    }
}