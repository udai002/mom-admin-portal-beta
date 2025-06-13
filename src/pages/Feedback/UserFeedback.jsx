import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';
import CalenderSymbol from '../../assets/calendar.png';
import SearchSymbol from '../../assets/Search.png';

function UserFeedback() {
  const navigate = useNavigate();
  const [Details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/suggestions/sug');
        const data = await response.json();
        let suggestions = Array.isArray(data) ? data : data.Details || [];

        const resolvedIds = JSON.parse(localStorage.getItem('resolvedSuggestions')) || [];
        suggestions = suggestions.map(item => {
          const isResolved = resolvedIds.includes(item._id);
          return {
            ...item,
            status: isResolved ? 'resolved' : 'pending'
          };
        });

        setDetails(suggestions);
        setFilteredDetails(suggestions);
      } catch (error) {
        console.error("Error fetching details:", error);
        setDetails([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  const sortedDetails = [...Details].sort((a, b) => {
    if (a.status === 'resolved' && b.status !== 'resolved') return 1;
    if (a.status !== 'resolved' && b.status === 'resolved') return -1;
    if (b.status === 'pending' && a.status !== 'pending') return -1;
    if (b.status !== 'pending' && a.status === 'pending') return 1;
    return 0;
  });

  useEffect(() => {
    let filtered = [...sortedDetails];

    if (search.trim()) {
      filtered = filtered.filter(item =>
        item.suggestion?.toLowerCase().includes(search.toLowerCase()) ||
        item.userId?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterType === 'Technical') {
      filtered = filtered.filter(item => item.isTechnical);
    } else if (filterType === 'Non-Technical') {
      filtered = filtered.filter(item => item.isNonTechincal);
    } else if (filterType === 'Product') {
      filtered = filtered.filter(item => item.isProduct);
    }

    setFilteredDetails(filtered);
    setCurrentPage(1); // Reset to first page on new filter/search
  }, [search, filterType, selectedDate, Details]);

  const getStatusClass = (status) => {
    if (status === 'pending') return 'text-orange-600';
    if (status === 'resolved') return 'text-green-700';
    return '';
  };

  const getButtonClass = (status) => {
    return status === 'pending'
      ? 'bg-teal-500 text-white px-4 py-1 rounded hover:bg-teal-600'
      : 'bg-gray-400 text-white px-4 py-1 rounded cursor-not-allowed';
  };

  const handleResolveClick = (row) => {
    const resolvedIds = JSON.parse(localStorage.getItem('resolvedSuggestions') || '[]');
    
    if (!resolvedIds.includes(row._id)) {
      resolvedIds.push(row._id);
      localStorage.setItem('resolvedSuggestions', JSON.stringify(resolvedIds));
    }

    const updated = [...Details];
    const index = updated.findIndex(item => item._id === row._id);
    if (index !== -1) {
      updated[index].status = 'resolved';
      setDetails(updated);
    }

    navigate(`/ResolveDetail/${row._id}/${encodeURIComponent(row.userId?.name || 'N/A')}/${encodeURIComponent(row.userId?.email || 'N/A')}/${encodeURIComponent(row.suggestionType || 'N/A')}/${encodeURIComponent(row.createdAt || 'N/A')}/${encodeURIComponent(row.suggestion || 'N/A')}`);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDetails.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDetails.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="bg-[#00A99D] text-white text-center rounded-md py-6 text-xl font-semibold shadow-md">
        See What Our Users Are Saying
      </div>

      <div className="flex flex-wrap gap-4 items-center my-6">
        <div className="ml-auto border border-teal-500 rounded-lg px-4 py-2 bg-[#D5ECE9]">
          <label className="mr-2 font-medium">Feedback Type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#D5ECE9] outline-none px-2 py-1 rounded"
          >
            <option value="All">All</option>
            <option value="Technical">Technical</option>
            <option value="Non-Technical">Non-Technical</option>
            <option value="Product">Product</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl shadow-md border border-[#00A99D]">
        <table className="min-w-full table-auto bg-[#E4F6F5] text-left text-sm text-gray-700">
          <thead className="bg-[#CCF0ED] font-semibold">
            <tr>
              <th className="px-4 py-3">S.no</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Suggestion Type</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Issue/Feedback</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((row, index) => (
                <tr key={row._id} className="border-t border-[#BDE6E2] hover:bg-[#d5f4f1] transition">
                  <td className="px-4 py-3">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-3">{row.userId?.name || 'N/A'}</td>
                  <td className="px-4 py-3">{row.userId?.email || 'N/A'}</td>
                  <td className="px-4 py-3">{row.suggestionType || 'N/A'}</td>
                  <td className="px-4 py-3">{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{row.suggestion || 'N/A'}</td>
                  <td className={`px-4 py-3 font-medium ${getStatusClass(row.status)}`}>
                    {row.status}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className={getButtonClass(row.status)}
                      disabled={row.status === 'resolved'}
                      onClick={() => handleResolveClick(row)}
                    >
                      {row.status === 'resolved' ? 'Resolved' : 'Resolve'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                  No feedback available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1 ? 'bg-[#00A99D] text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserFeedback;