// import React, { createContext, useEffect, useState } from "react";
// import { product } from "../assets/assets"; 
// import { toast } from "react-toastify";
// import axios from 'axios'
// import { backendUrl } from "../App";
// import { Navigate } from "react-router-dom";
// export const ShopContext = createContext();

// const ShopContextProvider = ({ children }) => { 
//   const currency = "$";
//   const delivery_fee =20;

//   const [cartItems,setCartItems] = useState({})

//   const [products, setProducts] = useState(product);

//   const [token,setToken] = useState('')

//   const [searchTerm,setSearchTerm] =useState('')
//   const updateSearchTerm = (term) =>{
//     setSearchTerm(term)
//   }
  
//   // function to add items to cart
//   const addToCart = async(itemId,size)=>{
//     if(!size){
//       toast.error('Select product size to continue')
//       return
//     }
//     const updatedCart = {...cartItems}

//     if(!updatedCart[itemId]){
//       updatedCart[itemId] = {[size]:1}
//     }
//     else{
//       updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) +1
//     }
//     setCartItems(updatedCart)

//     console.log(`product added to cart : itemId -${itemId},size -${size}`)
//     toast.success('Product added to cart')

//     if(token){
//       try {
//         await axios.post(backendUrl+ '/api/cart/add',{itemId,size},{headers:{token}})
//       } catch (error) {
//         console.log(error)
//         toast.error(error.message)
//       }
//     }


//   }

//   //function to get the amount of items in the cart 
//   const getCartCount = ()=>{
//     let totalCount = 0;
//     for(const items in cartItems){
//       for(const item in cartItems[items]){
//         if(cartItems[items][item]>0){
//           totalCount += cartItems[items][item]
//         }
//       }
//     }
//     return totalCount;
//   }

//   // function to update the qunatity

//   const updateQuantity = async(itemId,size,quantity) =>{
//     let cartData = structuredClone(cartItems)

//     cartData[itemId][size] = quantity;
//     setCartItems(cartData)

//     if(token){
//       try {
//         await axios.post(backendUrl+'/api/cart/update' ,{itemId,size,quantity},{headers:{token}})
//       } catch (error) {
//           console.log(error)
//           toast.error(error.message)
//       }
//     }
//   }

// const getUserCart = async(token) =>{
//   try {
//     const response = await axios.post(backendUrl+ '/api/cart/get',{},{headers:{token}})
//     if(response.data.success){
//       setCartItems(response.data.cartData)
//     }
//   } catch (error) {
//     console.log(error)
//     toast.error(error.message)
//   }
// }


//   // funtion to get the cart total
//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for(const itemId in cartItems){
//       const itemInfo = products.find((product)=> product._id == itemId)
//       if(itemInfo){
//         for(const size in cartItems[itemId]){
//           totalAmount += itemInfo.price * cartItems[itemId][size]
//         }
//       }
//     }
//     return totalAmount;
//   }


//   const getProductData = async() =>{
//     try {
//      const  response = await axios.get(backendUrl+'/api/product/list')
//     //  console.log(response.data)
//     if(response.data.success){
//       setProducts(response.data.products)
//     }else{
//       toast.error(response.data.message)
//     }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   useEffect(()=>{
//     getProductData()
//   },[])

//   useEffect(()=>{
//     if(!token && localStorage.getItem('token')){
//       setToken(localStorage.getItem('token'))
//       getUserCart(localStorage.getItem('token'))
//     }
//   })

//   const value = {
//     products,
//     delivery_fee,
//     cartItems,
//     currency,
//     searchTerm,
//     updateSearchTerm,
//     addToCart,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     Navigate,
//     token,
//     setToken,
//     setCartItems

//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {children} {/* Render nested components */}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;




// import React, { createContext, useEffect, useState } from "react";
// import { product } from "../assets/assets"; 
// import { toast } from "react-toastify";
// import axiosInstance from '../utils/axios';
// import { Navigate } from "react-router-dom";

// export const ShopContext = createContext();

// const ShopContextProvider = ({ children }) => { 
//   const currency = "$";
//   const delivery_fee = 20;

//   console.log('ShopContext initializing...'); // Debug

