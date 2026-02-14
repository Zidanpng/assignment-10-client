import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    if (user?.email) {
      setLoading(true);
      fetch(
        `https://assignment-10-server-woad-six.vercel.app/my-orders/${user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [user?.email]);

  const handleDeleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e83128",
      cancelButtonColor: "#0a303a",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-10-server-woad-six.vercel.app/order/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Cancelled!",
                "Your order has been removed.",
                "success",
              );
              const remaining = orders.filter((order) => order._id !== id);
              setOrders(remaining);
            }
          });
      }
    });
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-black text-[#0a303a] mb-8 uppercase">
        MY <span className="text-[#e83128]">ORDERS</span>
      </h2>
      <div className="bg-white shadow-xl rounded-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-150">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-bold text-slate-800">Item</th>
              <th className="p-4 font-bold text-slate-800">Category</th>
              <th className="p-4 font-bold text-slate-800">Price</th>
              <th className="p-4 font-bold text-slate-800">Status</th>
              <th className="p-4 font-bold text-slate-800">Cancel Order</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={order.image}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
                    alt={order.productName}
                  />
                  <span className="text-gray-700 font-semibold">
                    {order.productName}
                  </span>
                </td>
                <td className="p-4 text-gray-700 font-semibold">
                  {order.category}
                </td>
                <td className="p-4 font-bold text-gray-700">
                  ${order.price || order.Price || 0}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-bold ${order.status === "Pending" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"}`}
                  >
                    {order.status || "Pending"}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="font-bold text-red-500 hover:text-red-700 transition-colors"
                  >
                    Cancel
                  </button>
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
