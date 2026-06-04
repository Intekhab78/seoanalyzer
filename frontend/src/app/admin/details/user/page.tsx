"use client";
import { useSearchParams } from 'next/navigation';
import AdminDetailsClient from './AdminDetailsClient';
import { Suspense } from 'react';

function UserContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    if (!id) return <div className="p-8 text-white">No User ID provided.</div>;

    return <AdminDetailsClient id={id} />;
}

export default function AdminUserPage() {
    return (
        <Suspense fallback={<div className="p-8 text-slate-400">Loading user profile...</div>}>
            <UserContent />
        </Suspense>
    );
}
