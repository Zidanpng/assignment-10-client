import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-orders/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
        });
    }
  }, [user]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-black text-[#0a303a] mb-8 uppercase">
        MY <span className="text-[#e83128]">ORDERS</span>
      </h2>
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-bold text-slate-800">Item</th>
              <th className="p-4 font-bold text-slate-800">Category</th>
              <th className="p-4 font-bold text-slate-800">Price</th>
              <th className="p-4 font-bold text-slate-800">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={order.image}
                    className="w-12 h-12 rounded-lg object-cover"
                    alt={order.productName}
                  />
                  <span>{order.productName}</span>
                </td>
                <td className="p-4">{order.category}</td>
                <td className="p-4 font-bold text-gray-700">${order.price}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === "Pending" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"}`}
                  >
                    {order.status || "Pending"}
                  </span>
                </td>
                <td className="p-4">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No orders found.{" "}
            <Link
              to="/petSupply"
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Order?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
