'use server'

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ListCallsResponse, SelectedListCallsResponse } from "@/lib/types/calls";

const VAPI_PRIVATE_API_KEY = process.env.NEXT_PUBLIC_VAPI_PRIVATE_API_KEY!;

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
        headers: { Authorization: `Bearer ${VAPI_PRIVATE_API_KEY}` }
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
            messages: item.messages,
        }));

        return selectedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function fetchLatestTranscripts(): Promise<SelectedListCallsResponse> {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${VAPI_PRIVATE_API_KEY}` }
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

        console.log("Logging selected data");

        console.log(selectedData);


        return selectedData[0];
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}