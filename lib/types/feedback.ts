export type FeedbackResponse = {
    id: string,
    interview_id: string,
    user_id: string,
    analysis?: {
        summary: string,
        structuredData: object,
        successEvaluation: string,
    },
    overall_score: string,
    metrics: string,
    transcript: string,
    // metrics?: {
    //     technical_skills: object,
    //     communication: object,
    //     problem_solving: object,
    //     cultural_fit: object,
    //     experience_alignment: object,
    //     adaptability: object,
    //     leadership_potential: object,
    // }
};

export type SelectedFeedbackResponse = Pick<FeedbackResponse,
    'id' | 'interview_id' | 'user_id' | 'analysis' | 'overall_score' | 'metrics' | 'transcript'
>;