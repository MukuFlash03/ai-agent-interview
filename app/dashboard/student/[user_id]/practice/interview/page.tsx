'use client'

import { redirect, useRouter } from "next/navigation";
import Button from '@/components/call/Button'
import ActiveCallDetail from '@/components/call/ActiveCallDetail'
import Vapi from "@vapi-ai/web";
import { useState, useEffect } from 'react';
import { isPublicKeyMissingError } from "@/lib/utils";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

const VAPI_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY!;
const vapi = new Vapi(VAPI_PUBLIC_API_KEY);

const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
console.log(VAPI_ASSISTANT_ID);


const App = () => {
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);

    const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(0);

    const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } = usePublicKeyInvalid();

    const [supabase] = useState(() => createBrowserSupabaseClient())

    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push("/login")
            }
        }
        checkUser()

        vapi.on("call-start", () => {
            setConnecting(false);
            setConnected(true);

            setShowPublicKeyInvalidMessage(false);
        });

        vapi.on("call-end", () => {
            setConnecting(false);
            setConnected(false);

            setShowPublicKeyInvalidMessage(false);
        });

        vapi.on("speech-start", () => {
            setAssistantIsSpeaking(true);
        });

        vapi.on("speech-end", () => {
            setAssistantIsSpeaking(false);
        });

        vapi.on("volume-level", (level) => {
            setVolumeLevel(level);
        });

        vapi.on("error", (error) => {
            console.error(error);

            setConnecting(false);
            if (isPublicKeyMissingError({ vapiError: error })) {
                setShowPublicKeyInvalidMessage(true);
            }
        });

        // we only want this to fire on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startCallInline = () => {
        setConnecting(true);
        vapi.start(VAPI_ASSISTANT_ID);
    };
    const endCall = () => {
        vapi.stop();
    };

    return (
        <main className="flex min-h-screen flex-col justify-center items-center space-y-8 p-24">
            <div className="py-10">
                Welcome to AI Interviews !
            </div>
            <div
                style={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {!connected ? (
                    <Button
                        label="Start Interview"
                        onClick={startCallInline}
                        isLoading={connecting}
                        disabled={false}
                    />
                ) : (
                    <ActiveCallDetail
                        assistantIsSpeaking={assistantIsSpeaking}
                        volumeLevel={volumeLevel}
                        onEndCallClick={endCall}
                    />
                )}

                {showPublicKeyInvalidMessage ? <PleaseSetYourPublicKeyMessage /> : null}
                <ReturnToDocsLink />
            </div>
        </main>
    );
};

const usePublicKeyInvalid = () => {
    const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] = useState(false);

    useEffect(() => {
        if (showPublicKeyInvalidMessage) {
            setTimeout(() => {
                setShowPublicKeyInvalidMessage(false);
            }, 3000);
        }
    }, [showPublicKeyInvalidMessage]);

    return {
        showPublicKeyInvalidMessage,
        setShowPublicKeyInvalidMessage,
    };
};

const PleaseSetYourPublicKeyMessage = () => {
    return (
        <div
            style={{
                position: "fixed",
                bottom: "25px",
                left: "25px",
                padding: "10px",
                color: "#fff",
                backgroundColor: "#f03e3e",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
        >
            Is your Vapi Public Key missing? (recheck your code)
        </div>
    );
};

const ReturnToDocsLink = () => {
    return (
        <a
            href="https://docs.vapi.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: "fixed",
                top: "25px",
                right: "25px",
                padding: "5px 10px",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
        >
            return to docs
        </a>
    );
};

export default App;