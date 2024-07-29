'use client'

import { useParams } from 'next/navigation';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const params = useParams();

    const getParamAsString = (param: string | string[] | undefined): string => {
        if (Array.isArray(param)) {
            return param[0] || '';
        }
        return param || '';
    };

    const userId = getParamAsString(params.user_id);

    return React.cloneElement(children as React.ReactElement, { userId });
}