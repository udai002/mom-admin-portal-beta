import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import apiClient from '../../utils/apiClient';

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient('/api/allorders');
        
        console.log("API response:", response);
        setOrders(response.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const sortedOrders = [...orders].sort((a, b) => {
    if (a.status === 'on the way' && b.status !== 'on the way') return -1;
    if (a.status !== 'on the way' && b.status === 'on the way') return 1;
    if (b.status === 'delivered' && b.status !== 'delivered') return 1;
    if (b.status !== 'delivered' && b.status === 'delivered') return -1;
    return 0;
  });

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  return (
    <div className='w-[70%] mx-auto my-6'>
      <div className="p-6 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Order List</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="overflow-x-auto w-[110%] border-1 border-[#00A99D] rounded-2xl">
              <table className="min-w-full bg-[#D5ECE9] rounded-2xl shadow border-collapse">
                <thead>
                  <tr className="text-black uppercase text-sm">
                    <th className="py-3 px-6 text-left">OrderId</th>
                    <th className="py-3 px-6 text-left">Customer</th>
                    <th className="py-3 px-6 text-left">Healporter</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Payment</th>
                    <th className="py-3 px-6 text-left">Amount</th>
                    <th className="py-3 px-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {currentOrders.map((order) => (
                    <tr key={order._id} className="border-b border-[#00A99D]">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{order?.orderId || 'N/A'}</td>
                      <td className="py-3 px-6 text-left">{order.user_id?.name || 'N/A'}</td>
                      <td className="py-3 px-6 text-left">{order.deliveryboy_id?.name || 'N/A'}</td>
                      <td className="py-3 px-6 text-left">
                        {order.createdAt? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                        
                        </td>
                      <td className="py-3 px-6 text-left">{order?.paymentMethod || 'N/A'}</td>
                      <td className="py-3 px-6 text-left">{order?.total_amount || 'N/A'}</td>
                      <td className="py-3 px-6 text-left">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'on the way'
                              ? 'bg-green-200 text-green-800'
                              : order.status === 'delivered'
                              ? 'bg-[#00A99D] text-white'
                              : 'bg-red-200 text-red-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-1 bg-[#00A99D] text-white rounded disabled:bg-gray-400"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? 'bg-[#00A99D] text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-1 bg-[#00A99D] text-white rounded disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OrdersTable;