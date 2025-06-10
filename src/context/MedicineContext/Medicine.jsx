import React, { useContext, useState } from 'react';

export const MedicineContext = React.createContext();

export function MedicineProvider({ children }) {
    const [medicine, setMedicine] = useState([]);

    const addMedicine = async (newMedicine) => {
    try {
        const formData = new FormData();
      
        Object.entries(newMedicine).forEach(([key, value]) => {
          
            if (key === 'imageFile' && value) {
                formData.append('image', value);
            } else if (key !== 'imageUrl') {
                formData.append(key, value);
            }
        });

        const response = await fetch('http://localhost:3000/api/medicines/medicines', {
            method: 'POST',
            body: formData 
        });

        if (response.ok) {
            const data = await response.json();
            setMedicine(prev => [...prev, data]);
            return true;
        } else {
            console.error('Error:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        return false;
    }
};

    return (
        <MedicineContext.Provider value={{ medicine, setMedicine, addMedicine }}>
            {children}
        </MedicineContext.Provider>
    );
}

const useMedicine = () => {
    const context = useContext(MedicineContext);
    if (!context) {
        throw new Error("Medicine context not found");
    }
    return context;
};

export default useMedicine;