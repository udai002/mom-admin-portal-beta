
import React, { useState,useEffect} from 'react';
import profile from '../../../public/profile.jpg';
import { useParams } from 'react-router';

export default function Profile() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [AadharNumber, setAadharNumber] = useState("");
  const [PancardNumber, setPancardNumber] = useState("");
  const [VehicleType, setVehicleType] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [onBoardingDate, setOnBoardingDate] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [status, setStatus] = useState("");
  const [Id, setID] = useState("");
  const [data, setData] = useState([]);
  const { id } = useParams();

   useEffect(() => {
    async function getDetails(){
        console.log('this is id',id)
        try{
            const response = await fetch(`http://localhost:3000/delivery/deliveryboybyid/${id}`)
            if(response.ok){
                const data = await response.json()
                console.log("this is my data",data)
                setData(data)
            }else{
                console.log(response)
            }
        }catch(error){
            console.log(error)
        }
    }

    getDetails()

    }, [id]); 
 
  return (
    <div className="bg-gray-200 text-center p-4 min-h-screen flex justify-center items-center">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 transition-transform w-[900px] text-center m-auto mt-5">
      
        <img 
          src={profile} 
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full shadow-md mb-4"
        />
    
        <h1 className="text-lg text-teal-500 font-bold">DeliveryBoy Profile Details</h1>
        

        <form>
         
          <label htmlFor="name" className="block mt-2 mb-1 text-left font-bold text-gray-700">Name</label>
          <input type="text" placeholder="Enter your name" className="w-full p-2 border border-gray-400 rounded-md text-sm" value={data.name}/>

        
          <label htmlFor="mobileNumber" className="block mt-2 mb-1 text-left font-bold text-gray-700">MobileNumber</label>
          <input type="text" placeholder="Enter your Mobile Number" className="w-full p-2 border border-gray-400 rounded-md text-sm" value={data.mobileNumber}/>

     
          <label htmlFor="Id" className="block mt-2 mb-1 text-left font-bold text-gray-700">ID</label>
          <input type="text" placeholder="Enter your ID" className="w-full p-2 border border-gray-400 rounded-md text-sm" value={data._id} />

         
          <label htmlFor="AadharNumber" className="block mt-2 mb-1 text-left font-bold text-gray-700">AadharNumber</label>
          <input type="text" placeholder="Enter your Aadhar Number" className="w-full p-2 border border-gray-400 rounded-md text-sm" value={data.AadharNumber} />

         
          <label htmlFor="PancardNumber" className="block mt-2 mb-1 text-left font-bold text-gray-700">PancardNumber</label>
          <input type="text" placeholder="Enter your Pancard Number" className="w-full p-2 border border-gray-400 rounded-md text-sm" value={data.pancardNumber || "NA"}/>

     
          <label htmlFor="VehicleType" className="block mt-2 mb-1 text-left font-bold text-gray-700">VehicleType</label>
          <input type="text" placeholder="Enter your Vehicle Type" className="w-full p-2 border border-gray-400 rounded-md text-sm" value={data.vehicleType}/>

        
          <label htmlFor="drivingLicense" className="block mt-2 mb-1 text-left font-bold text-gray-700">DrivingLicense</label>
          <input type="text" placeholder="Enter your Driving License" className="w-full p-2 border border-gray-400 rounded-md text-sm" value={data.drivingLicense} />

        
          <label htmlFor="onBoardingDate" className="block mt-2 mb-1 text-left font-bold text-gray-700">OnboardingDate</label>
          <input type="text" placeholder="Enter Onboarding Date" className="w-full p-2 border border-gray-400 rounded-md text-sm" value={data.createdAt}/>

        
          <label htmlFor="updatedAt" className="block mt-2 mb-1 text-left font-bold text-gray-700">UpdatedAt</label>
          <input type="text" placeholder="Enter Updated At" className="w-full p-2 border border-gray-400 rounded-md text-sm" value={data.updatedAt}/>

      
          <label htmlFor="status" className="block mt-2 mb-1 text-left font-bold text-gray-700">Status</label>
          <input type="text" placeholder="Enter Status" className="w-full p-2 border border-gray-400 rounded-md text-sm" value={data.status} />
        </form>
      </div>
    </div>
  );
}








