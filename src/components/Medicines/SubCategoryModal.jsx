import React, { useState } from 'react';
import Modal from './Modal';

export default function SubCategoryModal({ isOpen, onClose, categories, onAdded }) {
  const [form, setForm] = useState({ subcategory_name: '', category: '', imageFile: null });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setForm(f => ({ ...f, imageFile: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('subcategory_name', form.subcategory_name);
      data.append('category', form.category);
      if (form.imageFile) data.append('imageUrl', form.imageFile);

      const res = await fetch('http://localhost:3000/api/medicines/subcategories', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        const newSub = await res.json();
        onAdded(newSub);
        setForm({ subcategory_name: '', category: '', imageFile: null });
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add SubCategory">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="subcategory_name"
          value={form.subcategory_name}
          onChange={handleChange}
          placeholder="Subcategory name"
          required
          className="w-full mb-2 px-3 py-2 border rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full mb-2 px-3 py-2 border rounded"
        >
          <option value="">Select category</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.category_name}</option>
          ))}
        </select>
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add SubCategory'}
        </button>
      </form>
    </Modal>
  );
}
