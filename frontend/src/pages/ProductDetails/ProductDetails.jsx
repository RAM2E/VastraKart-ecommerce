import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { useParams } from 'react-router-dom';
import './ProductDetails.css'
import RelatedProduct from '../../components/RelatedProduct/RelatedProduct';
const ProductDetails = () => {
  const { products, currency,addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(false); // Changed to null for proper conditional checks
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ?(
    <div>
      <div className="product-container">
        <div className="product-content">
          <div className="product-images">
            <div className="thumbnail-container">
              {productData.image.map((item,index)=> (
                <img onClick={() => setImage(item)} src={item} key ={ index} className='thumbnail'/>
              ))}
            </div>
            <div className="main-image-container">
              <img src={image} alt="" className='main-image' />
            </div>
          </div>
          <div className="product-info">
            <h1 className="product-name">{productData.name}</h1>
            <hr className='product-divider'/>
            <p className="product-price">{currency}{productData.price}</p>
            <p className="product-description">{productData.description}</p>
            <div className="size-selector">
              <p>Select Size</p>
              <div className="size-buttons">
                {productData.sizes.map((item,index)=>(
                  <button key={index} onClick={()=> setSize(item)} className={`size-button ${item === size ? 'active-size':''}`}>{item}</button>
                ))}
              </div>
            </div>
            <hr className='product-divider'/>
            <div className="product-policy">
              <p>Free Delivery</p>
              <p>Seamless and Secure Payment</p>
              <p>Several payment options available</p>
            </div>
            <button onClick={()=> addToCart(productData._id,size)} className='add-to-cart-btn'>ADD TO CART</button>
          </div>
        </div>
        <div className="description-review-sect">
          <div className="tabs">
            <b className="tab active">Description</b>
            <p className='tab'>Reviews</p>
          </div>
          <div className="description-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <RelatedProduct category={productData.category}/>
      </div>
       
    </div>
  ) : <div>No product is found with that product id</div>
}

export default ProductDetails;
