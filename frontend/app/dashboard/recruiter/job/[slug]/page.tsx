import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import CustomButton from '@/components/CustomSubmitButton';
import Link from 'next/link';
import { uploadResume } from '@/lib/files/uploadFiles';
import { TableCandidateInterviews } from './TableCandidateInterviews';

export default async function StudentDashboard() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data, error } = await supabase
        .from('candidates')
        .select()

    console.log(data);

    // const data = [
    //     {
    //         user_id: 'e94f250a-7036-4d84-a060-7ff37eb1691c',
    //         email: 'mukulm2010@gmail.com',
    //         interview_id: 'int-candidate-1',
    //         status: 'pending',
    //     },
    //     {
    //         user_id: '107bd945-545e-4182-9250-9dc33a75d7df',
    //         email: 'kareemamin8888@gmail.com',
    //         interview_id: 'int-candidate-2',
    //         status: 'pending',
    //     },
    // ]

    return (
        <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
            <div className="py-10">
                Welcome to AI Interviews !
            </div>
            <div>
                <TableCandidateInterviews data={data || []} />
            </div>
        </main>
    )
}