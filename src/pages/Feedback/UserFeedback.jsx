import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalenderSymbol from '../../assets/calendar.png';
import SearchSymbol from '../../assets/Search.png';

function UserFeedback() {
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
        suggestions = suggestions.map(item =>
          resolvedIds.includes(item._id)
            ? { ...item, status: 'resolved' }
            : item
        );

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

  useEffect(() => {
    let filtered = [...Details];

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
    }

    if (selectedDate) {
      const selected = new Date(selectedDate).toLocaleDateString();
      filtered = filtered.filter(item => new Date(item.createdAt).toLocaleDateString() === selected);
    }

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

  const handleResolve = (index, id) => {
    const updated = [...filteredDetails];
    updated[index].status = 'resolved';
    setFilteredDetails(updated);

    const resolvedIds = JSON.parse(localStorage.getItem('resolvedSuggestions')) || [];
    if (!resolvedIds.includes(id)) {
      resolvedIds.push(id);
      localStorage.setItem('resolvedSuggestions', JSON.stringify(resolvedIds));
    }

    const allUpdated = [...Details];
    const i = allUpdated.findIndex(item => item._id === id);
    if (i !== -1) {
      allUpdated[i].status = 'resolved';
      setDetails(allUpdated);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="bg-[#00A99D] text-white text-center rounded-md py-6 text-xl font-semibold shadow-md">
        See What Our Users Are Saying
      </div>

      <div className="flex flex-wrap gap-4 items-center my-6">
        <div className="flex gap-4 flex-wrap">
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
        </div>

        <div className="border border-teal-500 rounded-lg px-4 py-2 flex gap-2 items-center ml-auto bg-[#D5ECE9]">
          <label>Feedback Type:</label>
          <label><input type="radio" checked={filterType === 'Technical'} onChange={() => setFilterType('Technical')} /> Technical</label>
          <label><input type="radio" checked={filterType === 'Non-Technical'} onChange={() => setFilterType('Non-Technical')} /> Non-Technical</label>
          <label><input type="radio" checked={filterType === 'All'} onChange={() => setFilterType('All')} /> All</label>
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
            {filteredDetails.length > 0 ? (
              filteredDetails.map((row, index) => (
                <tr key={row._id} className="border-t border-[#BDE6E2] hover:bg-[#d5f4f1] transition">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{row.userId?.name || 'N/A'}</td>
                  <td className="px-4 py-3">{row.userId?.email || 'N/A'}</td>
                  <td className="px-4 py-3">{row.suggestionType || 'N/A'}</td>
                  <td className="px-4 py-3">{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{row.suggestion || 'N/A'}</td>
                  <td className={`px-4 py-3 font-medium ${getStatusClass(row.status || 'pending')}`}>
                    {row.status || 'pending'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className={getButtonClass(row.status || 'pending')}
                      disabled={(row.status || 'pending') !== 'pending'}
                      onClick={() => handleResolve(index, row._id)}
                    >
                      Resolve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                    No feedback available.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserFeedback;
