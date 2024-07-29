export type FeedbackResponse = {
    interview_id: string,
    user_id: string,
    analysis?: {
        summary: string,
        structuredData: object,
        successEvaluation: string,
    },
    transcript: string,
};

export type SelectedFeedbackResponse = Pick<FeedbackResponse,
    'interview_id' | 'user_id' | 'analysis' | 'transcript'
>;