"use client";
import React, { useEffect, useState } from "react";
// import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button"
import Link from "next/link";

const LoginButton = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const supabase = createClient();
    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);
    if (user) {
        return (
            <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
        );
    }
};

export default LoginButton;
