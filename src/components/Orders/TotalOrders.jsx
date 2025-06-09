import React from 'react';
import { FaShoppingCart, FaRupeeSign, FaChartLine } from 'react-icons/fa';

const TotalOrders = () => {
    return (
        <div className='bg-[#d5ece9] p-6 rounded-lg w-[70%] mx-auto my-6 border-1 border-[#00A99D]'>
            <h2 className='text-xl font-semibold mb-6 text-[#00A99D]'>Order Summary</h2>

            <div className='flex flex-col gap-4 w-full mb-4'>
                <div className='bg-white p-4 rounded-lg border-1 border-[#00A99D] flex justify-between items-center w-[30%]'>
                    <div>
                        <p className='text-[#00A99D] text-sm sm:text-base'>Total Orders</p>
                        <p className='text-[black] text-xl sm:text-2xl font-bold'>1,275</p>
                    </div>
                    <FaShoppingCart className='text-2xl text-[#00A99D]' />
                </div>
            </div>

            
            <div className='flex flex-col gap-4 w-full mb-4'>
                <div className='bg-white p-4 rounded-lg border-1 border-[#00A99D] flex justify-between items-center w-[30%]'>
                    <div>
                        <p className='text-[#00A99D] text-sm sm:text-base'>Revenue Generated</p>
                        <p className='text-[black] text-xl sm:text-2xl font-bold flex items-center gap-1'><FaRupeeSign className='text-xl' />56,897</p>
                    </div>
                    <FaRupeeSign className='text-xl text-[#00A99D]' />
                </div>
            </div>


            <div className='flex flex-col gap-4 w-full'>
                <div className='bg-white p-4 rounded-lg border-1 border-[#00A99D] flex justify-between items-center w-[30%]'>
                    <div>
                        <p className='text-[#00A99D] text-sm sm:text-base'>Average Revenue</p>
                        <p className='text-[black] text-xl sm:text-2xl font-bold flex items-center gap-1'><FaRupeeSign className='text-xl' />23,873</p>
                    </div>
                    <FaChartLine className='text-xl text-[#00A99D]' />
                </div>
            </div>



        </div>
    );
};

export default TotalOrders;