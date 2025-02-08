
// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../../context/ShopContext';
// import CartTotal from '../../components/CartTotal/CartTotal';
// import { MdDelete } from 'react-icons/md';
// import './Cart.css'
// import { useNavigate } from 'react-router-dom';
// const Cart = () => {

//   const navigate = useNavigate();
//   const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     if (products.length === 0) return;

//     if (!cartItems || typeof cartItems !== 'object') {
//       setCartData([]);
//       return;
//     }

//     const tempData = Object.entries(cartItems).flatMap(([itemId, sizes]) =>
//       Object.entries(sizes)
//         .filter(([, quantity]) => quantity > 0)
//         .map(([size, quantity]) => ({
//           _id: itemId,
//           size,
//           quantity,
//         }))
//     );
//     setCartData(tempData);
//   }, [cartItems, products]);

//   const proceedToCheckout = () => { 
//     navigate('/checkout'); 
//   }

//   return (
//     <div>
//       <div className="cart-content-container">
//         {cartData.length === 0 ? (
//           <div className="empty-cart-message">Your cart is empty.</div>
//         ) : (
//           cartData.map((item, index) => {
//             const productData = products.find((product) => product._id === item._id);
//             if (!productData) return;

//             return (
//               <div key={index} className="cart-item">
//                 <div className="cart-item-info">
//                   <img
//                     src={productData.image[0]}
//                     alt={productData.name}
//                     className="product-cart-image"
//                   />
//                   <div className="product-details-cart">
//                     <p className="cart-product-name">{productData.name}</p>
//                     <div className="product-price-size">
//                       <p className='cart-product-price'>
//                         {currency}
//                         {productData.price}
//                       </p>
//                       <p className="size">{item.size}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <input
//                   type="number"
//                   className="quantity-input"
//                   min={1}
//                   value={item.quantity}
//                   onChange={(e) => {
//                     const value = Number(e.target.value);
//                     if (value > 0) updateQuantity(item._id, item.size, value);
//                   }}
//                 />
//                 <MdDelete
//                   className="delete-icon"
//                   onClick={() => updateQuantity(item._id, item.size, 0)}
//                 />
//               </div>
//             );
//           })
//         )}
//       </div>
//       <div className="checkout-container">
//         <div className="checkout-box">
//           <CartTotal />
//           <div className="checkout-button-container">
//             <button onClick={proceedToCheckout} className="checkout-button">PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../../context/ShopContext';
// import CartTotal from '../../components/CartTotal/CartTotal';
// import { MdDelete } from 'react-icons/md';
// import './Cart.css';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Cart = () => {
//   const navigate = useNavigate();
//   const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     try {
//       setIsLoading(true);
//       if (products.length === 0) return;

//       if (!cartItems || typeof cartItems !== 'object') {
//         setCartData([]);
//         return;
//       }

//       const tempData = Object.entries(cartItems).flatMap(([itemId, sizes]) =>
//         Object.entries(sizes)
//           .filter(([, quantity]) => quantity > 0)
//           .map(([size, quantity]) => ({
//             _id: itemId,
//             size,
//             quantity,
//             product: products.find(p => p._id === itemId)
//           }))
//       ).filter(item => item.product); // Only include items with valid products

//       setCartData(tempData);
//     } catch (error) {
//       console.error('Error processing cart data:', error);
//       toast.error('Error loading cart items');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [cartItems, products]);

//   const handleQuantityChange = (itemId, size, value) => {
//     const numValue = parseInt(value);
//     if (isNaN(numValue) || numValue < 1) {
//       toast.error('Please enter a valid quantity');
//       return;
//     }
//     updateQuantity(itemId, size, numValue);
//   };

//   const handleDeleteItem = (itemId, size) => {
//     try {
//       updateQuantity(itemId, size, 0);
//       toast.success('Item removed from cart');
//     } catch (error) {
//       toast.error('Failed to remove item');
//     }
//   };

//   if (isLoading) {
//     return <div className="loading">Loading cart...</div>;
//   }

