'use client'

import React, { useState, useEffect } from 'react';
import { fetchTranscripts } from '@/lib/database/manageTranscripts';
import { SelectedInterviewsResponse } from '@/lib/types/interviews';
import { CallDataCell } from '../../recruiter/job/[slug]/CallDataCell';
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
                    <TableHead>Interview ID</TableHead>
                    <TableHead>UserID</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead className="text-right">Amount</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {interviewResponseData
                    // .filter(isValidItem)
                    .map((interviewData) => (
                        <TableRow key={interviewData.id}>
                            {/* <TableCell className="font-medium">{callData.id}</TableCell> */}
                            <CallDataCell data={interviewData} field="id" />
                            <CallDataCell data={interviewData} field="user_id" />
                            <CallDataCell data={interviewData} field="status" />
                            <TableCell>
                                <Button asChild>
                                    <Link href={`/dashboard/student/take/interview/${interviewData.id}`}>Take Interview</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}
