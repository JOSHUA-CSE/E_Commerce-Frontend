import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Please login to view your orders");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(response.data.orders);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch orders");
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Processing":
        return "text-blue-600 bg-blue-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen p-8 flex items-center justify-center">
        <div className="text-2xl text-fuchsia-700">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen p-8 flex items-center justify-center">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-center text-fuchsia-700 mb-10">
        My Orders
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {orders.length === 0 ? (
          <div className="text-center text-gray-600 text-xl">
            No orders found. Start shopping to place your first order!
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-6"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <div>
                  <p className="text-gray-600 text-sm">Order ID: {order._id}</p>
                  <p className="text-gray-600 text-sm">
                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Products in Order */}
              <div className="space-y-4">
                {order.products.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.product.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-fuchsia-700 font-bold">
                        ₹{item.product.price} x {item.quantity} = ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-xl font-bold">Total Amount:</span>
                <span className="text-2xl font-bold text-fuchsia-700">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
