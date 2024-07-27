import { SelectedCandidatesResponse } from "@/lib/types/candidates";

import { TableCell } from "@/components/ui/table"

export const CallDataCell = ({ data, field }: { data: SelectedCandidatesResponse; field: keyof SelectedCandidatesResponse }) => {
    const value = data[field];

    // if (field === 'analysis' && value) {
    //     return <TableCell>{(value as { summary: string }).summary}</TableCell>;
    // }

    return (
        <TableCell>
            {value ? String(value) : "No data available"}
        </TableCell>
    );
};
