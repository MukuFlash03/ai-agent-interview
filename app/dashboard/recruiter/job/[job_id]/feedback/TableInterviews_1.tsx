'use client'

import React, { useState, useEffect } from 'react';
import { fetchTranscripts } from '@/lib/database/manageTranscripts';
import { ListCallsResponse, SelectedListCallsResponse } from '@/lib/types/calls';
import { FeedbackResponse, SelectedFeedbackResponse } from '@/lib/types/feedback';
import { CallDataCell } from '@/app/dashboard/student/[user_id]/practice/CallDataCell'

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

export function TableInterviews() {
    const [listCallsResponseData, setListCallsResponseData] = useState<SelectedListCallsResponse[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchTranscripts();
                setListCallsResponseData(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch list calls response data');
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error while fetching list calls response data: {error}</div>;
    if (!listCallsResponseData) return <div>No list calls data available</div>;

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
                {listCallsResponseData
                    .map((callData) => (
                        <TableRow key={callData.id}>
                            <CallDataCell data={callData} field="id" />
                            <CallDataCell data={callData} field="analysis" />
                            <CallDataCell data={callData} field="transcript" />
                            <CallDataCell data={callData} field="startedAt" />
                            <CallDataCell data={callData} field="endedAt" />
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
