import React, { useState } from "react";
import DataTable from "react-data-table-component";
// import Search from '../../../public/'; 
// import profile1 from '../assets/immages/profile1.png'
// import edit from '../assets/immages/edit.png'

export default function DeliveryBoyDetails() {
  
  const data = [
    {
      sno: 1,
      name: "John",
      email: "john@gmail.com",
      area: "Area1",
      phonenumber: "1234567890",
      totalorders: 10,
      status: "Active",
      action: "View",
      userprofile: "View",
      averagerating: 4.5,
    },
    {
      sno: 2,
      name: "David",
      email: "david@gmail.com",
      area: "Area2",
      phonenumber: "9876543210",
      totalorders: 12,
      status: "Inactive",
      action: "View",
      userprofile: "View",
      averagerating: 4.2,
    },
    {
      sno: 3,
      name: "Aryan",
      email: "aryan@gmail.com",
      area: "Area3",
      phonenumber: "9988776655",
      totalorders: 15,
      status: "Active",
      action: "View",
      userprofile: "View",
      averagerating: 4.8,
    },
    {
      sno: 4,
      name: "Elena",
      email: "elena@gmail.com",
      area: "Area4",
      phonenumber: "1234567890",
      totalorders: 7,
      status: "Active",
      action: "View",
      userprofile: "View",
      averagerating: 4.3,
    },
     {
      sno: 5,
      name: "David",
      email: "david@gmail.com",
      area: "Area2",
      phonenumber: "9876543210",
      totalorders: 12,
      status: "Inactive",
      action: "View",
      userprofile: "View",
      averagerating: 4.2,
    },
    {
      sno: 6,
      name: "Aryan",
      email: "aryan@gmail.com",
      area: "Area3",
      phonenumber: "9988776655",
      totalorders: 15,
      status: "Active",
      action: "View",
      userprofile: "View",
      averagerating: 4.8,
    },
    {
      sno: 7,
      name: "Elena",
      email: "elena@gmail.com",
      area: "Area4",
      phonenumber: "1234567890",
      totalorders: 7,
      status: "Active",
      action: "View",
      userprofile: "View",
      averagerating: 4.3,
    },
     {
      sno: 8,
      name: "David",
      email: "david@gmail.com",
      area: "Area2",
      phonenumber: "9876543210",
      totalorders: 12,
      status: "Inactive",
      action: "View",
      userprofile: "View",
      averagerating: 4.2,
    },
    {
      sno: 9,
      name: "Aryan",
      email: "aryan@gmail.com",
      area: "Area3",
      phonenumber: "9988776655",
      totalorders: 15,
      status: "Active",
      action: "View",
      userprofile: "View",
      averagerating: 4.8,
    },
    {
      sno: 10,
      name: "Elena",
      email: "elena@gmail.com",
      area: "Area4",
      phonenumber: "1234567890",
      totalorders: 7,
      status: "Active",
      action: "View",
      userprofile: "View",
      averagerating: 4.3,
    },
  ];

  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = data.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.phonenumber.includes(searchText) ||
      row.area.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const columns = [
    { name: "S.No", selector: (row) => row.sno },
    { name: "Name", selector: (row) => row.name },
    { name: "Phone Number", selector: (row) => row.phonenumber },
    { name: "Total Orders", selector: (row) => row.totalorders },
    { name: "Status", selector: (row) => row.status },
    { name: "Area", selector: (row) => row.area },
    { name: "Action", selector: (row) => row.userprofile,
      cell: row => (
        <button 
          onClick={() => handleImageClick(row)} 
          style={{ padding: 0, border: 'none', background: 'none' }}
        >
          <img 
            src={'/edit.jpg'}
            alt="item"
            style={{
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              borderRadius: '50%',
              border: '1px solid #ddd',  
            }}
          />
        </button>
      ), },
    {
      name: "User Profile",
      selector: (row) => row.userprofile,
      cell: row => (
        <button 
          onClick={() => handleImageClick(row)} 
          style={{ padding: 0, border: 'none', background: 'none' }}
        >
          <img 
            src={'/profile.jpg'}
            alt="item"
            style={{
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              borderRadius: '50%',
              border: '1px solid #ddd',  
            }}
          />
        </button>
      ),
    },
    { name: "Average Rating", selector: (row) => row.averagerating },
  ];

  const handleImageClick = (row) => {
    alert(`Image clicked for ${row.name}`);
  };

  return (
    <div className="max-w-[95%] max-h-[95%] mx-auto p-6 bg-teal-500 border border-teal-1000 rounded-xl shadow-lg" style={{ marginTop: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6" style={{ marginRight: 320, color: 'white' }}>
          Delivery Boy Details
        </h2>
        
        <img src={'/Search.jpeg'} alt="Search" style={{ height: 40, width: 40, marginLeft: 80 }} />
        
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search..."
          style={{ backgroundColor: 'white',opacity:0.9, borderWidth: 2, marginLeft: 320, borderRadius: 10 }}
        />
      </div>

      <div className="bg- rounded-lg p-4 shadow-inner">
        <DataTable
          columns={columns}
          data={filteredData} 
          pagination
          highlightOnHover
          striped
          customStyles={{
            headCells: {
              style: {
                backgroundColor: '#00A99D',
                color: 'white',
              },
            },
            cells: {
              style: {
                backgroundColor: 'white',
                paddingLeft: '12px',
                paddingRight: '12px',
              },
            },
          }}
        />
      </div>
    </div>
  );
}