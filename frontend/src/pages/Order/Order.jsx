// import React, { useContext, useEffect, useState } from "react";
// import "./Order.css";
// import { ShopContext } from "../../context/ShopContext";
// import axios from "axios";
// import { backendUrl } from "../../App";

// const Order = () => {
//   const { token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);

//   // Load Order Data
//   const loadOrderData = async () => {
//     try {
//       if (!token) {
//         return; // If no token, exit early
//       }
//       const response = await axios.post(
//         backendUrl + "/api/order/userorders",
//         {},
//         { headers: { token } }
//       );

//       // Check for success response
//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.map((order) => {
//           order.items.map((item) => {
//             item["status"] = order.status;
//             item["payment"] = order.payment;
//             item["paymentMethod"] = order.paymentMethod;
//             item["date"] = order.date;

//             allOrdersItem.push(item);
//           });
//         });
//         setOrderData(allOrdersItem.reverse());
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     loadOrderData(); // Load data when token changes
//   }, [token]);

//   return (
//     <div>
//       <div className="orders-container">
//         <div className="order-title">
//           <h1>My Orders</h1>
//         </div>
//         <div>
//           {orderData.length === 0 ? (
//             <p>No orders found</p>
//           ) : (
//             orderData.map((item, index) => {
//               return (
//                 <div key={index} className="order-item-container">
//                   <div className="order-item-details">
//                     <img src={item.image[0]} className="order-item-image" alt="" />
//                     <div>
//                       <p className="order-item-name">{item.name}</p>
//                       <div className="order-item-info">
//                         <p>
//                           {currency}
//                           {item.price}
//                         </p>
//                         <p>Quantity: {item.quantity}</p>
//                         <p>Size: {item.size}</p>
//                       </div>
//                       <p className="order-item-date">
//                         Date: <span>{new Date(item.date).toLocaleString()}</span>
//                       </p>
//                       <p className="order-item-payment">
//                         Payment: <span>{item.paymentMethod}</span>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="order-item-status-container">
//                     <div className="order-item-status">
//                       <p className="status-indicator"></p>
//                       <p>{item.status}</p>
//                     </div>
//                     <button onClick={loadOrderData} className="track-order-btn">
//                       Track Order
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;



// import React, { useContext, useEffect, useState } from "react";
// import "./Order.css";
// import { ShopContext } from "../../context/ShopContext";
// import axiosInstance from "../../utils/axios";

// const Order = () => {
//   const { currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);

//   // Load Order Data
//   const loadOrderData = async () => {
//     try {
//       const response = await axiosInstance.get("/api/order/userorders");
//       console.log('Response:', response);  // Log the response to check the structure

//       if (response.data.success) {
//         let allOrdersItem = [];
//         if (response.data.data && response.data.data.length > 0) {
//           response.data.data.forEach((order) => {
//             if (order.items && order.items.length > 0) {
//               order.items.forEach((item) => {
//                 item["status"] = order.status;
//                 item["payment"] = order.payment;
//                 item["paymentMethod"] = order.paymentMethod;
//                 item["date"] = order.date;
//                 allOrdersItem.push(item);
//               });
//             }
//           });
//           setOrderData(allOrdersItem.reverse());
//         } else {
//           console.log("No orders found in response data.");
//         }
//       } else {
//         console.log("Failed to fetch orders: ", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error loading orders:", error);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, []);

//   return (
//     <div>
//       <div className="orders-container">
//         <div className="order-title">
//           <h1>My Orders</h1>
//         </div>
//         <div>
//           {orderData.length === 0 ? (
//             <p>No orders found</p>
//           ) : (
//             orderData.map((item, index) => (
//               <div key={index} className="order-item-container">
//                 <div className="order-item-details">
//                   {/* Image Handling */}
//                   {item.image && item.image.length > 0 ? (
//                     <img
//                       src={item.image[0]} // Use the image URL directly from the backend
//                       className="order-item-image"
//                       alt="Order Item"
//                     />
//                   ) : (
//                     <img
//                       src="/placeholder.png" // This is the fallback image
//                       className="order-item-image"
//                       alt="Placeholder"
//                     />
//                   )}

//                   <div>
//                     <p className="order-item-name">{item.name}</p>
//                     <div className="order-item-info">
//                       <p>
//                         {currency}
//                         {item.price}
//                       </p>
//                       <p>Quantity: {item.quantity}</p>
//                       <p>Size: {item.size}</p>
//                     </div>
//                     <p className="order-item-date">
//                       Date: <span>{new Date(item.date).toLocaleString()}</span>
//                     </p>
//                     <p className="order-item-payment">
//                       Payment: <span>{item.paymentMethod}</span>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="order-item-status-container">
//                   <div className="order-item-status">
//                     <p className="status-indicator"></p>
//                     <p>{item.status}</p>
//                   </div>
//                   <button onClick={loadOrderData} className="track-order-btn">
//                     Track Order
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;


