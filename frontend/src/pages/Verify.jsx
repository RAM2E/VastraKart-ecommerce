// import React, { useContext, useEffect } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';

// const Verify = () => {
//     const navigate = useNavigate();
//     const {token,setCartItems} = useContext(ShopContext);
//     const [searchParams,setSearchparams] = useSearchParams();
//     const success = searchParams.get('success');
//     const orderId = searchParams.get('orderId');

//     const verifyPayment = async () =>{
//         try {
//             if(!token){
//                 return null
//             }

//             const response = await axios.post(
//                 backendUrl+ '/api/order/verifyStripe',
//                 {success,orderId},
//                 {headers:{token}}
//             )
//             if(response.data.success){
//                 setCartItems({});
//                 navigate('/orders');
//                 toast.success('Payment Successful')
//             }else{
//                 navigate('/cart')
//                 toast.error('Payment Failed')
//             }

//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
            
//         }
//     }

//     useEffect(()=>{
//         verifyPayment()
//     },[token])
//   return (
//     <div></div>
//   )
// }

// export default Verify



import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axios"; // Use axiosInstance
import "./Verify.css";

const Verify = () => {
  const navigate = useNavigate();
  const { setCartItems } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!orderId) {
          toast.error("Invalid order reference");
          navigate("/cart");
          return;
        }

        const response = await axiosInstance.post("/api/order/verifyStripe", {
          orderId: orderId,
          success: success === "true"
        });

        if (response.data.success) {
          if (success === "true") {
            setCartItems({});
            toast.success("Payment successful!");
            navigate("/orders");
          } else {
            toast.error("Payment was cancelled");
            navigate("/cart");
          }
        } else {
          throw new Error(response.data.message || "Verification failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error(error.response?.data?.message || "Payment verification failed");
        navigate("/cart");
      }
    };

    verifyPayment();
  }, [orderId, success, navigate, setCartItems]);

  return (
    <div className="verify-container">
      <div className="loading">Processing payment...</div>
    </div>
  );
};

export default Verify;
