import React, { useEffect, useState } from 'react';
import useMedicine from '../../context/MedicineContext/Medicine';
import CategoryModal from './CategoryModal';
import SubCategoryModal from './SubCategoryModal';
import Swal from "sweetalert2";
import { MdOutlineCloudUpload } from "react-icons/md";
export default function MyForm() {
    const {
        addMedicine,
        fetchCategories,
        fetchSubCategories,
    } = useMedicine();

    const [formData, setFormData] = useState({
        categoryId: '',
        subCategoryId: '',
        imageFile: null,
        medicine_name: '',
        price: '',
        prescriptionDrug: false,
        description: '',
        use: '',
        ingredients: '',
        dose: '',
        manufacturer: '',
        notFor: '',
        sideEffects: '',
        store: '',
        expiryDate: '',
        manufactureDate: '',
    });

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    useEffect(() => {
        if (formData.categoryId)
            fetchSubCategories(formData.categoryId).then(setSubcategories);
        else
            setSubcategories([]);
    }, [formData.categoryId]);

    const handleChange = e => {
        const { name, type, checked, files, value } = e.target;
        const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const showALert = () => {
        Swal.fire({
  position: "center",
  icon: "success",
  title: "Medicine Added Successfully",
  showConfirmButton: false,
  timer: 2500,
  background:"#D5ECE9",
  
});
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('imageUrl', formData.imageFile);
        fd.append('medicine_name', formData.medicine_name);
        fd.append('price', formData.price);
        fd.append('prescriptionDrug', formData.prescriptionDrug);
        fd.append('description', formData.description);
        fd.append('use', formData.use);
        fd.append('ingredients', formData.ingredients);
        fd.append('dose', formData.dose);
        fd.append('manufacturer', formData.manufacturer);
        fd.append('notFor', formData.notFor);
        fd.append('sideEffects', formData.sideEffects);
        fd.append('store', formData.store);
        fd.append('expiryDate', formData.expiryDate);
        fd.append('manufactureDate', formData.manufactureDate);
        fd.append('subCategory', formData.subCategoryId);

        await addMedicine(fd);
        alert('Medicine added');

        setFormData({
            categoryId: '',
            subCategoryId: '',
            imageFile: null,
            medicine_name: '',
            price: '',
            prescriptionDrug: false,
            description: '',
            use: '',
            ingredients: '',
            dose: '',
            manufacturer: '',
            notFor: '',
            sideEffects: '',
            store: '',
            expiryDate: '',
            manufactureDate: '',
        });
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto  p-3 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Category Select */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Category</label>
                    <div className="flex gap-2">
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                        >
                            <option value="">Select category</option>
                            {categories.map(c => (
                                <option key={c._id} value={c._id}>{c.category_name}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className="text-blue-600 font-bold bg-teal-700 hover:bg-teal-800 text-white px-3 py-1 rounded-lg"
                            onClick={() => setShowCategoryModal(true)}
                        >
                            + 
                        </button>
                    </div>
                </div>

                {/* Subcategory Select */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Subcategory</label>
                    <div className="flex gap-2">
                        <select
                            name="subCategoryId"
                            value={formData.subCategoryId}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                        >
                            <option value="">Select subcategory</option>
                            {subcategories.map(s => (
                                <option key={s._id} value={s._id}>{s.subcategory_name}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className="text-blue-600 font-bold bg-teal-700 hover:bg-teal-800 text-white px-3 py-1 rounded-lg"
                            onClick={() => setShowSubCategoryModal(true)}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2 flex flex-col items-center border border-gray-300  p-3">
                    <label className="block text-gray-700 font-semibold mb-1">Medicine Image</label>
                    
                     <div className="mt-7 mb-8 scale-300 shadow-2xl"><MdOutlineCloudUpload /></div>
                    <input
                        type="file"
                        name="imageFile"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full max-w-xs"
                    />
                    
                    
                </div>

                {/* Medicine Name */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Medicine Name</label>
                    <input
                        name="medicine_name"
                        value={formData.medicine_name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                        placeholder="Medicine Name"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                        placeholder="Price"
                    />
                </div>

                {/* Prescription Drug */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="prescriptionDrug"
                        checked={formData.prescriptionDrug}
                        onChange={handleChange}
                        className="h-5 w-5 text-teal-600"
                    />
                    <label className="text-gray-700 font-semibold">Prescription Drug</label>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                        placeholder="Description"
                    />
                </div>

                {/* Use */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Use</label>
                    <input
                        name="use"
                        value={formData.use}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                        placeholder="Use"
                    />
                </div>

                {/* Ingredients */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Ingredients</label>
                    <input
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                        placeholder="Ingredients"
                    />
                </div>

                {/* Dose */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Dose</label>
                    <input
                        name="dose"
                        value={formData.dose}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                        placeholder="Dose"
                    />
                </div>

                {/* Manufacturer */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Manufacturer</label>
                    <input
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                        placeholder="Manufacturer"
                    />
                </div>

                {/* Not For */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Not For</label>
                    <input
                        name="notFor"
                        value={formData.notFor}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                        placeholder="Not For"
                    />
                </div>

                {/* Side Effects */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Side Effects</label>
                    <input
                        name="sideEffects"
                        value={formData.sideEffects}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                        placeholder="Side Effects"
                    />
                </div>

                {/* Store */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Store</label>
                    <input
                        name="store"
                        value={formData.store}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                        placeholder="Store"
                    />
                </div>

                {/* Expiry Date */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Expiry Date</label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                    />
                </div>

                {/* Manufacture Date */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Manufacture Date</label>
                    <input
                        type="date"
                        name="manufactureDate"
                        value={formData.manufactureDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-center mt-4">
                    <button
                        type="submit" onClick={showALert}
                        className="bg-gradient-to-r from-teal-500 to-teal-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:from-teal-600 hover:to-teal-800 transition-all"
                    >
                        Add Medicine
                    </button>
                </div>
            </form>

            {/* Modals */}
            <CategoryModal
                isOpen={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                onAdded={cat => {
                    setCategories(prev => [...prev, cat]);
                    setFormData(fd => ({ ...fd, categoryId: cat._id }));
                }}
            />

            <SubCategoryModal
                isOpen={showSubCategoryModal}
                onClose={() => setShowSubCategoryModal(false)}
                categories={categories}
                onAdded={sub => {
                    setSubcategories(prev => [...prev, sub]);
                    setFormData(fd => ({ ...fd, subCategoryId: sub._id }));
                }}
            />
        </>
    );
}
