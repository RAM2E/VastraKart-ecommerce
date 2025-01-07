import React, { useContext, useEffect, useState } from "react";
import "./Order.css";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import { backendUrl } from "../../App";

const Order = () => {
  const { token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // Load Order Data
  const loadOrderData = async () => {
    try {
      if (!token) {
        return; // If no token, exit early
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      // Check for success response
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;

            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData(); // Load data when token changes
  }, [token]);

  return (
    <div>
      <div className="orders-container">
        <div className="order-title">
          <h1>My Orders</h1>
        </div>
        <div>
          {orderData.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orderData.map((item, index) => {
              return (
                <div key={index} className="order-item-container">
                  <div className="order-item-details">
                    <img src={item.image[0]} className="order-item-image" alt="" />
                    <div>
                      <p className="order-item-name">{item.name}</p>
                      <div className="order-item-info">
                        <p>
                          {currency}
                          {item.price}
                        </p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                      <p className="order-item-date">
                        Date: <span>{new Date(item.date).toLocaleString()}</span>
                      </p>
                      <p className="order-item-payment">
                        Payment: <span>{item.paymentMethod}</span>
                      </p>
                    </div>
                  </div>
                  <div className="order-item-status-container">
                    <div className="order-item-status">
                      <p className="status-indicator"></p>
                      <p>{item.status}</p>
                    </div>
                    <button onClick={loadOrderData} className="track-order-btn">
                      Track Order
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
