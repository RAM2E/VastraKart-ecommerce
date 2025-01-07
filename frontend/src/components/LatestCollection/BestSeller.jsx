import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

const BestSeller = () => {
  const { products, currency } = useContext(ShopContext); // Include currency from context
  const [bestseller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 4));
  }, [products]);

  return (
    <div>
      <div className="product-container">
        <div className="list_header">
          <h1>Best Collection</h1>
          <hr className="divider" />
        </div>
        <div className="product-grid">
          {bestseller.length > 0 ? (
            bestseller.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="product-image">
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image[0]} alt={product.name} />
                  </Link>
                </div>
                <h3>{product.name}</h3>
                <p>
                  {currency}
                  {product.price}
                </p>
              </div>
            ))
          ) : (
            <p>No product is found in this category</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
