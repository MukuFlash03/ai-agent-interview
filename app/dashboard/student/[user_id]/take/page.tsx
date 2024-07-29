import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import CustomButton from '@/components/CustomSubmitButton';
import Link from 'next/link';
import { uploadResume } from '@/lib/files/uploadFiles';
import { TableCandidateInterviews } from './TableCandidateInterviews';
import { useParams } from 'next/navigation';

interface PageProps {
    params: {
        user_id: string;
    };
}

export default async function TakeInterview({ params }: PageProps) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data, error } = await supabase
        .from('interviews')
        .select()

    // console.log(data);
    // console.log("User ID from params:", userId);

    const userId = params.user_id;

    console.log("User ID from params:", userId);

    return (
        <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
            <div className="py-10">
                Welcome to AI Interviews !
            </div>
            <div>
                <TableCandidateInterviews user_id={userId} data={data || []} />
            </div>
        </main>
    )
}