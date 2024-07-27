export type InterviewsResponse = {
    id: string,
    user_id: string,
    email: string,
    status: string,
};

export type SelectedInterviewsResponse = Pick<InterviewsResponse,
    'id' | 'user_id' | 'email' | 'status'
>;