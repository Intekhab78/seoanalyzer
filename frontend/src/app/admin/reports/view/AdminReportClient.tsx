"use client";
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../../config';
import Link from 'next/link';

export default function AdminReportClient({ id }: { id: string }) {
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const res = await fetch(`${API_BASE_URL}/api/reports/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch report');
                const data = await res.json();
                setReport(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [id]);

    if (loading) return <div className="p-8 text-center text-slate-400 animate-pulse">Loading detailed diagnostic auditâ€¦</div>;
    if (error || !report) return <div className="p-8 text-center text-red-400">Error: {error || 'Report not found'}</div>;

    return (
        <div className="w-full max-w-6xl mx-auto animate-fade-in relative z-10">
            <header className="mb-8">
                <Link prefetch={false} href="/admin/reports" className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium mb-4">
                    â† Back to Logs
                </Link>
                <h1 className="text-3xl font-bold text-white">Diagnostic Report for {id}</h1>
                <p className="text-blue-400 underline">{report.website?.url}</p>
            </header>
            <div className="glass-panel p-6 border-slate-800/50">
                 <pre className="text-xs text-slate-500">{JSON.stringify(report, null, 2)}</pre>
            </div>
        </div>
    );
}
