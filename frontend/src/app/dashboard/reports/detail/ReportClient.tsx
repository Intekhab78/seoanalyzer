"use client";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea, Doughnut } from 'react-chartjs-2';
import { use, useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../../config';
import Link from 'next/link';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// â”€â”€â”€ Status helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
type StatusType = 'pass' | 'warn' | 'fail' | 'info';

function StatusBadge({ status }: { status: StatusType }) {
    const cfg = {
        pass: { icon: 'âœ…', label: 'Pass',    cls: 'bg-green-500/10  text-green-400  border-green-500/20'  },
        warn: { icon: 'âš ï¸', label: 'Warning', cls: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
        fail: { icon: 'âŒ', label: 'Error',   cls: 'bg-red-500/10    text-red-400    border-red-500/20'    },
        info: { icon: 'â„¹ï¸', label: 'Info',    cls: 'bg-blue-500/10   text-blue-400   border-blue-500/20'   },
    }[status];
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.cls} whitespace-nowrap`}>
            {cfg.icon} {cfg.label}
        </span>
    );
}

function AuditRow({
    label, status, summary, fix, children, canShowFix = true
}: {
    label: string; status: StatusType; summary: string;
    fix?: string; children?: React.ReactNode;
    canShowFix?: boolean;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-slate-800/60 last:border-0">
            <div className="flex items-start gap-4 py-4 px-1">
                <div className="w-40 shrink-0">
                    <span className="text-slate-300 text-sm font-medium">{label}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 flex-wrap">
                        <StatusBadge status={status} />
                        <p className="text-slate-400 text-sm leading-relaxed">{summary}</p>
                    </div>
                    {children && <div className="mt-3">{children}</div>}
                </div>
                {(status === 'fail' || status === 'warn') && fix && canShowFix && (
                    <button
                        onClick={() => setOpen(o => !o)}
                        className="shrink-0 text-xs text-blue-400 hover:text-blue-300 border border-blue-500/30 rounded px-2 py-1 transition-colors whitespace-nowrap"
                    >
                        How to fix {open ? 'â–²' : 'â–¼'}
                    </button>
                )}
            </div>
            {open && fix && canShowFix && (
                <div className="mx-1 mb-4 px-4 py-3 rounded-lg bg-blue-500/5 border border-blue-500/20 text-sm text-blue-200">
                    {fix}
                </div>
            )}
        </div>
    );
}

function KeywordPills({ keywords }: { keywords: { word: string; count: number }[] }) {
    if (!keywords || keywords.length === 0) return <span className="text-slate-500 text-sm">No keywords found.</span>;
    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {keywords.map((k, i) => (
                <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700/60 border border-slate-600/40 text-slate-200"
                >
                    <span>{k.word}</span>
                    <span className="bg-slate-600 text-slate-300 px-1.5 py-0.5 rounded-full text-[10px]">{k.count}</span>
                </span>
            ))}
        </div>
    );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
    return (
        <div className="glass-panel overflow-hidden mb-6">
            <div className={`px-6 py-3 text-sm font-bold text-white tracking-widest uppercase border-b border-slate-700/50 ${color}`}>
                {title}
            </div>
            <div className="px-6 divide-y divide-slate-800/40">
                {children}
            </div>
        </div>
    );
}

function PolarAreaChart({ data }: { data: any }) {
    return (
        <div className="w-full max-w-[220px]">
             <PolarArea data={data} options={{ scales: { r: { angleLines: { color: 'rgba(255,255,255,0.1)' }, grid: { color: 'rgba(255,255,255,0.1)' }, pointLabels: { color: '#94a3b8' }, ticks: { display: false }, min: 0, max: 100 } }, plugins: { legend: { display: false } } } as any} />
        </div>
    );
}

export default function ReportClient({ id }: { id: string }) {
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userPlanType, setUserPlanType] = useState('Basic Report');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
                const res = await fetch(`${API_BASE_URL}/api/reports/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (res.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return;
                }
                
                if (!res.ok) throw new Error('Failed to fetch report');
                const data = await res.json();
                setReport(data);
                setUserPlanType((data.planType || 'Basic Report').trim());
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchReport();
    }, [id]);

    if (loading) return <div className="p-8 text-center text-slate-400 animate-pulse">Loading your audit reportâ€¦</div>;
    if (error || !report) return <div className="p-8 text-center text-red-400">Error: {error || 'Report not found'}</div>;

    const isExpert = userPlanType === 'Expert Report';
    const chartData = {
        labels: isExpert ? ['Technical', 'Performance', 'SEO Overall'] : ['Technical', 'SEO Overall'],
        datasets: [{
            data: isExpert 
                ? [report.technicalScore || 0, report.performanceScore || 0, report.seoScore || 0] 
                : [report.technicalScore || 0, report.seoScore || 0],
            backgroundColor: isExpert 
                ? ['rgba(59,130,246,0.5)', 'rgba(245,158,11,0.5)', 'rgba(16,185,129,0.5)']
                : ['rgba(59,130,246,0.5)', 'rgba(16,185,129,0.5)'],
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
        }],
    };

    return (
        <div className="w-full max-w-6xl mx-auto animate-fade-in relative z-10 pb-20">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">SEO Audit Report</h1>
                    <p className="text-slate-400">Website: <span className="text-blue-400">{report.website?.url}</span></p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="glass-panel p-6 flex flex-col items-center">
                    <h3 className="text-white font-bold mb-4 w-full">Score Breakdown</h3>
                    <PolarAreaChart data={chartData} />
                </div>
                <div className="glass-panel p-6 lg:col-span-2">
                    <h3 className="text-white font-bold mb-4">Critical Observations</h3>
                    <div className="space-y-3">
                        {report.issues?.map((iss: any, i: number) => (
                            <div key={i} className="flex gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-700/40 text-sm">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${iss.impact === 'High' ? 'text-red-400 border-red-500/20' : 'text-blue-400 border-blue-500/20'}`}>{iss.impact}</span>
                                <div><p className="text-white font-medium">{iss.issue}</p><p className="text-slate-400 text-xs mt-0.5">{iss.recommendation}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Section title="Basic SEO Audit" color="bg-slate-800/60">
                <AuditRow label="Keywords" status="info" summary="Top keywords:"><KeywordPills keywords={report.keywords || []} /></AuditRow>
                <AuditRow label="H1 Tag" status={report.h1Count === 1 ? 'pass' : 'fail'} summary={report.h1Count === 1 ? 'One H1 found.' : `${report.h1Count} H1 tags found.`} />
            </Section>
        </div>
    );
}
