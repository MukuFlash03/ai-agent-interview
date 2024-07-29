export type ListCallsResponse = {
    id: string,
    orgId?: string,
    createdAt?: string,
    updatedAt?: string,
    type?: string,
    messages?: object[],
    status?: string,
    endedReason?: string,
    startedAt?: string,
    endedAt?: string,
    transcript?: string,
    recordingUrl?: string,
    analysis?: {
        summary: string,
        structuredData: object,
        successEvaluation: string,
    },
};

export type SelectedListCallsResponse = Pick<ListCallsResponse,
    'id' | 'transcript' | 'analysis' | 'startedAt' | 'endedAt' | 'endedReason'
>;