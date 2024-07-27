export type InterviewsResponse = {
    id: string,
    user_id: string,
    status: string,
};

export type SelectedInterviewsResponse = Pick<InterviewsResponse,
    'id' | 'user_id' | 'status'
>;