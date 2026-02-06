import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const email = "user@example.com"; // Same hardcoded email for now

  useEffect(() => {
    fetch(`http://localhost:5000/my-orders/${email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-black text-[#0a303a] mb-6">
        MY <span className="text-[#e83128]">ORDERS</span>
      </h2>
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-bold text-[#0a303a]">Item</th>
              <th className="p-4 font-bold text-[#0a303a]">Category</th>
              <th className="p-4 font-bold text-[#0a303a]">Price</th>
              <th className="p-4 font-bold text-[#0a303a]">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={order.image}
                    className="w-12 h-12 rounded-lg object-cover"
                    alt=""
                  />
                  {order.productName}
                </td>
                <td className="p-4">{order.category}</td>
                <td className="p-4 font-bold">${order.price}</td>
                <td className="p-4">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
