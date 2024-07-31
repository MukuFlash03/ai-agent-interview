import { SelectedFilesResponse } from "./types/files";

export async function fetchResumeContent(filePath: string) {
    const response = await fetch('/api/fetch-resume-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath: filePath }),
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to extract text from resume PDF');
    }
    return response.json();
}

export async function fetchQuestions(resumeContent: string) {
    const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeContent: resumeContent }),
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to generate questions from resume PDF');
    }
    return response.json();
}

export async function getFilesListKnowledgeBase() {
    const response = await fetch('/api/get-files-list-kb', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to fetch files list from knowledge base.');
    }
    return response.json();
}

export async function createQuestionsFile(newFilename: string, resumeQuestions: string) {
    const response = await fetch('/api/create-questions-file', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: newFilename, content: resumeQuestions }),
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to create new questions file to add to the Vapi voice assistant.');
    }
    return response.json();
}

export async function updateQuestionsFile(existingFiles: SelectedFilesResponse, resumeQuestions: string) {
    const response = await fetch('/api/update-questions-file', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to update questions to the Vapi voice assistant.');
    }
    return response.json();
}

export async function sendQuestionsToVapiAssistant({
    existsFile,
    existingFiles,
    newFilename,
    resumeQuestions,
}: {
    existsFile: boolean,
    existingFiles: SelectedFilesResponse,
    newFilename: string,
    resumeQuestions: string,
}) {
    if (!existsFile) {
        await createQuestionsFile(newFilename, resumeQuestions);
    } else {
        await updateQuestionsFile(existingFiles, resumeQuestions);
    }
}
