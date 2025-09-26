
import React from 'react';

type SpinnerProps = {
    loading: boolean;
};

export default function Spinner({ loading }: SpinnerProps) {
    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}