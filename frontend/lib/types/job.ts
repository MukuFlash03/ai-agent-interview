export type JobsResponse = {
    id: string,
    title: string,
    posting: string,
};

export type SelectedJobsResponse = Pick<JobsResponse,
    'id' | 'title' | 'posting'
>;