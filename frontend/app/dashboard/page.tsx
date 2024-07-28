import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { TableInterviews } from './TableInterviews';
import ResumeUploadForm from './ResumeUploadForm';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout, UserPlus, PlayCircle } from "lucide-react";

export default async function Dashboard() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to AI Interviews!</h1>
                    
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <DashboardCard 
                        title="Interviewee Portal" 
                        description="Schedule and manage your interviews"
                        link="/dashboard/studentScheduler"
                        linkText="Enter Portal"
                        icon={<UserPlus className="w-6 h-6" />}
                    />
                    <DashboardCard 
                        title="Recruiter Portal" 
                        description="Manage candidates and interview schedules"
                        link="/dashboard/recruiterScheduler"
                        linkText="Enter Portal"
                        icon={<Layout className="w-6 h-6" />}
                    />
                    <DashboardCard 
                        title="Practice Interviews" 
                        description="AI-powered mock interviews"
                        link="/interview"
                        linkText="Start Practice"
                        icon={<PlayCircle className="w-6 h-6" />}
                    />
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Upload Your Resume</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResumeUploadForm />
                    </CardContent>
                </Card>
            </div>

            <div style={{ height: '80px' }}></div>


            <div className="w-full max-w-full mt-8">
                <h2 className="text-2xl font-semibold mb-4">Your Interviews</h2>
                <TableInterviews />
            </div>
        </main>
    );
}

function DashboardCard({ title, description, link, linkText, icon }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    {icon}
                    <span className="ml-2">{title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 mb-4">{description}</p>
                <Button asChild className="w-full">
                    <Link href={link}>{linkText}</Link>
                </Button>
            </CardContent>
        </Card>
    );
}