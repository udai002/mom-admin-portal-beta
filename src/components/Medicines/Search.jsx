// import React, { useState } from 'react';

// function MyInput({ data, onSearch}) {
//   const [query, setQuery] = useState('');
//     const [filteredData, setFilteredData] = useState([]);

//     const handleInputChange = (event) => {
//         const value = event.target.value;
//         setQuery(value);
//         filterData(value);
//         onSearch(value); 
//     };

//     const filterData = (value) => {
//         const lowercasedValue = value.toLowerCase().trim();
//         if (!lowercasedValue) {
//             setFilteredData([]);
//             return;
//         }
//         const filtered = data.filter((item) =>
//         item.toLowerCase().includes(lowercasedValue)
//         );
//         setFilteredData(filtered);
//     };

//   return (
//     <input
//       type="text"
//       value={query}
//       onChange={handleInputChange}
//       className='border border-teal-300 rounded-lg p-2 w-100 h-10 mt-10 focus:ring-2 '
//       placeholder="Search for medicines..."
//     />
//   );
// }

// export default MyInput;