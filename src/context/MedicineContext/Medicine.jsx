import React, { createContext, useContext, useState } from 'react';

const MedicineContext = createContext();

export function MedicineProvider({ children }) {
  const [medicine, setMedicine] = useState([]);

  async function addCategory(name) {
    const res = await fetch('http://localhost:3000/api/medicines/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category_name: name }),
    });
    return res.json();
  }

  async function addSubCategory({ name, categoryId, imageFile }) {
    const form = new FormData();
    form.append('subcategory_name', name);
    form.append('category', categoryId);
    form.append('imageUrl', imageFile);
    const res = await fetch('http://localhost:3000/api/medicines/subcategories', {
      method: 'POST',
      body: form,
    });
    return res.json();
  }

  async function addMedicine(formData) {
    const res = await fetch('http://localhost:3000/api/medicines/medicines', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setMedicine(prev => [...prev, data]);
    return data;
  }

  const fetchCategories = () => fetch('http://localhost:3000/api/medicines/categories').then(r => r.json());
  const fetchSubCategories = categoryId =>
    fetch(`http://localhost:3000/api/medicines/categories/${categoryId}/subcategories`).then(r => r.json());
  const fetchMedicines = () =>
    fetch('http://localhost:3000/api/medicines/medicines').then(r => r.json());

  return (
    <MedicineContext.Provider
      value={{
        medicine,
        addCategory,
        addSubCategory,
        addMedicine,
        fetchCategories,
        fetchSubCategories,
        fetchMedicines,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
}

export default () => {
  const ctx = useContext(MedicineContext);
  if (!ctx) throw new Error("Context not found");
  return ctx;
};
