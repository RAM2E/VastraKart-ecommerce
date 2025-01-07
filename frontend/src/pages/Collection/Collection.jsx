import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import women_wear from '../../assets/women-banner.png';
import men_wear from '../../assets/men-wear.png';
import kid_wear from '../../assets/kid-banner.png';

const Collection = () => {
  const { products, currency ,searchTerm} = useContext(ShopContext); // Include currency
  const { category } = useParams();

  const filteredProduct = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
    && product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const bannerImages = {
    Men: men_wear,
    Women: women_wear, 
    Kids: kid_wear,
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="banner">
        {bannerImages[category] ? (
          <img src={bannerImages[category]} alt="banner-img" />
        ) : (
          <p>No image matches the category</p>
        )}
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProduct.length > 0 ? (
          filteredProduct.map((product) => (
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
  );
};

export default Collection;
