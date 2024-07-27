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

import { useRef, useTransition } from 'react'
import CustomButton from '@/components/CustomButton'
import { uploadResume } from '@/lib/files/uploadFiles'

const ResumeUploadForm = () => {
    const [isPending, startTransition] = useTransition()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append('resume', file)
            await uploadResume(formData)
        }
    }

    return (
        <form>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx"
            />
            <CustomButton
                label="Upload Resume"
                onClick={() => startTransition(() => handleClick())}
                isLoading={isPending}
                disabled={isPending}
            />
        </form>
    )
}

export default ResumeUploadForm