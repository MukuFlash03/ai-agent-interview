'use client'

import { useState } from 'react'

export default function ResumeReader() {
    const [resumeContent, setResumeContent] = useState('')

    const handleReadResume = async () => {
        try {
            const response = await fetch('/api/read-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filePath: '/Users/mukuflash/Documents/Projects/JS/ai-agent-interview/frontend/lib/data/Resume_Mukul_C_Mahadik_3_0.pdf' }),
            })

            if (!response.ok) {
                throw new Error('Failed to read resume')
            }

            const data = await response.json()
            setResumeContent(data.content)
        } catch (error) {
            console.error('Error reading resume:', error)
        }
    }

    return (
        <div>
            <button onClick={handleReadResume}>Read Resume</button>
            {resumeContent && (
                <div>
                    <h2>Resume Content:</h2>
                    <p>{resumeContent}</p>
                </div>
            )}
        </div>
    )
}