// import React, { useContext, useEffect, useState } from "react";
// import "./Order.css";
// import { ShopContext } from "../../context/ShopContext";
// import axiosInstance from "../../utils/axios";

// const Order = () => {
//   const { currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);

//   // Load Order Data
//   const loadOrderData = async () => {
//     try {
//       const response = await axiosInstance.get("/api/order/userorders");
//       console.log('Response:', response);

//       if (response.data.success) {
//         let allOrdersItem = [];
//         if (response.data.data && response.data.data.length > 0) {
//           response.data.data.forEach((order) => {
//             if (order.items && order.items.length > 0) {
//               order.items.forEach((item) => {
//                 item["status"] = order.status;
//                 item["payment"] = order.payment;
//                 item["paymentMethod"] = order.paymentMethod;
//                 item["date"] = order.date;
//                 allOrdersItem.push(item);
//               });
//             }
//           });
//           setOrderData(allOrdersItem.reverse());
//         } else {
//           console.log("No orders found in response data.");
//         }
//       } else {
//         console.log("Failed to fetch orders: ", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error loading orders:", error);
//     }
//   };


//   useEffect(() => {
//     loadOrderData();
//   }, []);

//   return (
//     <div>
//       <div className="orders-container">
//         <div className="order-title">
//           <h1>My Orders</h1>
//         </div>
//         <div>
//           {orderData.length === 0 ? (
//             <p>No orders found</p>
//           ) : (
//             orderData.map((item, index) => (
//               <div key={index} className="order-item-container">
//                 <div className="order-item-details">
//                   {item.image && item.image.length > 0 ? (
//                     <img
//                       src={item.image[0]}
//                       className="order-item-image"
//                       alt="Order Item"
//                     />
//                   ) : (
//                     <img
//                       src="/placeholder.png"
//                       className="order-item-image"
//                       alt="Placeholder"
//                     />
//                   )}

//                   <div>
//                     <p className="order-item-name">{item.name}</p>
//                     <div className="order-item-info">
//                       <p>
//                         {currency}
//                         {item.price}
//                       </p>
//                       <p>Quantity: {item.quantity}</p>
//                       <p>Size: {item.size}</p>
//                     </div>
//                     <p className="order-item-date">
//                       Date: <span>{new Date(item.date).toLocaleString()}</span>
//                     </p>
//                     <p className="order-item-payment">
//                       Payment: <span>{item.paymentMethod}</span>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="order-item-status-container">
//                   <div className="order-item-status">
//                     <p className="status-indicator"></p>
//                     <p>{item.status}</p>
//                   </div>
//                   <button onClick={loadOrderData} className="track-order-btn">
//                     Track Order
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;



import React, { useContext, useEffect, useState } from "react";
import "./Order.css";
import { ShopContext } from "../../context/ShopContext";
import axiosInstance from "../../utils/axios";

const Order = () => {
  const { currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // Load Order Data
  const loadOrderData = async () => {
    try {
      const response = await axiosInstance.get("/api/order/userorders");
      console.log("Full Order Data:", response.data); // Debug API response

      if (response.data.success) {
        let allOrdersItem = [];

        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          response.data.data.forEach((order) => {
            if (Array.isArray(order.items) && order.items.length > 0) {
              order.items.forEach((item) => {
                item.status = order.status;
                item.payment = order.payment;
                item.paymentMethod = order.paymentMethod;
                item.date = order.date;

                // Check if image exists, otherwise set a default placeholder
                if (!item.image || item.image.length === 0) {
                  item.image = ["/placeholder.png"]; // Set default image
                }

                allOrdersItem.push(item);
              });
            }
          });
          setOrderData(allOrdersItem.reverse());
        } else {
          console.log("No orders found in response data.");
        }
      } else {
        console.log("Failed to fetch orders:", response.data?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };


  useEffect(() => {
    loadOrderData();
  }, []);

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
              console.log("Image Data:", item.image); // Debug image data

              return (
                <div key={index} className="order-item-container">
                  <div className="order-item-details">
                    {/* Handle Image Display */}

                    <img
                      src={item.image || "/placeholder.png"}
                      className="order-item-image"
                      alt="Order Item"
                    />


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
