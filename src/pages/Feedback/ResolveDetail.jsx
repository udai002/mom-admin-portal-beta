import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/suggestions';

function ResolveDetail() {
    const { userId, username, email, suggestionType, createdAt, suggestion } = useParams();
    const navigate = useNavigate();
    const [isResolving, setIsResolving] = useState(false);
    const [error, setError] = useState('');

    const handleResolve = async () => {
        if (isResolving) return;
        
        try {
            setIsResolving(true);
            const response = await axios.put(
                `${API_BASE_URL}/update-status/${userId}`,
                { status: 'resolved' }
            );
            
            if (response.data.message === "Suggestion status updated successfully") {
                // Update localStorage
                const resolvedIds = JSON.parse(localStorage.getItem('resolvedSuggestions') || '[]');
                if (!resolvedIds.includes(userId)) {
                    resolvedIds.push(userId);
                    localStorage.setItem('resolvedSuggestions', JSON.stringify(resolvedIds));
                }
                
                // Navigate back to feedback list
                navigate('/feedback');
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating suggestion status:', error);
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
            <h1 className='text-xl font-bold text-[#00A99D] text-center mb-10 text-decoration-line: underline'>Resolve Details</h1>

            <div className='mb-10 text-[black] flex-col' >
                <h2>userId: {userId} </h2>
                <h2 className='text-[black]'>UserName: {decodeURIComponent(username)}</h2>
                <h2 className='text-[black]'>Email: {decodeURIComponent(email)}</h2>
                <h2 className='text-[black]'>CreatedAt: {decodeURIComponent(createdAt)}</h2>
                <h2 className='text-[black]'>SuggestionType: {decodeURIComponent(suggestionType)}</h2>
            </div>

            <div className='bg-white p-4 rounded-lg border border-[#00A99D] flex-col justify-between items-center mb-8'>
                <h3 className='text-[#00A99D] text-ml text-semibold text-center'>User FeedBack: {decodeURIComponent(suggestion)}</h3>
            </div>

            <div className='bg-white p-4 rounded-lg border border-[#00A99D] flex-col justify-between items-center text-center mb-10'>
                <h3 className='text-[#00A99D] text-ml text-semibold text-center'>Send Resolved message</h3>
                <div className='mt-4'>
                    <textarea 
                        className='w-full p-2 rounded-lg border-[#00A99D] focus:outline-none focus:ring-2 focus:ring-[#00A99D]'
                        rows='4'
                        placeholder='Type here'
                    />
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className='flex justify-end gap-4'>
                <button 
                    onClick={handleCancel}
                    className='bg-[grey] text-white rounded-lg w-[100px] h-10'
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