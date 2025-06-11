import React, { useState } from 'react';


function UpdateForm({ initialData, onUpdate, onCancel }) {
    const [formData, setFormData] = useState({
        ...initialData,
        imageFile: null,
        imageUrl: initialData.imageUrl || ''
    });

    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                [name]: checked
            }));
        } else if (type === 'file') {
            const file = files[0];
            if (file) {
                setFormData(prevData => ({
                    ...prevData,
                    imageFile: file,
                    imageUrl: URL.createObjectURL(file)
                }));
            }
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleEdit = async (id) => {
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'imageFile' && value) {
                    formDataToSend.append('imageUrl', value);
                } else if (key !== 'imageUrl' && value !== undefined && value !== null) {
                    formDataToSend.append(key, value);
                }
            });

            const response = await fetch(`http://localhost:3000/api/medicines/medicines/${id}`, {
                method: 'PUT',
                body: formDataToSend
            });

            if (response.ok) {
                const updated = await response.json();
                if (onUpdate) onUpdate(updated);
                alert("Medicine updated successfully!");
            } else {
                alert("Failed to update medicine");
            }
        } catch (error) {
            alert("Error updating medicine");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleEdit(formData._id);
    };

    return (
        <div className="container mx-auto p-4 my-5 bg-white-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Update Medicine</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="col-span-1 md:col-span-2">
                    <label htmlFor="imageFile" className="block text-gray-700 text-sm font-bold mb-2">
                        Medicine Image
                    </label>
                    {formData.imageUrl && (
                        <img
                            src={formData.imageUrl}
                            alt="medicine"
                            className="w-24 h-24 object-cover mb-2 rounded"
                        />
                    )}
                    <input
                        type="file"
                        name="imageFile"
                        id="imageFile"
                        accept="image/*"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Medicine Name</label>
                    <input
                        type="text"
                        name="medicine_name"
                        value={formData.medicine_name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Medicine Name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Price"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Prescription Drug</label>
                    <input
                        type="checkbox"
                        name="prescriptionDrug"
                        checked={formData.prescriptionDrug}
                        onChange={handleChange}
                        className="mr-2 leading-tight"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Description"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Use</label>
                    <input
                        type="text"
                        name="use"
                        value={formData.use}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Use"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Ingredients</label>
                    <input
                        type="text"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Ingredients"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Dose</label>
                    <input
                        type="text"
                        name="dose"
                        value={formData.dose}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Dose"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Manufacturer</label>
                    <input
                        type="text"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Manufacturer"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Not For</label>
                    <input
                        type="text"
                        name="notFor"
                        value={formData.notFor}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Not For"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Side Effects</label>
                    <input
                        type="text"
                        name="sideEffects"
                        value={formData.sideEffects}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Side Effects"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Store</label>
                    <input
                        type="text"
                        name="store"
                        value={formData.store}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Store"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Expiry Date</label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Manufacture Date</label>
                    <input
                        type="date"
                        name="manufactureDate"
                        value={formData.manufactureDate}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="col-span-1 md:col-span-2 flex gap-4">
                    <button
                        type="submit"
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update
                    </button>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default UpdateForm;