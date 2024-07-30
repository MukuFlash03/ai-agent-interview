'use client'

import { useTransition } from 'react'
import { uploadResume } from '@/lib/files/uploadFiles'
import CustomSubmitButton from '@/components/CustomSubmitButton'
import React from 'react'
import { fileExists } from '@/lib/utils'
import { fetchResumeContent, fetchQuestions, getFilesListKnowledgeBase, sendQuestionsToVapiAssistant } from '@/lib/api_calls'

export function ResumeUploadForm({ user_name }: { user_name: string }) {
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        startTransition(async () => {
            try {
                const { filePath } = await uploadResume(formData)
                const result_fetchResumeContent = await fetchResumeContent(filePath)
                const result_resumeQuestions = await fetchQuestions(result_fetchResumeContent.text)
                const result_getFilesList = await getFilesListKnowledgeBase()
                const existsFile: boolean = fileExists(`Questions_${user_name}`, result_getFilesList.fileNames)
                const result_sendQuestionsToVapiAssistant = await sendQuestionsToVapiAssistant({ existsFile: existsFile, resumeQuestions: result_resumeQuestions.resumeQuestions })


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
