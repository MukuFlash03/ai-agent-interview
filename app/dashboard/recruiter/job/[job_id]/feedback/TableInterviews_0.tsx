'use client'

import React, { useState, useEffect } from 'react';
import { fetchTranscripts } from '@/lib/database/manageTranscripts';
import { FeedbackResponse, SelectedFeedbackResponse } from '@/lib/types/feedback';
import { CallDataCell } from './CallDataCell';

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

async function fetchFeedbackData(): Promise<SelectedFeedbackResponse[]> {
    const response = await fetch('/api/insert-interview-data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch feedback data');
    }

    return response.json();
}


export function TableInterviews() {
    const [feedbackResponseData, setFeedbackResponseData] = useState<SelectedFeedbackResponse[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handlefetchFeedback = async (): Promise<SelectedFeedbackResponse[]> => {
        try {
            const result = await fetchFeedbackData();
            console.log('Feedback data fetched successfully', result);
            return result;
        } catch (error) {
            console.error("Error fetching feedback data:", error);
            throw error;
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await handlefetchFeedback();
                setFeedbackResponseData(data);
            } catch (err) {
                setError('Failed to fetch feedback response data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error while fetching list calls response data: {error}</div>;
    if (!feedbackResponseData) return <div>No list calls data available</div>;

    // console.log(listCallsResponseData);

    return (
        <Table>
            <TableCaption>A list of your recent calls.</TableCaption>
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
                    .map((callData) => (
                        <TableRow key={callData.user_id}>
                            <CallDataCell data={callData} field="interview_id" />
                            <CallDataCell data={callData} field="user_id" />
                            <CallDataCell data={callData} field="analysis" />
                            <CallDataCell data={callData} field="transcript" />
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
