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
        subcategories:["681f32424863d05779fb5bac"]
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
               
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData(prevData => ({
                        ...prevData,
                        imageUrl: reader.result 
                    }));
                };
                reader.readAsDataURL(file); 
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
                    subcategories: ["681f32424863d05779fb5bac"]
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
                    <label htmlFor="medicine_name" className="block text-gray-700 text-sm font-bold mb-2">
                        Medicine Name
                    </label>
                    <input
                        type="text"
                        name="medicine_name"
                        id="medicine_name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Medicine Name"
                        value={formData.medicine_name}
                        onChange={handleChange}
                    />
                </div>

            
                <div>
                    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

               
                <div className="flex items-center">
                    <label htmlFor="prescriptionDrug" className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="prescriptionDrug"
                            id="prescriptionDrug"
                            checked={formData.prescriptionDrug}
                            onChange={handleChange}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700 text-sm font-bold">Prescription Drug</span>
                    </label>
                </div>

              
                <div className="col-span-1 md:col-span-2">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                    />
                </div>

             
                <div>
                    <label htmlFor="use" className="block text-gray-700 text-sm font-bold mb-2">
                        Use
                    </label>
                    <input
                        type="text"
                        name="use"
                        id="use"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Use"
                        value={formData.use}
                        onChange={handleChange}
                    />
                </div>

               
                <div>
                    <label htmlFor="ingredients" className="block text-gray-700 text-sm font-bold mb-2">
                        Ingredients
                    </label>
                    <input
                        type="text"
                        name="ingredients"
                        id="ingredients"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                    />
                </div>

             
                <div>
                    <label htmlFor="dose" className="block text-gray-700 text-sm font-bold mb-2">
                        Dose
                    </label>
                    <input
                        type="text"
                        name="dose"
                        id="dose"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Dose"
                        value={formData.dose}
                        onChange={handleChange}
                    />
                </div>

             
                <div>
                    <label htmlFor="manufacturer" className="block text-gray-700 text-sm font-bold mb-2">
                        Manufacturer
                    </label>
                    <input
                        type="text"
                        name="manufacturer"
                        id="manufacturer"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                    />
                </div>

              
                <div>
                    <label htmlFor="notFor" className="block text-gray-700 text-sm font-bold mb-2">
                        Not For
                    </label>
                    <input
                        type="text"
                        name="notFor"
                        id="notFor"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Not For"
                        value={formData.notFor}
                        onChange={handleChange}
                    />
                </div>

              
                <div>
                    <label htmlFor="sideEffects" className="block text-gray-700 text-sm font-bold mb-2">
                        Side Effects
                    </label>
                    <input
                        type="text"
                        name="sideEffects"
                        id="sideEffects"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Side Effects"
                        value={formData.sideEffects}
                        onChange={handleChange}
                    />
                </div>

           
                <div>
                    <label htmlFor="store" className="block text-gray-700 text-sm font-bold mb-2">
                        Store
                    </label>
                    <input
                        type="text"
                        name="store"
                        id="store"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Store"
                        value={formData.store}
                        onChange={handleChange}
                    />
                </div>

            
                <div>
                    <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">
                        Expiry Date
                    </label>
                    <input
                        type="date"
                        name="expiryDate"
                        id="expiryDate"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Expiry Date"
                        value={formData.expiryDate}
                        onChange={handleChange}
                    />
                </div>

             
                <div>
                    <label htmlFor="manufactureDate" className="block text-gray-700 text-sm font-bold mb-2">
                        Manufacture Date
                    </label>
                    <input
                        type="date"
                        name="manufactureDate"
                        id="manufactureDate"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Manufacture Date"
                        value={formData.manufactureDate}
                        onChange={handleChange}
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
