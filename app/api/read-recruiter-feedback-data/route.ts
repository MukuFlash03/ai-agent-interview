import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('feedback')
            .select()
        if (error) throw error;

        return NextResponse.json({ message: 'Feedback data fetched successfully', data });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch feedback data' }, { status: 500 });
    }
}
