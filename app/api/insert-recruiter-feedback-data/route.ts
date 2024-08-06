import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        const {
            interview_id,
            user_id,
            summary,
            overall_score,
            metrics,
            transcript,
        } = await request.json();

        const supabase = createClient();
        const { data, error } = await supabase
            .from('feedback')
            .insert({
                interview_id,
                user_id,
                summary,
                overall_score,
                metrics,
                transcript,
            });

        if (error) throw error;

        return NextResponse.json({ message: 'Feedback data inserted successfully', data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to insert feedvack data' }, { status: 500 });
    }
}