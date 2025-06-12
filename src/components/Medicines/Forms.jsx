import React, { useState } from 'react';
import useMedicine from '../../context/MedicineContext/Medicine';

function MyForm() {
    const [formData, setFormData] = useState({
        imageUrl: '',
        
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
        subCategory: ["681f32424863d05779fb5bac"]
    });

    const { addMedicine } = useMedicine();

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

    const handleSubmit = (event) => {
        event.preventDefault();
        addMedicine(formData).then((res) => {
            if (res) {
                setFormData({
                    imageUrl: '',
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
                    subCategory: ["681f32424863d05779fb5bac"]
                });
            }
        });
    };

    return (
        <div className="container mx-auto p-4 my-5 bg-white-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Add Medicine</h2>
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

                <div className="col-span-1 md:col-span-2">
                    <button
                        type="submit"
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MyForm;