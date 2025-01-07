
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import CartTotal from '../../components/CartTotal/CartTotal';
import { MdDelete } from 'react-icons/md';
import './Cart.css'
import { useNavigate } from 'react-router-dom';
const Cart = () => {

  const navigate = useNavigate();
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length === 0) return;

    if (!cartItems || typeof cartItems !== 'object') {
      setCartData([]);
      return;
    }

    const tempData = Object.entries(cartItems).flatMap(([itemId, sizes]) =>
      Object.entries(sizes)
        .filter(([, quantity]) => quantity > 0)
        .map(([size, quantity]) => ({
          _id: itemId,
          size,
          quantity,
        }))
    );
    setCartData(tempData);
  }, [cartItems, products]);

  const proceedToCheckout = () => { 
    navigate('/checkout'); 
  }

  return (
    <div>
      <div className="cart-content-container">
        {cartData.length === 0 ? (
          <div className="empty-cart-message">Your cart is empty.</div>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return;

            return (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  <img
                    src={productData.image[0]}
                    alt={productData.name}
                    className="product-cart-image"
                  />
                  <div className="product-details-cart">
                    <p className="cart-product-name">{productData.name}</p>
                    <div className="product-price-size">
                      <p className='cart-product-price'>
                        {currency}
                        {productData.price}
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
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value > 0) updateQuantity(item._id, item.size, value);
                  }}
                />
                <MdDelete
                  className="delete-icon"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            );
          })
        )}
      </div>
      <div className="checkout-container">
        <div className="checkout-box">
          <CartTotal />
          <div className="checkout-button-container">
            <button onClick={proceedToCheckout} className="checkout-button">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
