// 'use client'

// import { useTransition } from 'react'
// import CustomButton from '@/components/CustomButton'
// import { uploadResume } from '@/lib/files/uploadFiles'

// const ResumeUploadForm = () => {
//     const [isPending, startTransition] = useTransition()

//     return (
//         <form action={uploadResume}>
//             <CustomButton
//                 label="Upload Resume"
//                 onClick={() => startTransition(() => { })}
//                 isLoading={isPending}
//                 disabled={isPending}
//             />
//         </form>
//     )
// }

// export default ResumeUploadForm

/* */


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
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </main>
    )
}

export default ResumeUploadForm


// 'use client'

// import { useTransition } from 'react'
// import CustomButton from '@/components/CustomButton'
// import { uploadResume } from '@/lib/files/uploadFiles'

// export function ResumeUploadForm() {
//     const [isPending, startTransition] = useTransition()

//     return (
//         <main>
//             <h1>React Server Component: Upload</h1>
//             <form action={uploadResume}>
//                 <input type="file" name="file" />
//                 {/* <CustomButton
//                     label="Upload Resume"
//                     onClick={() => startTransition(() => { })}
//                     isLoading={isPending}
//                     disabled={isPending}
//                 /> */}
//                 <input type="submit" value="Upload" />
//             </form>
//         </main>
//     )
// }

// export default ResumeUploadForm

// const ResumeUploadForm = () => {
//     const [isPending, startTransition] = useTransition()
//     const fileInputRef = useRef<HTMLInputElement>(null)

//     const handleClick = () => {
//         fileInputRef.current?.click()
//     }

//     const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0]
//         if (file) {
//             const formData = new FormData()
//             formData.append('resume', file)
//             await uploadResume(formData)
//         }
//     }

//     return (
//         <form>
//             <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//                 accept=".pdf,.doc,.docx"
//             />
//             <CustomButton
//                 label="Upload Resume"
//                 onClick={() => startTransition(() => handleClick())}
//                 isLoading={isPending}
//                 disabled={isPending}
//             />
//         </form>
//     )
// }

// export default ResumeUploadForm