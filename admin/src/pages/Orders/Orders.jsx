import React, { useState, useEffect } from "react";
import axios from "axios";
import './Order.css';
import { backendUrl, currency } from '../../App';
import { toast } from "react-toastify";

const Orders = ({token}) => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const handleCardClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const statusHandler = async (e, orderId) => {
    e.stopPropagation(); // Prevent card expansion when selecting status
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if(response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <h3 className="order-title">All Orders</h3>
      <div className="order-container">
        {orders.map((order) => (
          <div 
            key={order._id}
            className={`order-card ${expandedOrderId === order._id ? 'expanded' : ''}`}
            onClick={() => handleCardClick(order._id)}
          >
            <div className="order-preview">
              <div className="preview-left">
                <h3>Order #{order._id.slice(-6)}</h3>
                <p>{order.address.firstName} {order.address.lastName}</p>
                <p>{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="preview-right">
                <p className="amount">{currency}{order.amount}</p>
                <p className="status">{order.status}</p>
              </div>
            </div>

            <div className="order-details">
              <div className="details-content">
                <div className="section">
                  <h4>Customer Details</h4>
                  <p>Phone: {order.address.phone}</p>
                  <p>Address: {order.address.state}, {order.address.country} {order.address.zipcode}</p>
                </div>

                <div className="section">
                  <h4>Order Items</h4>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <p>{item.name} - Size: {item.size}</p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="section">
                  <h4>Payment Details</h4>
                  <p>Method: {order.paymentMethod}</p>
                  <p>Status: {order.payment ? "Paid" : "Pending"}</p>
                </div>

                <select
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="order-status"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;