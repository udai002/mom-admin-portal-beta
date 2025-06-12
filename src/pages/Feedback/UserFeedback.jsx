import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalenderSymbol from '../../assets/calendar.png';
import SearchSymbol from '../../assets/Search.png';
import { useNavigate } from 'react-router-dom';

function UserFeedback() {
  const navigate = useNavigate();
  const [Details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);

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

    // if (selectedDate) {
    //   const selected = new Date(selectedDate).toLocaleDateString();
    //   filtered = filtered.filter(item => new Date(item.createdAt).toLocaleDateString() === selected);
    // }

    setFilteredDetails(filtered);
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

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="bg-[#00A99D] text-white text-center rounded-md py-6 text-xl font-semibold shadow-md">
        See What Our Users Are Saying
      </div>

      <div className="flex flex-wrap gap-4 items-center my-6">
        {/* <div className="flex gap-4 flex-wrap">
          <div className="border border-teal-500 rounded-lg px-2 py-2 flex items-center gap-2 bg-[#D5ECE9]">
            <img src={SearchSymbol} alt="Search" className="w-5 h-5" />
            <input
              type="text"
              placeholder="Search by keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-transparent"
            />
          </div>

          <div className="border border-teal-500 rounded-lg px-2 py-2 flex items-center gap-2 bg-[#D5ECE9]">
            <img src={CalenderSymbol} alt="Calendar" className="w-5 h-5" />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Sort by Date"
              className="outline-none bg-transparent"
            />
          </div>
        </div> */}

        {/* Dropdown instead of radio buttons */}
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
            ) : filteredDetails.length > 0 ? (
              filteredDetails.map((row, index) => (
                <tr key={row._id} className="border-t border-[#BDE6E2] hover:bg-[#d5f4f1] transition">
                  <td className="px-4 py-3">{index + 1}</td>
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
    </div>
  );
}

export default UserFeedback;
