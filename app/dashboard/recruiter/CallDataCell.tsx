import { SelectedJobsResponse } from "@/lib/types/jobs";

import { TableCell } from "@/components/ui/table"

export const CallDataCell = ({ data, field }: { data: SelectedJobsResponse; field: keyof SelectedJobsResponse }) => {
    const value = data[field];

    return (
        <TableCell>
            {value ? String(value) : "No data available"}
        </TableCell>
    );
};
