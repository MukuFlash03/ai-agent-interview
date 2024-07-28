export type CandidatesResponse = {
    interview_id: string,
    user_id: string,
    email: string,
    status: string,
};

export type SelectedCandidatesResponse = Pick<CandidatesResponse,
    'interview_id' | 'user_id' | 'email' | 'status'
>;