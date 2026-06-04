"use client";
import { useSearchParams } from 'next/navigation';
import AdminReportClient from './AdminReportClient';
import { Suspense } from 'react';

function ReportContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    if (!id) return <div className="p-8 text-white">No Report ID provided.</div>;

    return <AdminReportClient id={id} />;
}

export default function AdminViewPage() {
    return (
        <Suspense fallback={<div className="p-8 text-slate-400">Loading diagnostic data...</div>}>
            <ReportContent />
        </Suspense>
    );
}
