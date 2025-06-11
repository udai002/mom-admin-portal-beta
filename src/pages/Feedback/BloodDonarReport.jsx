import React, { useEffect, useState } from 'react';

import SearchSymbol from '../../assets/Search.png';


function BloodDonarReport() {
  const [DonarDetails, setDonarDetails] = useState([]);
  const [filteredDonarDetails, setFilteredDonarDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');


  useEffect(() => {
    const fetchDonarReports = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/report/reports');
        const data = await response.json();
        let suggestions = Array.isArray(data) ? data : data.DonarDetails || [];

        setDonarDetails(suggestions);
        setFilteredDonarDetails(suggestions);
      } catch (error) {
        console.error("Error fetching donar details:", error);
        setDonarDetails([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonarReports();
  }, []);

  useEffect(() => {
    let filtered = [...DonarDetails];

    if (search.trim()) {
      filtered = filtered.filter(item =>
        item.report?.toLowerCase().includes(search.toLowerCase()) ||
        item.Donar?.name?.toLowerCase().includes(search.toLowerCase())||
        item.Donar?.email?.toLowerCase().includes(search.toLowerCase())||
        item.Donar?.phone?.toLowerCase().includes(search.toLowerCase())||
        item.Donar?.bloodGroup?.toLowerCase().includes(search.toLowerCase())||
        item.city?.toLowerCase().includes(search.toLowerCase())
      );
    }


    setFilteredDonarDetails(filtered);
  }, [search, DonarDetails]);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="bg-[#00A99D] text-white text-center rounded-md py-6 text-xl font-semibold shadow-md">
        See What Our Donars Reports
      </div>

      {/* <div className="flex flex-wrap gap-4 items-center my-6">
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
        </div>
      </div>*/}
        

      <div className="overflow-x-auto rounded-3xl shadow-md border border-[#00A99D] m-8">
        <table className="min-w-full table-auto bg-[#E4F6F5] text-left text-sm text-gray-700">
          <thead className="bg-[#CCF0ED] font-semibold">
            <tr>
              <th className="px-4 py-3">S.no</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Mobile number</th>
              <th className="px-4 py-3">Blood Group</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Report</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonarDetails.length > 0 ? (
              filteredDonarDetails.map((row, index) => (
                <tr key={row._id} className="border-t border-[#BDE6E2] hover:bg-[#d5f4f1] transition">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{row.Donar?.name || 'N/A'}</td>
                  <td className="px-4 py-3">{row.Donar?.email || 'N/A'}</td>
                  <td className="px-4 py-3">{row.Donar?.phone || 'N/A'}</td>
                  <td className="px-4 py-3">{row.Donar?.bloodGroup || 'N/A'}</td>
           <td className="px-4 py-3">
          {row.Donar?.availability === true ? 'true' : 'false'}
        </td>
                  <td className="px-4 py-3">{row.Donar?.city}</td>
                  <td className="px-4 py-3">{row.report || 'N/A'}</td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                    No reports available.
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

export default BloodDonarReport;