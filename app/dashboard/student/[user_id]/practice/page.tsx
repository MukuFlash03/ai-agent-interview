import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import CustomButton from '@/components/CustomSubmitButton';
import Link from 'next/link';
import { TableInterviews } from './TableInterviews';
import { uploadResume } from '@/lib/files/uploadFiles';
import ResumeUploadForm from './ResumeUploadForm';
import ResumeReader from './ResumeReader';

export default async function Dashboard() {
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
            <div className="z-10 w-full max-w-5xl items-center justify-center space-x-24 font-mono text-sm lg:flex">
                <Button asChild>
                    <Link href={`/dashboard/student/${user.id}/practice/interview/`}>Practice Interviews</Link>
                </Button>
                <ResumeUploadForm />
                {/* <Button variant="secondary">Upload Resume</Button> */}
            </div>
            <div>
                <TableInterviews />
            </div>
        </main>
    )
}