//   const [cartItems, setCartItems] = useState({});
//   const [products, setProducts] = useState(() => {
//     console.log('Initial products state:', product); // Debug
//     return product;
//   });
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [searchTerm, setSearchTerm] = useState('');

//   const updateSearchTerm = (term) => {
//     setSearchTerm(term);
//   };


//   const addToCart = async(itemId, size) => {
//     if(!size) {
//         toast.error('Select product size to continue');
//         return;
//     }

//     try {
//         const updatedCart = {...cartItems};
//         if(!updatedCart[itemId]) {
//             updatedCart[itemId] = {[size]: 1};
//         } else {
//             updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
//         }
//         setCartItems(updatedCart);

//         if(token) {
//             const response = await axiosInstance.post('/api/cart/add', 
//                 { itemId, size },
//                 { headers: { Authorization: `Bearer ${token}` }}
//             );
            
//             if(response.data.success) {
//                 toast.success('Product added to cart');
//             }
//         } else {
//             toast.success('Product added to cart');
//         }
//     } catch (error) {
//         console.error('Cart update error:', error);
//         toast.error(error.response?.data?.message || 'Failed to add to cart');
//     }
//   }

//   const getCartCount = () => {
//     let totalCount = 0;
//     for(const items in cartItems) {
//       for(const item in cartItems[items]) {
//         if(cartItems[items][item] > 0) {
//           totalCount += cartItems[items][item];
//         }
//       }
//     }
//     return totalCount;
//   };

//   const updateQuantity = async(itemId, size, quantity) => {
//     console.log('Updating quantity:', { itemId, size, quantity }); // Debug
//     try {
//       const cartData = structuredClone(cartItems);
//       cartData[itemId][size] = quantity;
//       setCartItems(cartData);

//       if(token) {
//         const userId = localStorage.getItem('userId');
//         await axiosInstance.post('/api/cart/update', {
//           userId,
//           itemId,
//           size,
//           quantity
//         });
//         toast.success('Cart updated');
//       }
//     } catch (error) {
//       console.error('Update quantity error:', error);
//       toast.error('Failed to update cart');
//     }
//   };

//   const getUserCart = async() => {
//     console.log('Fetching user cart...'); // Debug
//     try {
//       const userId = localStorage.getItem('userId');
//       if (!userId || !token) return;

//       const response = await axiosInstance.post('/api/cart/get', { userId });
//       console.log('Cart response:', response.data); // Debug
//       if(response.data.success) {
//         setCartItems(response.data.cartData || {});
//       }
//     } catch (error) {
//       console.error('Get cart error:', error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('userId');
//         setToken('');
//       }
//       toast.error('Failed to fetch cart');
//     }
//   };

//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for(const itemId in cartItems) {
//       const itemInfo = products.find((product) => product._id === itemId);
//       if(itemInfo) {
//         for(const size in cartItems[itemId]) {
//           totalAmount += itemInfo.price * cartItems[itemId][size];
//         }
//       }
//     }
//     return totalAmount;
//   };

//   const getProductData = async() => {
//     console.log('Fetching products...'); // Debug
//     try {
//       const response = await axiosInstance.get('/api/product/list');
//       console.log('Products response:', response.data); // Debug
      
//       if(response.data.success) {
//         // Fix: Access correct data property
//         const productData = response.data.data || [];
//         console.log('Products to set:', productData); // Debug
//         setProducts(productData);
//       } else {
//         console.error('Product fetch failed:', response.data.message);
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Get products error:', error);
//       toast.error('Failed to fetch products');
//       setProducts([]); // Set empty array on error
//     }
//   };

//   useEffect(() => {
//     console.log('Initial mount - fetching products...'); // Debug
//     getProductData();
//   }, []);

//   useEffect(() => {
//     if(token) {
//       console.log('Token available - fetching cart...'); // Debug
//       getUserCart();
//     }
//   }, [token]);

//   const value = {
//     products,
//     delivery_fee,
//     cartItems,
//     currency,
//     searchTerm,
//     updateSearchTerm,
//     addToCart,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     Navigate,
//     token,
//     setToken,
//     setCartItems
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;


