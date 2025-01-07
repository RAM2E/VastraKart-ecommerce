import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

const RelatedProduct = ({ category }) => {
  const { products, currency } = useContext(ShopContext); // Added currency
  const [RelatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    // Filter related products based on the category
    const related = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    setRelatedProduct(related.slice(0, 4));
  }, [category, products]); // Recalculate when products or category change

  return (
    <div>
      <div className="product-container">
        <div className="list_header">
          <h1>Related Product</h1>
          <hr className="divider" />
        </div>
        <div className="product-grid">
          {RelatedProduct.length > 0 ? (
            RelatedProduct.map((product) => (
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

export default RelatedProduct;
