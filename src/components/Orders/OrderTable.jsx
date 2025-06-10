import React, {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/allorders');
        const data = await response.json();
        console.log("API response:", data);
        setOrders(data.orders || []); 
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

    const sortedOrders = [...orders].sort((a,b) => {
      if (a.status === 'on the way' && b.status !=='on the way') return -1;
      if (a.status !=='on the way' && b.status ==='on the way') return 1;
      if (b.status ==='delivered' && b.status !=='delivered') return 1;
      if (b.status !=='delivered' && b.status ==='delivered') return -1;
      return 0;
    })

  return (
    <div className='w-[70%] mx-auto my-6'>
    <div className="p-6 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Order List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
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
                <th className="py-3 px-6 text-left">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {sortedOrders.map((order) => (
                <tr key={order._id} className="border-b border-[#00A99D]">
                
                  <td className="py-3 px-6 text-left whitespace-nowrap">{order?.orderId || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{order.user_id?.name || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{order.deliveryboy_id?.name || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{order.date?.slice(0, 10) || 'N/A'}</td>
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
                  
                  <td className="py-3 px-6 text-center">
                    {order?.orderId ? (
                    <button onClick={()=> navigate(`/orders/${order.orderId}`)}
                    className="text-blue-600 hover:underline">View</button>
                    ) : (
                      <span className='text-gray-500'>No Details</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
}

export default OrdersTable;
