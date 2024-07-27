'use client'

import React, { useState, useEffect } from 'react';
import { fetchTranscripts } from '@/lib/database/manageTranscripts';
import { JobsResponse, SelectedJobsResponse } from '@/lib/types/job';
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


export function TableJobs() {
    const [jobsResponseData, setJobsResponseData] = useState<SelectedJobsResponse[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const data = [
        {
            id: 'abc',
            title: 'Job ABC',
            posting: '/dashboard/recruiter/job/abc',
        },
        {
            id: 'xyz',
            title: 'Job XYZ',
            posting: '/dashboard/recruiter/job/xyz',
        }
    ]

    useEffect(() => {
        const loadData = async () => {
            try {
                setJobsResponseData(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch jobs response data');
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error while fetching list calls response data: {error}</div>;
    if (!jobsResponseData) return <div>No list calls data available</div>;

    console.log(jobsResponseData);


    return (
        <Table>
            <TableCaption>A list of your recent calls.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Job Posting</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jobsResponseData
                    .map((jobData) => (
                        <TableRow key={jobData.id}>
                            <CallDataCell data={jobData} field="id" />
                            <CallDataCell data={jobData} field="title" />
                            {/* <CallDataCell data={jobData} field="posting" /> */}
                            <TableCell>
                                <Button asChild>
                                    <Link href={jobData.posting}>Go to {jobData.title}</Link>
                                </Button>
                            </TableCell>
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
