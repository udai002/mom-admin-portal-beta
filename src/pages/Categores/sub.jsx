import { Stack, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SubReusableTable from "../../components/TableComponent/SubTableComponent";
import * as React from "react";
import { useState, useEffect } from "react";

const columns = [
  { id: "_id", label: "Sub-Category ID", minWidth: 70 },
  { id: "subcategory_name", label: "Sub-Category", minWidth: 100 },
];

function CategoryHeader({ searchValue, onSearchChange }) {
  const navigate = useNavigate();
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#00a99d", fontSize: 30 }}>
        Sub-Categories
      </h1>
      <Stack direction="row" spacing={2} marginBottom={2}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchValue}
            onChange={onSearchChange}
            fullWidth
            sx={{ maxWidth: 300, "& .MuiInputBase-root": { height: 36 } }}
            InputProps={{ sx: { height: 36 } }}
          />
          <Button
            onClick={() => navigate("/sub-forms")}
            variant="contained"
            sx={{ backgroundColor: "#00a99d" }}
          >
            Add Sub-Category
          </Button>
        </div>
      </Stack>
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

  const handleEditSave = async (id, newName) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/medicines/subcategories/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subcategory_name: newName }),
        }
      );
      if (response.ok) {
        setSubCategories((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, subcategory_name: newName } : item
          )
        );
        setFilteredSubCategories((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, subcategory_name: newName } : item
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
    <div style={{ margin: "50px auto", width: "80%" }}>
      <div className="relative">
        <select
          value={selectedCategoryId}
          onChange={handleCategoryChange}
          className="absolute left-0 mt-2 border border-teal-300 rounded-lg p-2 w-40 bg-white z-10"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.category_name}
            </option>
          ))}
        </select>
      </div>
      <CategoryHeader searchValue={searchValue} onSearchChange={handleSearchChange} />
      <SubReusableTable
        columns={columns}
        rows={filteredSubCategories}
        onDelete={handleDelete}
        onEditSave={handleEditSave}
      />
    </div>
  );
}

export default SubCategories;