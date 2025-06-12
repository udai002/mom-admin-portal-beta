import { Stack, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SubReusableTable from "../../components/TableComponent/SubTableComponent";
import * as React from "react";
import { useState, useEffect } from "react";

const columns = [
  { id: "_id", label: "Sub-Category ID", minWidth: 70 },
  { id: 'imageUrl', label: 'Image', minWidth: 100 },
  { id: "subcategory_name", label: "Sub-Category", minWidth: 100 },
];

function CategoryHeader({ searchValue, onSearchChange }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4 mt-6">
      <input
        type="text"
        placeholder="Search Sub-Categories"
        value={searchValue}
        onChange={onSearchChange}
        className="w-full sm:w-1/2 px-4 py-2 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
      />
      <button
        onClick={() => navigate("/sub-forms")}
        className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200 shadow-md w-full sm:w-auto"
      >
        + Add Sub-Category
      </button>
    </div>
  );
}


function SubCategories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/medicine/categories");
      const data = await res.json();
      if (res.ok) {
        setCategories(data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchSubCategories = async (id = "") => {
    try {
      let url = "http://localhost:3000/api/medicines/subcategories";
      if (id) {

        url = `http://localhost:3000/api/medicines/subcategories?categoryId=${id}`;
      }
      const res = await fetch(url);
      let data = await res.json();

      if (!Array.isArray(data)) {
        data = [];
      }
      if (res.ok) {
        setSubCategories(data);
        setFilteredSubCategories(data);
      } else {
        console.error("Failed to fetch sub-categories");
      }
    } catch (err) {
      console.error("Error fetching sub-categories:", err);
    }
  };


  const handleCategoryChange = async (event) => {
    const catId = event.target.value;
    setSelectedCategoryId(catId);
    await fetchSubCategories(catId);
    setSearchValue("");
  };


  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    const filtered = subCategories.filter((sub) =>
      sub.subcategory_name?.toLowerCase().includes(value)
    );
    setFilteredSubCategories(filtered);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/medicines/subcategories/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setSubCategories((prev) => prev.filter((item) => item._id !== id));
        setFilteredSubCategories((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      alert("Error deleting");
    }
  };

  const handleEditSave = async (id, updatedData) => {


     const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (k === "imageFile") {
        if (v) fd.append("imageUrl", v);
      } else {
        fd.append(k, v);
      }
    });

    try {
      const response = await fetch(
        `http://localhost:3000/api/medicines/subcategories/${id}`,
        {
          method: "PUT",
          body: fd
        }
      );
  
      if (response.ok) {
          const data = await response.json();
        setSubCategories((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, ...data } : item
          )
        );
        setFilteredSubCategories((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, ...data } : item
          )
        );
      } else {
        alert("Failed to update sub-category");
      }
    } catch (error) {
      alert("Error updating sub-category");
    }
  };



  return (

    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold text-teal-600 text-center mb-8">Sub-Categories</h1>


      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-gray-700 font-semibold">Filter by Category</label>
          <select
            value={selectedCategoryId}
            onChange={handleCategoryChange}
            className="border border-teal-300 rounded-lg px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <CategoryHeader
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />
      </div>

      {/* Table */}
      <div className="mt-4">
        <SubReusableTable
          columns={columns}
          rows={filteredSubCategories}
          onDelete={handleDelete}
          onEditSave={handleEditSave}
        />
      </div>
    </div>

  );
}

export default SubCategories;