import { SelectedInterviewsResponse } from "@/lib/types/interviews";

import { TableCell } from "@/components/ui/table"

export const CallDataCell = ({ data, field }: { data: SelectedInterviewsResponse; field: keyof SelectedInterviewsResponse }) => {
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
