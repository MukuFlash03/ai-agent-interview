import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {

        const supabase = createClient();
        const { data, error } = await supabase
            .from('feedback')
            .select()

        if (error) throw error;

        return NextResponse.json({ message: 'Feedback data fetched successfully', data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch feedback data' }, { status: 500 });
    }
}


// export async function fetchFeedback(): Promise<SelectedListCallsResponse[]> {
//     const supabase = createClient();

//     const {
//         data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//         return redirect("/login");
//     }

//     const options = {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${VAPI_PUBLIC_API_KEY}` }
//     };

//     try {
//         const response = await fetch('https://api.vapi.ai/call', options);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const fullResponse: ListCallsResponse[] = await response.json();

//         const selectedData: SelectedListCallsResponse[] = fullResponse.map(item => ({
//             id: item.id,
//             transcript: item.transcript,
//             analysis: item.analysis,
//             startedAt: item.startedAt,
//             endedAt: item.endedAt,
//         }));

//         return selectedData;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }