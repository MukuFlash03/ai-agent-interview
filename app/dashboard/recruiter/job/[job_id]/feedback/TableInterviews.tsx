'use client'

import React, { useState, useEffect } from 'react';
import { fetchTranscripts } from '@/lib/database/manageTranscripts';
import { FeedbackResponse, SelectedFeedbackResponse } from '@/lib/types/feedback';
import { SelectedListCallsResponse } from '@/lib/types/calls';
// import { CallDataCell } from '@/app/dashboard/student/[user_id]/practice/CallDataCell'
import { CallDataCell } from '@/app/dashboard/recruiter/job/[job_id]/feedback/CallDataCell';

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

// async function fetchFeedbackData(candidate_data: {
//     interview_id: string,
//     user_id: string,
// }) {
async function fetchFeedbackData() {
    const response = await fetch('/api/read-recruiter-feedback-data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(candidate_data),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch feedback data');
    }

    return response.json();
}

export function TableInterviews() {
    const [feedbackResponseData, setFeedbackResponseData] = useState<SelectedFeedbackResponse[] | null>(null);
    // const [listCallsResponseData, setListCallsResponseData] = useState<SelectedListCallsResponse[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                // const data = await fetchTranscripts();
                // setListCallsResponseData(data);
                const data = await fetchFeedbackData();
                setFeedbackResponseData(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch list calls response data');
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error while fetching feedback response data: {error}</div>;
    // if (!listCallsResponseData) return <div>No call data available</div>;
    if (!feedbackResponseData) return <div>No feedback data available</div>;

    // console.log(listCallsResponseData);

    return (
        <Table>
            <TableCaption>List of recent interview calls and feedback.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Call ID</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead>Transcript</TableHead>
                    <TableHead>Started At</TableHead>
                    <TableHead>Ended At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {feedbackResponseData
                    .map((feedbackData) => (
                        <TableRow key={feedbackData.id}>
                            <CallDataCell data={feedbackData} field="id" />
                            <CallDataCell data={feedbackData} field="interview_id" />
                            <CallDataCell data={feedbackData} field="user_id" />
                            <CallDataCell data={feedbackData} field="analysis" />
                            <CallDataCell data={feedbackData} field="overall_score" />
                            <CallDataCell data={feedbackData} field="metrics" />
                            <CallDataCell data={feedbackData} field="transcript" />
                        </TableRow>
                    ))}
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter> */}
        </Table>
    )
}
