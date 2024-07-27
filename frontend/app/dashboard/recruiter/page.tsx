import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import CustomButton from '@/components/CustomSubmitButton';
import Link from 'next/link';
import { TableInterviews } from '@/app/dashboard/student/practice/TableInterviews';
import { TableJobs } from './TableJobs';
import { uploadResume } from '@/lib/files/uploadFiles';

export default async function StudentDashboard() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
            <div className="py-10">
                Welcome to AI Interviews !
            </div>
            <div>
                <TableJobs />
            </div>
        </main>
    )
}