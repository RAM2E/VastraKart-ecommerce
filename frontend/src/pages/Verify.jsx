import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Verify = () => {
    const navigate = useNavigate();
    const {token,setCartItems} = useContext(ShopContext);
    const [searchParams,setSearchparams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () =>{
        try {
            if(!token){
                return null
            }

            const response = await axios.post(
                backendUrl+ '/api/order/verifyStripe',
                {success,orderId},
                {headers:{token}}
            )
            if(response.data.success){
                setCartItems({});
                navigate('/orders');
                toast.success('Payment Successful')
            }else{
                navigate('/cart')
                toast.error('Payment Failed')
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])
  return (
    <div></div>
  )
}

export default Verify