'use client'

// import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button"
import Button from '@/app/interview/Button';
import Vapi from "@vapi-ai/web";
import { useState, useEffect } from 'react';
import { isPublicKeyMissingError } from "@/lib/utils";
import ActiveCallDetail from '@/app/interview/components/call/ActiveCallDetail'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'


const VAPI_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY;
const vapi = new Vapi(VAPI_PUBLIC_API_KEY);
console.log(VAPI_PUBLIC_API_KEY);


const App = () => {
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);

    const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(0);

    const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } = usePublicKeyInvalid();

    const [supabase] = useState(() => createBrowserSupabaseClient())

    // hook into Vapi events
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                redirect("/login")
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

    // const supabase = createClient();
    // const {
    //     data: { user },
    // } = await supabase.auth.getUser();

    // if (!user) {
    //     return redirect("/login");
    // }

    // call start handler
    const startCallInline = () => {
        setConnecting(true);
        vapi.start(assistantOptions);
    };
    const endCall = () => {
        vapi.stop();
    };

    return (
        <main className="flex min-h-screen flex-col items-center space-y-8 p-24">
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

const assistantOptions = {
    name: "Vapi’s Pizza Front Desk",
    firstMessage: "Vappy’s Pizzeria speaking, how can I help you?",
    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
    },
    voice: {
        provider: "playht",
        voiceId: "jennifer",
    },
    model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: `You are a voice assistant for Vappy’s Pizzeria, a pizza shop located on the Internet.

Your job is to take the order of customers calling in. The menu has only 3 types
of items: pizza, sides, and drinks. There are no other types of items on the menu.

1) There are 3 kinds of pizza: cheese pizza, pepperoni pizza, and vegetarian pizza
(often called "veggie" pizza).
2) There are 3 kinds of sides: french fries, garlic bread, and chicken wings.
3) There are 2 kinds of drinks: soda, and water. (if a customer asks for a
brand name like "coca cola", just let them know that we only offer "soda")

Customers can only order 1 of each item. If a customer tries to order more
than 1 item within each category, politely inform them that only 1 item per
category may be ordered.

Customers must order 1 item from at least 1 category to have a complete order.
They can order just a pizza, or just a side, or just a drink.

Be sure to introduce the menu items, don't assume that the caller knows what
is on the menu (most appropriate at the start of the conversation).

If the customer goes off-topic or off-track and talks about anything but the
process of ordering, politely steer the conversation back to collecting their order.

Once you have all the information you need pertaining to their order, you can
end the conversation. You can say something like "Awesome, we'll have that ready
for you in 10-20 minutes." to naturally let the customer know the order has been
fully communicated.

It is important that you collect the order in an efficient manner (succinct replies
& direct questions). You only have 1 task here, and it is to collect the customers
order, then end the conversation.

- Be sure to be kind of funny and witty!
- Keep all your responses short and simple. Use casual language, phrases like "Umm...", "Well...", and "I mean" are preferred.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
            },
        ],
    },
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