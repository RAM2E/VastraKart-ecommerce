import React, { createContext, useEffect, useState } from "react";
import { product } from "../assets/assets"; 
import { toast } from "react-toastify";
import axios from 'axios'
import { backendUrl } from "../App";
import { Navigate } from "react-router-dom";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => { 
  const currency = "$";
  const delivery_fee =20;

  const [cartItems,setCartItems] = useState({})

  const [products, setProducts] = useState(product);

  const [token,setToken] = useState('')

  const [searchTerm,setSearchTerm] =useState('')
  const updateSearchTerm = (term) =>{
    setSearchTerm(term)
  }
  
  // function to add items to cart
  const addToCart = async(itemId,size)=>{
    if(!size){
      toast.error('Select product size to continue')
      return
    }
    const updatedCart = {...cartItems}

    if(!updatedCart[itemId]){
      updatedCart[itemId] = {[size]:1}
    }
    else{
      updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) +1
    }
    setCartItems(updatedCart)

    console.log(`product added to cart : itemId -${itemId},size -${size}`)
    toast.success('Product added to cart')

    if(token){
      try {
        await axios.post(backendUrl+ '/api/cart/add',{itemId,size},{headers:{token}})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }


  }

  //function to get the amount of items in the cart 
  const getCartCount = ()=>{
    let totalCount = 0;
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          totalCount += cartItems[items][item]
        }
      }
    }
    return totalCount;
  }

  // function to update the qunatity

  const updateQuantity = async(itemId,size,quantity) =>{
    let cartData = structuredClone(cartItems)

    cartData[itemId][size] = quantity;
    setCartItems(cartData)

    if(token){
      try {
        await axios.post(backendUrl+'/api/cart/update' ,{itemId,size,quantity},{headers:{token}})
      } catch (error) {
          console.log(error)
          toast.error(error.message)
      }
    }
  }

const getUserCart = async(token) =>{
  try {
    const response = await axios.post(backendUrl+ '/api/cart/get',{},{headers:{token}})
    if(response.data.success){
      setCartItems(response.data.cartData)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}


  // funtion to get the cart total
  const getCartAmount = () => {
    let totalAmount = 0;
    for(const itemId in cartItems){
      const itemInfo = products.find((product)=> product._id == itemId)
      if(itemInfo){
        for(const size in cartItems[itemId]){
          totalAmount += itemInfo.price * cartItems[itemId][size]
        }
      }
    }
    return totalAmount;
  }


  const getProductData = async() =>{
    try {
     const  response = await axios.get(backendUrl+'/api/product/list')
    //  console.log(response.data)
    if(response.data.success){
      setProducts(response.data.products)
    }else{
      toast.error(response.data.message)
    }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getProductData()
  },[])

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  })

  const value = {
    products,
    delivery_fee,
    cartItems,
    currency,
    searchTerm,
    updateSearchTerm,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    Navigate,
    token,
    setToken,
    setCartItems

  };

  return (
    <ShopContext.Provider value={value}>
      {children} {/* Render nested components */}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
