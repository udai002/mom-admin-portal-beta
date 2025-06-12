import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaRegEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";


export default function DeliveryBoyDetails() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/delivery/alldelivery/")
      .then(response => response.json())
      .then(parsedData => setData(parsedData))
      .catch(error => console.error("Error fetching data:", error));
  }, []); 

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = data.filter((row) => {
    return (
      row.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      row.phonenumber?.includes(searchText) ||
      row.area?.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const columns = [
    { name: "ID.no", selector: (row ) =>   row._id},
    { name: "Name", selector: (row) => row.name },
    { name: "Phone Number", selector: (row) => row.mobileNumber },
    { name: "Total Orders", selector: (row) => row.totalorders },
    { name: "Total LoginTime", selector: (row) => row.totalOnlineTimeInMs },
    {name: "Store id",selector:(row)=>row.storeId},
    { name: "Status", selector: (row) => row.status,
      cell:(row)=>(
      <span style={{
        color:
        row.status==="Online"
        ?"green"
        :row.status==="Busy"
        ?"red"
        :"black",
      }}
      >
      {row.status}
        </span>
        ),
    },
    { name: "Area", selector: (row) => row.area },
    {
      name: "Action",
      cell: row => (
        <button
          onClick={() => handleImageClick(row)}
          style={{ padding: 0, border: 'none', background: 'none' }}
        >
          <FaRegEdit  style={{width:'20px',height:'20px'}}/>
        </button>
      )
    },
    {
      name: "User Profile",
      cell: row => (
        <button
          onClick={() => handleImageClick(row)}
          style={{ padding: 0, border: 'none', background: 'none' }}
        >
 <CgProfile style={{width:'20px',height:'20px'}} />
        </button>
      )
    },

  ];
  return (
    <div className="max-w-[95%] mx-auto p-6 bg-teal-500 border border-teal-1000 rounded-xl shadow-lg" style={{ marginTop: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 className="text-2xl font-bold text-white">Delivery Boy Details</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
         <IoMdSearch  style={{width:'25px',height:'25px'}}/>
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search..."
            style={{
              backgroundColor: 'white',
              opacity: 0.9,
              borderWidth: 2,
              borderRadius: 10,
              padding: '5px 10px',
              minWidth: '250px',
            }}
            
          />
        
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-inner">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          customStyles={{
            headRow: {
              style: {
                backgroundColor: '#00A99D',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
              },
            },
            rows: {
              style: {
                backgroundColor: '#D2ECE9',
                borderRadius: '15px',
                marginBottom: '10px',
                fontWeight: 500,
                fontSize: '15px',
              },
            },
            cells: {
              style: {
                padding: '12px',
                justifyContent: 'center',
              },
            },
          }}
        />
      </div>
    </div>
  );
}