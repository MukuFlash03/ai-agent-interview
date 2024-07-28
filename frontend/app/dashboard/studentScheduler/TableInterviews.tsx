'use client'

import React, { useState, useEffect } from 'react';
import { fetchTranscripts } from '@/lib/database/manageTranscripts';
import { ListCallsResponse, SelectedListCallsResponse } from '@/lib/types/call';
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


function isValidItem(item: ListCallsResponse): item is SelectedListCallsResponse {
    return !!item.id && (!!item.transcript && !!item.analysis
        && !!item.startedAt && !!item.endedAt && !!item.endedReason);
}

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

    console.log(listCallsResponseData);


    // // Usage in TableInterviews.tsx
    // {
    //     ['analysis', 'transcript', 'startedAt', 'endedAt', 'endedReason'].map((field) => (
    //         <CallDataCell key={field} data={callData} field={field as keyof SelectedListCallsResponse} />
    //     ))
    // }

    return (
        <Table>
            <TableCaption>A list of your interviews.</TableCaption>
            <TableHeader>
                <TableRow>
                    {/* <TableHead className="w-[100px]">Call ID</TableHead> */}
                    <TableHead>Interview-ID</TableHead>
                    <TableHead>Start Interview</TableHead>
                    {/* <TableHead>Transcript</TableHead>
                    <TableHead>Started At</TableHead>
                    <TableHead>Ended At</TableHead> */}
                    {/* <TableHead className="text-right">Amount</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {listCallsResponseData
                    // .filter(isValidItem)
                    .map((callData) => (
                        <TableRow key={callData.id}>
                            {/* <TableCell className="font-medium">{callData.id}</TableCell> */}
                            <CallDataCell data={callData} field="id" />
                            {/* <CallDataCell data={callData} field="analysis" /> */}
                            <TableCell>
                                <Button asChild>
                                    <Link href="/interview">Practice Interviews</Link>
                                </Button>
                            </TableCell>
                            
                            {/* <CallDataCell data={callData} field="transcript" />
                            <CallDataCell data={callData} field="startedAt" />
                            <CallDataCell data={callData} field="endedAt" /> */}
                            {/* <TableCell>{callData.id}</TableCell>
                            {callData.analysis ? (
                                <TableCell>{callData.analysis.summary}</TableCell>
                            ) : (
                                <TableCell>{"No data available"}</TableCell>
                            )}
                            {callData.transcript ? (
                                <TableCell>{callData.transcript}</TableCell>
                            ) : (
                                <TableCell>{"No data available"}</TableCell>
                            )}
                            {callData.startedAt ? (
                                <TableCell>{callData.startedAt}</TableCell>
                            ) : (
                                <TableCell>{"No data available"}</TableCell>
                            )}
                            {callData.endedAt ? (
                                <TableCell>{callData.endedAt}</TableCell>
                            ) : (
                                <TableCell>{"No data available"}</TableCell>
                            )} */}
                            {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
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
