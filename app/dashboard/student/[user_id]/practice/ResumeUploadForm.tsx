'use client'

import { useTransition } from 'react'
import { uploadResume } from '@/lib/files/uploadFiles'
import CustomSubmitButton from '@/components/CustomSubmitButton'
import React from 'react'

async function fetchResumeText(filePath: string) {
    // async function uploadResume(formData: FormData) {
    const response = await fetch('/api/upload-resume', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ formData: formData }),
        body: JSON.stringify({ filePath: filePath }),
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to extract text from resume PDF');
    }
    return response.json();
}

export function ResumeUploadForm() {
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        startTransition(async () => {
            try {
                // const result = await uploadResume(formData)
                const { filePath } = await uploadResume(formData)
                const result = await fetchResumeText(filePath)
                console.log(result);

            } catch (error) {
                // Handle error (e.g., show an error message)
                console.error('Upload failed:', error)
            }
        })
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" />
                <CustomSubmitButton
                    label={isPending ? 'Uploading...' : 'Upload Resume'}
                    onClick={() => startTransition(() => { })}
                    isLoading={isPending}
                    disabled={isPending}
                />
            </form>
        </main>
    )
}

export default ResumeUploadForm
