'use client'

import React, { useState, useEffect } from 'react';
import { fetchTranscripts } from '@/lib/database/manageTranscripts';
import { SelectedInterviewsResponse } from '@/lib/types/interviews';
import { CallDataCell } from '../../../student/take/CallDataCell';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

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


export function TableCandidateInterviews() {
    const [interviewResponseData, setInterviewResponseData] = useState<SelectedInterviewsResponse[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const data = [
        {
            id: 'int-candidate-1',
            user_id: 'cand-123',
            status: 'pending',
        },
        {
            id: 'int-candidate-2',
            user_id: 'cand-456',
            status: 'pending',
        },
    ]

    useEffect(() => {
        const loadData = async () => {
            try {
                setInterviewResponseData(data);
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
    if (!interviewResponseData) return <div>No list calls data available</div>;

    console.log(interviewResponseData);


    return (
        <Table>
            <TableCaption>A list of your recent calls.</TableCaption>
            <TableHeader>
                <TableRow>
                    {/* <TableHead className="w-[100px]">Call ID</TableHead> */}
                    <TableHead>Job ID</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Job Posting</TableHead>
                    {/* <TableHead className="text-right">Amount</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {interviewResponseData
                    // .filter(isValidItem)
                    .map((jobData) => (
                        <TableRow key={jobData.id}>
                            {/* <TableCell className="font-medium">{callData.id}</TableCell> */}
                            <CallDataCell data={jobData} field="id" />
                            <CallDataCell data={jobData} field="user_id" />
                            <CallDataCell data={jobData} field="status" />
                            <TableCell>
                                <Button>
                                    {/* Write to interview db table */}
                                    Send Interview
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}