//   return (
//     <div>
//       <div className="cart-content-container">
//         {cartData.length === 0 ? (
//           <div className="empty-cart-message">
//             Your cart is empty. 
//             <button onClick={() => navigate('/')} className="continue-shopping">
//               Continue Shopping
//             </button>
//           </div>
//         ) : (
//           cartData.map((item, index) => (
//             <div key={`${item._id}-${item.size}`} className="cart-item">
//               <div className="cart-item-info">
//                 <img
//                   src={item.product.image[0]}
//                   alt={item.product.name}
//                   className="product-cart-image"
//                 />
//                 <div className="product-details-cart">
//                   <p className="cart-product-name">{item.product.name}</p>
//                   <div className="product-price-size">
//                     <p className="cart-product-price">
//                       {currency}{item.product.price}
//                     </p>
//                     <p className="size">{item.size}</p>
//                   </div>
//                 </div>
//               </div>
//               <input
//                 type="number"
//                 className="quantity-input"
//                 min={1}
//                 value={item.quantity}
//                 onChange={(e) => handleQuantityChange(item._id, item.size, e.target.value)}
//               />
//               <MdDelete
//                 className="delete-icon"
//                 onClick={() => handleDeleteItem(item._id, item.size)}
//               />
//             </div>
//           ))
//         )}
//       </div>
//       {cartData.length > 0 && (
//         <div className="checkout-container">
//           <div className="checkout-box">
//             <CartTotal />
//             <div className="checkout-button-container">
//               <button onClick={() => navigate('/checkout')} className="checkout-button">
//                 PROCEED TO CHECKOUT
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import CartTotal from '../../components/CartTotal/CartTotal';
import { MdDelete } from 'react-icons/md';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processCartData = () => {
      console.log('Processing cart with:', {
        cartItems: cartItems,
        products: products?.map(p => ({ id: p._id, name: p.name }))
      });
  
      setIsLoading(true);
      try {
        if (!products?.length) {
          console.log('Waiting for products...');
          return;
        }
  
        const tempData = [];
        
        if (cartItems && typeof cartItems === 'object') {
          Object.entries(cartItems).forEach(([itemId, sizes]) => {
            // Ensure both IDs are treated as strings
            const product = products.find(p => String(p._id) === String(itemId));
            
            console.log('Product match check:', {
              itemId,
              productId: product?._id,
              match: !!product
            });
  
            if (product) {
              Object.entries(sizes).forEach(([size, quantity]) => {
                if (quantity > 0) {
                  tempData.push({
                    _id: itemId,
                    size,
                    quantity,
                    product: {
                      ...product,
                      // Ensure image handling
                      image: product.image || [defaultImage]
                    }
                  });
                }
              });
            }
          });
        }
  
        console.log('Processed cart items:', tempData);
        setCartData(tempData);
      } catch (error) {
        console.error('Cart processing error:', error);
        toast.error('Error loading cart items');
      } finally {
        setIsLoading(false);
      }
    };
  
    processCartData();
  }, [cartItems, products]);

  const handleQuantityChange = (itemId, size, value) => {
    console.log('Updating quantity:', { itemId, size, value });
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 1) {
      toast.error('Please enter a valid quantity');
      return;
    }
    updateQuantity(itemId, size, numValue);
  };

  const handleDeleteItem = (itemId, size) => {
    console.log('Deleting item:', { itemId, size });
    try {
      updateQuantity(itemId, size, 0);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to remove item');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (!cartData.length) {
    return (
      <div className="cart-content-container">
        <div className="empty-cart-message">
          Your cart is empty. 
          <button onClick={() => navigate('/')} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="cart-content-container">
        {cartData.map((item) => (
          <div key={`${item._id}-${item.size}`} className="cart-item">
            <div className="cart-item-info">
              <img
                src={item.product.image[0]}
                alt={item.product.name}
                className="product-cart-image"
              />
              <div className="product-details-cart">
                <p className="cart-product-name">{item.product.name}</p>
                <div className="product-price-size">
                  <p className="cart-product-price">
                    {currency}{item.product.price}
                  </p>
                  <p className="size">{item.size}</p>
                </div>
              </div>
            </div>
            <input
              type="number"
              className="quantity-input"
              min={1}
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item._id, item.size, e.target.value)}
            />
            <MdDelete
              className="delete-icon"
              onClick={() => handleDeleteItem(item._id, item.size)}
            />
          </div>
        ))}
      </div>
      <div className="checkout-container">
        <div className="checkout-box">
          <CartTotal />
          <div className="checkout-button-container">
            <button onClick={() => navigate('/checkout')} className="checkout-button">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;