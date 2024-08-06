import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        // const {
        //     interview_id,
        //     user_id
        // } = await request.json();

        const supabase = createClient();
        const { data, error } = await supabase
            .from('feedback')
            .select()
        // .select('interview_id, user_id')
        // .eq(interview_id, user_id)

        if (error) throw error;

        return NextResponse.json({ message: 'Feedback data fetched successfully', data });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch feedback data' }, { status: 500 });
    }
}
