import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaginatedTable = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/medicines/medicines');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setFilteredData(json);
      } catch (err) {
        console.error('Error fetching medicines:', err);
      }
    };

    fetchMedicines();
  }, []);

  

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();

    const filtered = data.filter(item =>
      Object.values(item).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6 mt-2">
        <input
          type="text"
          onChange={handleSearch}
          className="border border-teal-300 rounded-lg p-2 w-100 h-10 mt-10 focus:ring-2 focus:ring-teal-300"
          placeholder="Search for medicines..."
        />
        <button
          onClick={() => Navigate("/medicineform")}
          type="button"
          className="text-white bg-gradient-to-r mt-10 from-teal-600 via-teal-700 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-semibold rounded-lg text-sm px-6 py-2 shadow-md hover:shadow-lg transition"
        >
          + Add Medicine
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="sticky top-0 bg-teal-600 text-white text-xs uppercase tracking-wider">
            <tr>
              {[
                'Image',
                'Name',
                'Price',
                'Prescription',
                'Description',
                'Use',
                'Ingredients',
                'Dose',
                'Manufacturer',
                'Not For',
                'Side Effects',
                'Store',
                'Expiry',
                'Manufactured',
                'Discount',
                'Actions'
              ].map((title, index) => (
                <th key={index} className="px-4 py-3 whitespace-nowrap">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems?.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2">
                  <img
                    src={item?.imageUrl}
                    alt={item?.medicine_name}
                    className="w-10 h-10 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2" title={item?.medicine_name}>
                  {item?.medicine_name?.slice(0, 10)}...
                </td>
                <td className="px-4 py-2">{item?.price}</td>
                <td className="px-4 py-2">{item?.prescription_drug ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2" title={item?.description}>
                  {item?.description?.slice(0, 10)}...
                </td>
                <td className="px-4 py-2" title={item?.use}>
                  {item?.use?.slice(0, 10)}...
                </td>
                <td className="px-4 py-2" title={item?.ingredients}>
                  {item?.ingredients?.slice(0, 10)}...
                </td>
                <td className="px-4 py-2" title={item?.dose}>
                  {item?.dose?.slice(0, 10)}...
                </td>
                <td className="px-4 py-2" title={item?.manufacturer}>
                  {item?.manufacturer?.slice(0, 10)}...
                </td>
                <td className="px-4 py-2" title={item?.not_for}>
                  {item?.not_for?.slice(0, 10)}...
                </td>
                <td className="px-4 py-2" title={item?.side_effects}>
                  {item?.side_effects?.slice(0, 10)}...
                </td>
                <td className="px-4 py-2" title={item?.store}>
                  {item?.store?.slice(0, 10)}...
                </td>
                <td className="px-4 py-2">{item?.expiry_date}</td>
                <td className="px-4 py-2">{item?.manufacture_date}</td>
                <td className="px-4 py-2">{item?.discount}</td>
                <td className=" flex justify-between px-4 py-2">
                  <button
                    onClick={() => Navigate(`/medicineform/${item._id}`)}
                    className="text-teal-600 hover:text-teal-800 font-semibold mr-2"
                  >
                    Edit
                  </button>
                   <button
                    className="text-teal-600 hover:text-teal-800 font-semibold" >Delete</button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow disabled:opacity-50 hover:bg-teal-700"
        >
          Previous
        </button>
        <p className="text-gray-700 font-medium">
          Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow disabled:opacity-50 hover:bg-teal-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
