export type InterviewsResponse = {
    interview_id: string,
    user_id: string,
    email: string,
    status: string,
};

export type SelectedInterviewsResponse = Pick<InterviewsResponse,
    'interview_id' | 'user_id' | 'email' | 'status'
>;