import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MedicineForm from "../components/Medicines/MedicineUpdateForm";


export default function UpdateMedicinePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/medicines/medicines/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Fetch failed");

        setFormData({
          ...data,
          imageFile: null,
          imageUrl: data.imageUrl || ""
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load medicine data");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;

  if (type === "file" && files.length > 0) {
    const file = files[0];
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imageUrl: URL.createObjectURL(file), 
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
};


  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);

    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (k === "imageFile") {
        if (v) fd.append("imageUrl", v);
      } else {
        fd.append(k, v);
      }
    });

    try {
      const res = await fetch(`http://localhost:3000/api/medicines/medicines/${id}`, {
        method: "PUT",
        body: fd
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      alert("Medicine updated!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Update error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => navigate("/");




  return (
    <div className="container mx-auto p-4 my-5 ">
     
      <MedicineForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitting={submitting}
      />
    </div>
  );
}
