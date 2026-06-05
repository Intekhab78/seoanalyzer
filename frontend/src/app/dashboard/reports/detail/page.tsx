"use client";
import { useSearchParams } from 'next/navigation';
import ReportClient from './ReportClient';
import { Suspense } from 'react';

function ReportContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    if (!id) return <div className="p-8 text-white">No Report ID provided.</div>;

    return <ReportClient id={id} />;
}

export default function ReportPage() {
    return (
        <Suspense fallback={<div className="p-8 text-slate-400">Loading components...</div>}>
            <ReportContent />
        </Suspense>
    );
}
