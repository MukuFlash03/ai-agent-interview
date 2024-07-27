'use server'

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ListCallsResponse, SelectedListCallsResponse } from "@/lib/types/call";

export async function insertTranscript() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    console.log(user);
}

export async function fetchTranscripts(): Promise<SelectedListCallsResponse[]> {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const options = {
        method: 'GET',
        headers: { Authorization: 'Bearer c39f30da-4531-4745-8a5c-15c4f58b5258' }
    };

    try {
        const response = await fetch('https://api.vapi.ai/call', options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fullResponse: ListCallsResponse[] = await response.json();

        const selectedData: SelectedListCallsResponse[] = fullResponse.map(item => ({
            id: item.id,
            transcript: item.transcript,
            analysis: item.analysis,
            startedAt: item.startedAt,
            endedAt: item.endedAt,
        }));

        return selectedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}