import React, { createContext, useEffect, useState } from "react";
import { product } from "../assets/assets"; 
import { toast } from "react-toastify";
import axiosInstance from '../utils/axios';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    // Constants
    const currency = "$";
    const delivery_fee = 20;

    // State
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState(product);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [searchTerm, setSearchTerm] = useState('');

    // Search functionality
    const updateSearchTerm = (term) => setSearchTerm(term);

  
    const addToCart = async(itemId, size) => {
        if (!size) {
          toast.error('Select product size to continue');
          return;
        }
      
        try {
          const userId = localStorage.getItem('userId');
          if (!userId || !token) {
            toast.error('Please login to continue');
            return;
          }
      
          // Convert itemId to string for consistency
          const stringItemId = String(itemId);
          
          // Update local cart first
          const updatedCart = {...cartItems};
          if (!updatedCart[stringItemId]) {
            updatedCart[stringItemId] = {[size]: 1};
          } else {
            updatedCart[stringItemId][size] = (updatedCart[stringItemId][size] || 0) + 1;
          }
      
          // Send request to backend
          const response = await axiosInstance.post('/api/cart/add', {
            userId: parseInt(userId),
            itemId: stringItemId, // Use string ID
            size,
            quantity: 1
          });
      
          if (response.data.success) {
            setCartItems(updatedCart);
            toast.success('Product added to cart');
          }
        } catch (error) {
          console.error('Cart update error:', error);
          toast.error(error.response?.data?.message || 'Failed to add to cart');
        }
      };

      
  const updateQuantity = async(itemId, size, quantity) => {
      console.log('Updating quantity:', { itemId, size, quantity });
      
      try {
          const userId = localStorage.getItem('userId');
          if (!userId || !token) {
              toast.error('Please login to continue');
              return;
          }
  
          await axiosInstance.post('/api/cart/update', {
              itemId,
              size,
              quantity,
              userId: parseInt(userId)
          });
  
          const cartData = structuredClone(cartItems);
          if (quantity <= 0) {
              delete cartData[itemId][size];
              if (Object.keys(cartData[itemId]).length === 0) {
                  delete cartData[itemId];
              }
          } else {
              cartData[itemId] = cartData[itemId] || {};
              cartData[itemId][size] = quantity;
          }
          
          setCartItems(cartData);
          toast.success('Cart updated');
      } catch (error) {
          console.error('Update quantity error:', error);
      }
  };
 

  const getUserCart = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId || !token) return;
  
      const response = await axiosInstance.get(`/api/cart/${userId}`);
      console.log('Cart API response:', response.data);
  
      // Correct property name to match backend response
      const backendCartData = response.data.cartData || {};
      
      // Convert numeric keys to strings and ensure proper structure
      const formattedCartItems = Object.keys(backendCartData).reduce((acc, itemId) => {
        const stringId = String(itemId); // Convert ID to string
        acc[stringId] = {};
        
        Object.entries(backendCartData[itemId]).forEach(([size, quantity]) => {
          acc[stringId][size] = quantity;
        });
        
        return acc;
      }, {});
  
      console.log('Formatted cart items:', formattedCartItems);
      setCartItems(formattedCartItems);
    } catch (error) {
      console.error('Get cart error:', error);
      setCartItems({});
    }
  };

    const getCartCount = () => {
        let count = 0;
        Object.values(cartItems).forEach(sizes => {
            Object.values(sizes).forEach(quantity => {
                count += quantity;
            });
        });
        return count;
    };

    const getCartAmount = () => {
      let amount = 0;
      Object.entries(cartItems).forEach(([itemId, sizes]) => {
        // Convert both IDs to strings for comparison
        const product = products.find(p => String(p._id) === String(itemId));
        if (product) {
          Object.values(sizes).forEach(quantity => {
            amount += product.price * quantity;
          });
        }
      });
      return amount;
    };

    // Product Management
    const getProductData = async() => {
        try {
            const response = await axiosInstance.get('/api/product/list');
            if(response.data.success) {
                setProducts(response.data.data || []);
            }
        } catch (error) {
            console.error('Get products error:', error);
            toast.error('Failed to fetch products');
            setProducts([]);
        }
    };

    // Effects
    useEffect(() => {
        getProductData();
    }, []);

    useEffect(() => {
        token && getUserCart();
    }, [token]);

    // Context Value
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
        token,
        setToken,
        setCartItems
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;