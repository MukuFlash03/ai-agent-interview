
'use client'

import { useTransition } from 'react'
import { uploadResume } from '@/lib/files/uploadFiles'
import CustomSubmitButton from '@/components/CustomSubmitButton'
import React from 'react'

export function ResumeUploadForm() {
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        startTransition(async () => {
            try {
                await uploadResume(formData)
                // Handle successful upload (e.g., show a success message)
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
                {/* <button type="submit" disabled={isPending}>
                    {isPending ? 'Uploading...' : 'Upload'}
                </button> */}
            </form>
        </main>
    )
}

export default ResumeUploadForm
