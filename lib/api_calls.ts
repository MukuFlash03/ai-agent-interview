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

export async function createQuestionsFile(resumeQuestions: string) {
    const response = await fetch('/api/create-questions-file', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to send questions to the Vapi voice assistant.');
    }
    return response.json();
}

export async function updateQuestionsFile(resumeQuestions: string) {
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

export async function sendQuestionsToVapiAssistant({ existsFile, resumeQuestions }: { existsFile: boolean, resumeQuestions: string }) {
    if (!existsFile) {
        await createQuestionsFile(resumeQuestions);
    } else {
        await updateQuestionsFile(resumeQuestions);
    }
}
