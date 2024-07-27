import { SelectedJobsResponse } from "@/lib/types/job";

import { TableCell } from "@/components/ui/table"

export const CallDataCell = ({ data, field }: { data: SelectedJobsResponse; field: keyof SelectedJobsResponse }) => {
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
