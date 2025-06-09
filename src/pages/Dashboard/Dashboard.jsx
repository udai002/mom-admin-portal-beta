import React from 'react';

import TopNavBar from '../../components/Dashboard/TopNavBar';
import PieChart from '../../components/Dashboard/Pie';
import Sales from '../../components/Dashboard/Sales';
import Revenue from '../../components/Dashboard/Revenue';
import PolarChart from '../../components/Dashboard/Polar';

export const Dashboard = () => {
  return (
    <>
      <TopNavBar />

      <div className="min-h-screen px-6 py-10 bg-[#f3fdfc] space-y-10">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center">
          <div className="bg-[#d5ece9] rounded-xl border-2 border-[#00a99d] p-6 lg:w-1/3 w-full shadow-md transition duration-300 hover:shadow-lg">
            <p className="text-xl font-semibold mb-4 text-center text-[#00a99d]">Delivery Boys Available</p>
            <PieChart />
          </div>
          <div className="bg-[#00a99d] rounded-xl p-6 lg:w-2/3 w-full shadow-md transition duration-300 hover:shadow-lg">
            <p className="text-xl font-semibold mb-4 text-center text-white">Sales Chart</p>
            <Sales />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="bg-[#00a99d] rounded-xl p-6 w-full lg:w-2/3 shadow-md transition duration-300 hover:shadow-lg">
            <p className="text-xl font-semibold mb-4 text-center text-white">Revenue Chart</p>
            <PolarChart />
          </div>
        </div>
      </div>
    </>
  );
};
