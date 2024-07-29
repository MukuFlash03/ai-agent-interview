'use client'

import React, { useState, useEffect } from 'react';
import { fetchTranscripts } from '@/lib/database/manageTranscripts';
import { SelectedInterviewsResponse } from '@/lib/types/interviews';
import { CallDataCell } from './CallDataCell';
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

interface TableCandidateInterviewsProps {
    data: SelectedInterviewsResponse[];
    user_id: string;
}

export function TableCandidateInterviews({ data, user_id }: TableCandidateInterviewsProps) {
    const [interviewResponseData, setInterviewResponseData] = useState<SelectedInterviewsResponse[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    console.log("Interview Data from page.tsx");

    // console.log(data);


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

    // console.log(interviewResponseData);


    return (
        <Table>
            <TableCaption>A list of your recent calls.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Interview ID</TableHead>
                    <TableHead>UserID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {interviewResponseData
                    .filter((interviewData) => interviewData.user_id === user_id)
                    .map((interviewData) => (
                        <TableRow key={interviewData.interview_id}>
                            <CallDataCell data={interviewData} field="interview_id" />
                            <CallDataCell data={interviewData} field="user_id" />
                            <CallDataCell data={interviewData} field="email" />
                            <CallDataCell data={interviewData} field="status" />
                            <TableCell>
                                <Button asChild>
                                    <Link href={`/dashboard/student/${interviewData.user_id}/take/interview/${interviewData.interview_id}`}>Take Interview</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}
