export type FilesResponse = {
    id: string,
    orgId: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    url: string,
};

export type SelectedFilesResponse = Pick<FilesResponse,
    'id' | 'name'
>;