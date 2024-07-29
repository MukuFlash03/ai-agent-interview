'use client'

import React, { useState, useEffect } from 'react';
import { fetchTranscripts } from '@/lib/database/manageTranscripts';
import { SelectedCandidatesResponse } from '@/lib/types/candidates';
import { CallDataCell } from './CallDataCell';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

async function insertInterviewData(candidate_data: { user_id: string; email: string }) {
    const response = await fetch('/api/insert-interview-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidate_data),
    });

    if (!response.ok) {
        throw new Error('Failed to insert interview data');
    }

    return response.json();
}


export function TableCandidateInterviews({ data }: { data: SelectedCandidatesResponse[] }) {
    const [candidatesResponseData, setCandidatesResponseData] = useState<SelectedCandidatesResponse[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setCandidatesResponseData(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch interviews response data');
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error while fetching list calls response data: {error}</div>;
    if (!candidatesResponseData) return <div>No list calls data available</div>;

    // console.log(candidatesResponseData);


    const handleSendInterview = async (candidateData: { user_id: string; email: string }) => {
        // const handleSendInterview = async () => {
        try {
            // const candidateData = {
            //     user_id: candidatesResponseData[0]['user_id'],
            //     email: candidatesResponseData[0]['email']
            // };
            const result = await insertInterviewData(candidateData);
            console.log('Interview data inserted successfully', result);
        } catch (error) {
            console.error("Error sending interview:", error);
        }
    };

    return (
        <Table>
            <TableCaption>A list of your recent calls.</TableCaption>
            <TableHeader>
                <TableRow>
                    {/* <TableHead className="w-[100px]">Call ID</TableHead> */}
                    <TableHead>UserID</TableHead>
                    <TableHead>Email</TableHead>
                    {/* <TableHead>Interview ID</TableHead> */}
                    <TableHead>Status</TableHead>
                    {/* <TableHead className="text-right">Amount</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {candidatesResponseData
                    // .filter(isValidItem)
                    .map((candidateData) => (
                        <TableRow key={candidateData.interview_id}>
                            <CallDataCell data={candidateData} field="user_id" />
                            <CallDataCell data={candidateData} field="email" />
                            {/* <CallDataCell data={candidateData} field="interview_id" /> */}
                            <CallDataCell data={candidateData} field="status" />
                            <TableCell>
                                <Button onClick={() => {
                                    handleSendInterview({
                                        user_id: candidateData.user_id,
                                        email: candidateData.email
                                    });
                                }}>
                                    Send Interview
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}
