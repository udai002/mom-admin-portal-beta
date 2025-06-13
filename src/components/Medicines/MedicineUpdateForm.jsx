import React from "react";

export default function MedicineForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  submitting,
}) {
  if (!formData) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">
        {submitting ? "Updating Medicine..." : "Medicine Form"}
      </h2>

      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Image Upload */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium mb-2">
            Medicine Image
          </label>
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Medicine"
              className="w-24 h-24 object-cover rounded mb-3"
            />
          )}
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={onChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-teal-600"
          />
        </div>

        {/* Text Inputs */}
        {[
          ["medicine_name", "Medicine Name"],
          ["price", "Price"],
          ["discountPrice", "Discount Price"], // <-- add here
          ["use", "Use"],
          ["ingredients", "Ingredients"],
          ["dose", "Dose"],
          ["manufacturer", "Manufacturer"],
          ["notFor", "Not For"],
          ["sideEffects", "Side Effects"],
          ["store", "Store"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium mb-1">
              {label}
            </label>
            <input
              type={
                ["price", "discountPrice"].includes(name) ? "number" : "text"
              }
              name={name}
              value={formData[name] || ""}
              onChange={onChange}
              required={["medicine_name", "price"].includes(name)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-teal-600"
            />
          </div>
        ))}

        {/*
         */}

        {/* Checkbox */}
        <div className="col-span-2 flex items-center space-x-3">
          <input
            type="checkbox"
            name="prescriptionDrug"
            checked={!!formData.prescriptionDrug}
            onChange={onChange}
            className="accent-teal-600"
          />
          <label className="text-gray-700 font-medium">Prescription Drug</label>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={onChange}
            className="w-full border border-gray-300 p-2 rounded h-28 resize-none focus:outline-teal-600"
          />
        </div>

        {/* Date Fields */}
        {[
          ["expiryDate", "Expiry Date"],
          ["manufactureDate", "Manufacture Date"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium mb-1">
              {label}
            </label>
            <input
              type="date"
              name={name}
              value={formData[name] || ""}
              onChange={onChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-teal-600"
            />
          </div>
        ))}

        {/* Submit & Cancel Buttons */}
        <div className="col-span-2 flex justify-end space-x-4 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-teal-600 text-white px-5 py-2 rounded hover:bg-teal-700 transition-all duration-200 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-400 text-gray-700 px-5 py-2 rounded hover:bg-gray-100 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
