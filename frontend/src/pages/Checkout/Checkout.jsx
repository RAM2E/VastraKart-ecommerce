import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import razorpay from "../../assets/razorpay_logo.png";
import stripe from "../../assets/stripe_logo.png";
import CartTotal from "../../components/CartTotal/CartTotal";
import "./Checkout.css";
import axiosInstance from "../../utils/axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");

  const {
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    state: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  

  // const onSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     let orderItems = [];
  
  //     // Loop through cartItems
  //     for (const productId in cartItems) {
  //       const sizes = cartItems[productId]; // { "S": 1, "M": 0 }
        
  //       // Check each size
  //       for (const size in sizes) {
  //         const quantity = sizes[size];
          
  //         if (quantity > 0) {
  //           // Find the product in the products array
  //           const product = products.find((p) => String(p._id) === String(productId)); // Ensure type match
            
  //           if (product) {
  //             orderItems.push({
  //               productId: product._id,
  //               name: product.name,
  //               price: product.price,
  //               size: size,
  //               quantity: quantity,
  //               image: product.image[0]
  //             });
  //           } else {
  //             console.error(`Product not found for ID: ${_id}`);
  //           }
  //         }
  //       }
  //     }
  
  //     console.log("Order Items:", orderItems);
  
  //     // Proceed with order submission
  //     if (orderItems.length === 0) {
  //       toast.error("No items in the cart!");
  //       return;
  //     }
  
  //     let orderData = {
  //       address: formData,
  //       items: orderItems,
  //       amount: getCartAmount() + delivery_fee,
  //     };
  
  //     switch (method) {
  //       case "cod":
  //         const response = await axiosInstance.post("/api/order/place", orderData);
  //         if (response.data.success) {
  //           setCartItems({});
  //           navigate("/orders");
  //         } else {
  //           toast.error(response.data.message);
  //         }
  //         break;
  
  //       case "stripe":
  //         const responseStripe = await axiosInstance.post("/api/order/stripe", orderData);
  //         if (responseStripe.data.success) {
  //           const { session_url } = responseStripe.data;
  //           window.location.replace(session_url);
  //         } else {
  //           toast.error(responseStripe.data.message);
  //         }
  //         break;
  
  //       default:
  //         toast.error("Invalid payment method");
  //         break;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.message);
  //   }
  // };
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // Validate form data
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'street', 'city', 'state', 'zipcode', 'country'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast.error('Please fill all required fields');
        return;
      }
  
      let orderItems = [];
      
      // Process cart items
      Object.entries(cartItems).forEach(([productId, sizes]) => {
        Object.entries(sizes).forEach(([size, quantity]) => {
          if (quantity > 0) {
            const product = products.find(p => String(p._id) === String(productId));
            if (product) {
              orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                size,
                quantity,
                image: product.image[0]
              });
            }
          }
        });
      });
  
      if (orderItems.length === 0) {
        toast.error("Cart is empty!");
        return;
      }
  
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      console.log("orderData:", orderData);
  
      switch (method) {
        case "cod":
          const response = await axiosInstance.post("/api/order/place", orderData);
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Order placed successfully");
          }
          break;
  
        case "stripe":
          const stripeResponse = await axiosInstance.post("/api/order/stripe", orderData);
          console.log("Stripe response:", stripeResponse.data);
          
          if (stripeResponse.data?.success && stripeResponse.data?.data?.session_url) {
            // Redirect to Stripe's hosted checkout page
            window.location.href = stripeResponse.data.data.session_url;
          } else {
            throw new Error(stripeResponse.data?.message || "Failed to initialize payment");
          }
          break;
  
        default:
          toast.error("Please select a payment method");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Checkout failed");
    }
  };


  return (
    <div className="checkout-wrapper">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <span className="step active">Cart</span>
          <span className="step-divider">→</span>
          <span className="step active">Checkout</span>
          <span className="step-divider">→</span>
          <span className="step">Confirmation</span>
        </div>
      </div>

      <form className="form-container" onSubmit={onSubmitHandler}>
        <div className="form-left">
          <div className="checkout-section">
            <h2 className="section-title">Payment Method</h2>
            <div className="payment-options">
              <div onClick={() => setMethod("stripe")}
                className={`payment-option ${method === "stripe" ? "selected" : ""}`}>
                <img src={stripe} alt="Stripe" className="payment-logo" />
                <span className="payment-label">Pay with Card</span>
              </div>
              <div onClick={() => setMethod("razorpay")}
                className={`payment-option ${method === "razorpay" ? "selected" : ""}`}>
                <img src={razorpay} alt="Razorpay" className="payment-logo" />
                <span className="payment-label">Razorpay</span>
              </div>
              <div onClick={() => setMethod("cod")}
                className={`payment-option ${method === "cod" ? "selected" : ""}`}>
                <span className="payment-text">CASH ON DELIVERY</span>
                <span className="payment-label">Pay when you receive</span>
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h2 className="section-title">Contact Information</h2>
            <div className="form-row">
              <input type="text" name="firstName" value={formData.firstName}
                className="form-input" placeholder="First Name" onChange={onChangeHandler} />
              <input type="text" name="lastName" value={formData.lastName}
                className="form-input" placeholder="Last Name" onChange={onChangeHandler} />
            </div>
            <div className="form-row">
              <input type="email" name="email" value={formData.email}
                className="form-input" placeholder="Email Address" onChange={onChangeHandler} />
              <input type="tel" name="phone" value={formData.phone}
                className="form-input" placeholder="Phone Number" onChange={onChangeHandler} />
            </div>
          </div>

          <div className="checkout-section">
            <h2 className="section-title">Shipping Address</h2>
            <div className="form-row full-width">
              <input type="text" name="street" value={formData.street}
                className="form-input" placeholder="Street Address" onChange={onChangeHandler} />
            </div>
            <div className="form-row">
              <input type="text" name="city" value={formData.city}
                className="form-input" placeholder="City" onChange={onChangeHandler} />
              <input type="text" name="state" value={formData.state}
                className="form-input" placeholder="State" onChange={onChangeHandler} />
            </div>
            <div className="form-row">
              <input type="text" name="zipcode" value={formData.zipcode}
                className="form-input" placeholder="Zipcode" onChange={onChangeHandler} />
              <input type="text" name="country" value={formData.country}
                className="form-input" placeholder="Country" onChange={onChangeHandler} />
            </div>
          </div>
        </div>

        <div className="cart-total-container">
          <div className="order-summary">
            <h2 className="section-title">Order Summary</h2>
            <CartTotal />
            <button type="submit" className="place-order-btn">
              Place Order
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

