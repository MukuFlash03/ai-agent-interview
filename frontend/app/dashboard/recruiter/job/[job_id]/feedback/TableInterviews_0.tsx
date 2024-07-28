'use client'

import React, { useState, useEffect } from 'react';
import { fetchTranscripts } from '@/lib/database/manageTranscripts';
import { ListCallsResponse, SelectedListCallsResponse } from '@/lib/types/calls';
import { CandidatesResponse, SelectedCandidatesResponse } from '@/lib/types/candidates';
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


// async function fetchFeedbackData(candidate_data: { user_id: string; email: string }) {
// async function fetchFeedbackData() {
//     const response = await fetch('/api/insert-interview-data', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         // body: JSON.stringify(candidate_data),
//     });

//     if (!response.ok) {
//         throw new Error('Failed to fetch feedback data');
//     }

//     return response.json();
// }


async function fetchFeedbackData(): Promise<SelectedCandidatesResponse[]> {
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
    const [candidatesResponseData, setCandidatesResponseData] = useState<SelectedCandidatesResponse[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // const handlefetchFeedback = async () => {
    //     // const handleSendInterview = async () => {
    //     try {
    //         // const candidateData = {
    //         //     user_id: candidatesResponseData[0]['user_id'],
    //         //     email: candidatesResponseData[0]['email']
    //         // };
    //         // const result = await fetchFeedbackData(candidateData);
    //         const result = await fetchFeedbackData();
    //         console.log('Feedback data fetched successfully', result);
    //     } catch (error) {
    //         console.error("Error fetching feedback data:", error);
    //     }
    // };

    const handlefetchFeedback = async (): Promise<SelectedCandidatesResponse[]> => {
        try {
            const result = await fetchFeedbackData();
            console.log('Feedback data fetched successfully', result);
            return result; // Return the fetched data
        } catch (error) {
            console.error("Error fetching feedback data:", error);
            throw error; // Re-throw the error to be caught in loadData
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await handlefetchFeedback();
                setCandidatesResponseData(data);
            } catch (err) {
                setError('Failed to fetch feedback response data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);


    // useEffect(() => {
    //     const loadData = async () => {
    //         try {
    //             const data = await handlefetchFeedback();
    //             setCandidatesResponseData(data);
    //             setLoading(false);
    //         } catch (err) {
    //             setError('Failed to fetch list calls response data');
    //             setLoading(false);
    //         }
    //     };

    //     loadData();
    // }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error while fetching list calls response data: {error}</div>;
    if (!candidatesResponseData) return <div>No list calls data available</div>;

    // console.log(listCallsResponseData);


    // // Usage in TableInterviews.tsx
    // {
    //     ['analysis', 'transcript', 'startedAt', 'endedAt', 'endedReason'].map((field) => (
    //         <CallDataCell key={field} data={callData} field={field as keyof SelectedListCallsResponse} />
    //     ))
    // }

    return (
        <Table>
            <TableCaption>A list of your recent calls.</TableCaption>
            <TableHeader>
                <TableRow>
                    {/* <TableHead className="w-[100px]">Call ID</TableHead> */}
                    <TableHead>Call ID</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead>Transcript</TableHead>
                    <TableHead>Started At</TableHead>
                    <TableHead>Ended At</TableHead>
                    {/* <TableHead className="text-right">Amount</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {candidatesResponseData
                    // .filter(isValidItem)
                    .map((callData) => (
                        <TableRow key={callData.user_id}>
                            {/* <TableCell className="font-medium">{callData.id}</TableCell> */}
                            <CallDataCell data={callData} field="interview_id" />
                            <CallDataCell data={callData} field="user_id" />
                            <CallDataCell data={callData} field="summary" />
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
