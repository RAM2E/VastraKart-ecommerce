import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import razorpay from "../../assets/razorpay_logo.png";
import stripe from "../../assets/stripe_logo.png";
import CartTotal from "../../components/CartTotal/CartTotal";
import "./Checkout.css";
import axios from "axios";
import { backendUrl } from "../../App";
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
    token,
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

  const onSubmitHandler = async () => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          // console.log(response.data);

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            console.log(responseStripe.data);
            toast.error(responseStripe.data.message);
          }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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

