export type InterviewsResponse = {
    interview_id: string,
    user_id: string,
    summary: string,
    transcript: string,
};

export type SelectedInterviewsResponse = Pick<InterviewsResponse,
    'interview_id' | 'user_id' | 'summary' | 'transcript'
>;