import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import apiClient from '../../utils/apiClient';

function ResolveDetail() {
    const { userId, username, email, suggestionType, createdAt, suggestion } = useParams();
    const navigate = useNavigate();
    const [isResolving, setIsResolving] = useState(false);
    const [error, setError] = useState('');

    const handleResolve = async () => {
        if (isResolving) return;

        try {
            setIsResolving(true);
            const result = await apiClient(`/api/suggestions/update-status/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'resolved' }),
            });

            if (result?.message === "Suggestion status updated successfully") {
                const resolvedIds = JSON.parse(localStorage.getItem('resolvedSuggestions') || '[]');
                if (!resolvedIds.includes(userId)) {
                    resolvedIds.push(userId);
                    localStorage.setItem('resolvedSuggestions', JSON.stringify(resolvedIds));
                }
                navigate('/feedback');
            } else {
                throw new Error('Failed to update status');
            }
        } catch (err) {
            console.error('Error updating suggestion status:', err);
            setError('Failed to update status. Please try again.');
        } finally {
            setIsResolving(false);
        }
    };

    const handleCancel = () => {
        navigate('/feedback');
    };

    return (
        <div className='bg-[#d5ece9] p-6 rounded-lg w-[90%] mx-auto my-6 border border-[#00A99D]'>
            <h1 className='text-xl font-bold text-[#00A99D] text-center mb-10 underline'>Resolve Details</h1>

            <div className='mb-10 text-black'>
                <h2>User ID: {userId}</h2>
                <h2>User Name: {decodeURIComponent(username)}</h2>
                <h2>Email: {decodeURIComponent(email)}</h2>
                <h2>Created At: {decodeURIComponent(createdAt)}</h2>
                <h2>Suggestion Type: {decodeURIComponent(suggestionType)}</h2>
            </div>

            <div className='bg-white p-4 rounded-lg border border-[#00A99D] mb-8'>
                <h3 className='text-[#00A99D] font-semibold text-center'>
                    User Feedback: {decodeURIComponent(suggestion)}
                </h3>
            </div>

            <div className='bg-white p-4 rounded-lg border border-[#00A99D] text-center mb-10'>
                <h3 className='text-[#00A99D] font-semibold'>Send Resolved Message</h3>
                <textarea 
                    className='w-full p-2 mt-4 rounded-lg border-[#00A99D] focus:outline-none focus:ring-2 focus:ring-[#00A99D]'
                    rows='4'
                    placeholder='Type here'
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className='flex justify-end gap-4'>
                <button 
                    onClick={handleCancel}
                    className='bg-gray-500 text-white rounded-lg w-[100px] h-10'
                    disabled={isResolving}
                >
                    Cancel
                </button>
                <button 
                    className='bg-[#00A99D] text-white rounded-lg w-[100px] h-10'
                    onClick={handleResolve}
                    disabled={isResolving}
                >
                    {isResolving ? 'Resolving...' : 'Resolve'}
                </button>
            </div>
        </div>
    );
}

export default ResolveDetail;
