'use client'

import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import Button from '@/components/call/Button'
import ActiveCallDetail from '@/components/call/ActiveCallDetail'
import Vapi from "@vapi-ai/web";
import { useState, useEffect } from 'react';
import { isPublicKeyMissingError } from "@/lib/utils";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { fetchLatestTranscripts, insertTranscript } from '@/lib/database/manageTranscripts'

const VAPI_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY!;
const vapi = new Vapi(VAPI_PUBLIC_API_KEY);

const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

async function updateInterviewData(candidate_data: { user_id: string; interview_id: string }) {
    const response = await fetch('/api/update-interview-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidate_data),
    });
    if (!response.ok) {
        console.log(response);

        throw new Error('Failed to update interview data');
    }
    return response.json();
}

async function updateFeedbackData(candidate_data: { interview_id: string, user_id: string; summary: string, transcript: string }) {
    const response = await fetch('/api/insert-feedback-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidate_data),
    });

    if (!response.ok) {
        throw new Error('Failed to insert feedback data');
    }

    return response.json();
}


const App = () => {
    const params = useParams();

    const getParamAsString = (param: string | string[] | undefined): string => {
        if (Array.isArray(param)) {
            return param[0] || '';
        }
        return param || '';
    };

    const userId = getParamAsString(params.user_id);
    const interviewId = getParamAsString(params.interview_id);

    const handleUpdateInterview = async () => {
        try {
            const result = await updateInterviewData({
                user_id: userId,
                interview_id: interviewId
            });
            console.log('Interview data updated successfully', result);
        } catch (error) {
            console.error("Error sending interview:", error);
        }
    };

    const handleUpdateFeedback = async () => {
        try {
            const data = await fetchLatestTranscripts();
            console.log('Transcripts fetched successfully', data);
            console.log(data);

            const result = await updateFeedbackData({
                interview_id: interviewId,
                user_id: userId,
                summary: data.analysis?.summary || '',
                transcript: data.transcript || '',
            });
            console.log('Interview data updated successfully', result);
        } catch (error) {
            console.error("Error sending interview:", error);
        }
    };

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
            insertTranscript()
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

    // call start handler
    const startCallInline = () => {
        setConnecting(true);
        vapi.start(VAPI_ASSISTANT_ID);
    };
    const endCall = () => {
        vapi.stop();
        console.log("User ID: " + params.user_id);
        console.log("Interview ID: " + params.interview_id);
        handleUpdateInterview();
        handleUpdateFeedback();
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
                    <>
                        <Button
                            label="Start Interview"
                            onClick={startCallInline}
                            isLoading={connecting}
                            disabled={false}
                        />
                        {/* <Button
                            label="Go Back"
                            onClick={() => router.push(`/dashboard/student`)}
                            isLoading={connecting}
                            disabled={false}
                        /> */}
                    </>
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

    // close public key invalid message after delay
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
