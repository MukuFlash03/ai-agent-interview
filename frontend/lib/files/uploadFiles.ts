'use server'

// export async function uploadResume(formData: FormData) {
//     // Handle the resume upload logic here
//     console.log("Uploading Resume...");
// }


import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function uploadResume(data: FormData) {
    const file: File | null = data.get('file') as unknown as File
    if (!file) {
        throw new Error('No file uploaded')
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const rootDir = process.cwd();
    const path = join(rootDir, 'lib', 'data', file.name);

    // const path = join('/', 'tmp', file.name)
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)

    return { success: true }
}

// 'use server'

// import fs from 'fs/promises'
// import path from 'path'

// export async function uploadResume(formData: FormData) {
//     const file = formData.get('file') as File
//     if (!file) {
//         throw new Error('No file uploaded')
//     }

//     const bytes = await file.arrayBuffer()
//     const buffer = Buffer.from(bytes)

//     const filePath = path.join(process.cwd(), 'lib', 'data', file.name)
//     await fs.writeFile(filePath, buffer)

//     return { success: true, message: 'File uploaded successfully' }
// }

/* */

// 'use server'

// import { writeFile } from 'fs/promises'
// import path from 'path'

// export async function uploadResume(formData: FormData) {
//     const file = formData.get('resume') as File
//     if (!file) {
//         throw new Error('No file uploaded')
//     }

//     const bytes = await file.arrayBuffer()
//     const buffer = Buffer.from(bytes)

//     // Specify the path where you want to store the file
//     const uploadDir = path.join(process.cwd(), 'frontend', 'lib', 'data')
//     const filePath = path.join(uploadDir, file.name)

//     try {
//         await writeFile(filePath, buffer)
//         console.log(`File saved to ${filePath}`)
//         return { success: true, path: filePath }
//     } catch (error) {
//         console.error('Error saving file:', error)
//         return { success: false, error: 'Failed to save file' }
//     }
// }