import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import CustomButton from '@/components/CustomSubmitButton';
import Link from 'next/link';
import { uploadResume } from '@/lib/files/uploadFiles';
import { TableCandidateInterviews } from '../../../student/take/TableCandidateInterviews';

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
                <TableCandidateInterviews />
            </div>
        </main>
    )
}