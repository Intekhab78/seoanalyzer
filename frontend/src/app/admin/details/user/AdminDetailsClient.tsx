"use client";
import { useEffect, useState, use } from 'react';
import { API_BASE_URL } from '../../../../config';
import Link from 'next/link';

export default function AdminDetailsClient({ id }: { id: string }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}/details`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch user details');
                const result = await res.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div className="text-slate-400">Loading comprehensive profile...</div>;
    if (error) return <div className="text-red-400 p-8">Error: {error}</div>;
    if (!data) return <div className="text-slate-400 p-8">User not found.</div>;

    return (
        <div className="space-y-10 animate-fade-in pb-20">
             <header>
                <Link href="/admin/details" className="text-red-500 text-xs font-bold hover:underline mb-2 block">← Back to Directory</Link>
                <h1 className="text-4xl font-bold text-white mb-2">{data.user.name}</h1>
                <p className="text-slate-400 font-mono text-sm">{data.user.email}</p>
            </header>
            <div className="glass-panel p-6">
                <p className="text-white">Admin Details for {id}</p>
                <pre className="text-xs text-slate-500 mt-4">{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    );
}
