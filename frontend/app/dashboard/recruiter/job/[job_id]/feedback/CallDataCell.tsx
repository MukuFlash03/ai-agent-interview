import { SelectedListCallsResponse } from '@/lib/types/call';

import { TableCell } from "@/components/ui/table"

export const CallDataCell = ({ data, field }: { data: SelectedListCallsResponse; field: keyof SelectedListCallsResponse }) => {
    const value = data[field];

    if (field === 'analysis' && value) {
        return <TableCell>{(value as { summary: string }).summary}</TableCell>;
    }

    return (
        <TableCell>
            {value ? String(value) : "No data available"}
        </TableCell>
    );
};
