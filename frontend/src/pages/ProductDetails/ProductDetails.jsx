// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../../context/ShopContext';
// import { useParams } from 'react-router-dom';
// import './ProductDetails.css'
// import RelatedProduct from '../../components/RelatedProduct/RelatedProduct';
// const ProductDetails = () => {
//   const { products, currency,addToCart } = useContext(ShopContext);
//   const { productId } = useParams();
//   const [productData, setProductData] = useState(false); // Changed to null for proper conditional checks
//   const [image, setImage] = useState('');
//   const [size, setSize] = useState('');

//   const fetchProductData = () => {
//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item);
//         setImage(item.image[0]);
//       }
//     });
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products]);

//   return productData ?(
//     <div>
//       <div className="product-container">
//         <div className="product-content">
//           <div className="product-images">
//             <div className="thumbnail-container">
//               {productData.image.map((item,index)=> (
//                 <img onClick={() => setImage(item)} src={item} key ={ index} className='thumbnail'/>
//               ))}
//             </div>
//             <div className="main-image-container">
//               <img src={image} alt="" className='main-image' />
//             </div>
//           </div>
//           <div className="product-info">
//             <h1 className="product-name">{productData.name}</h1>
//             <hr className='product-divider'/>
//             <p className="product-price">{currency}{productData.price}</p>
//             <p className="product-description">{productData.description}</p>
//             <div className="size-selector">
//               <p>Select Size</p>
//               <div className="size-buttons">
//                 {productData.sizes.map((item,index)=>(
//                   <button key={index} onClick={()=> setSize(item)} className={`size-button ${item === size ? 'active-size':''}`}>{item}</button>
//                 ))}
//               </div>
//             </div>
//             <hr className='product-divider'/>
//             <div className="product-policy">
//               <p>Free Delivery</p>
//               <p>Seamless and Secure Payment</p>
//               <p>Several payment options available</p>
//             </div>
//             <button onClick={()=> addToCart(productData._id,size)} className='add-to-cart-btn'>ADD TO CART</button>
//           </div>
//         </div>
//         <div className="description-review-sect">
//           <div className="tabs">
//             <b className="tab active">Description</b>
//             <p className='tab'>Reviews</p>
//           </div>
//           <div className="description-content">
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </p>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </p>
//           </div>
//         </div>
//         <RelatedProduct category={productData.category}/>
//       </div>
       
//     </div>
//   ) : <div>No product is found with that product id</div>
// }

// export default ProductDetails;


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProductDetails.css';
import RelatedProduct from '../../components/RelatedProduct/RelatedProduct';

const ProductDetails = () => {
  const { products = [], currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // const fetchProductData = () => {
  //   setIsLoading(true);
  //   try {
  //     if (!products?.length || !productId) {
  //       throw new Error('Product data unavailable');
  //     }

  //     const foundProduct = products.find(item => 
  //       String(item._id) === String(productId)
  //     );

  //     if (foundProduct) {
  //       setProductData(foundProduct);
  //       setImage(foundProduct.image[0]);
  //     } else {
  //       throw new Error('Product not found');
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchProductData = () => {
    setIsLoading(true);
    try {
        if (!products?.length || !productId) {
            console.log('Products or ID missing:', { products, productId });
            throw new Error('Product data unavailable');
        }

        console.log('Searching for product:', {
            products: products.map(p => p._id),
            productId,
            productIdType: typeof productId
        });

        const foundProduct = products.find(item => 
            String(item._id).trim() === String(productId).trim()
        );

        if (foundProduct) {
            console.log('Product found:', foundProduct);
            setProductData(foundProduct);
            setImage(foundProduct.image[0]);
        } else {
            console.log('No product found with ID:', productId);
            throw new Error('Product not found');
        }
    } catch (error) {
        console.error('Error finding product:', error);
        toast.error(error.message);
    } finally {
        setIsLoading(false);
    }
};


  // In ProductDetails.js
const handleAddToCart = () => {
  if (!size) {
    toast.warning('Please select a size');
    return;
  }
  addToCart(String(productData._id), size); // Ensure ID is string
};

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (isLoading) {
    return <div className="loading-container">Loading product details...</div>;
  }

  if (!productData) {
    return <div className="error-container">Product not found</div>;
  }

  return (
    <div>
      <div className="product-container">
        <div className="product-content">
          <div className="product-images">
            <div className="thumbnail-container">
              {productData.image.map((item, index) => (
                <img 
                  onClick={() => setImage(item)} 
                  src={item} 
                  key={index} 
                  className={`thumbnail ${image === item ? 'active' : ''}`}
                  alt={`${productData.name} view ${index + 1}`}
                />
              ))}
            </div>
            <div className="main-image-container">
              <img 
                src={image} 
                alt={productData.name} 
                className="main-image" 
              />
            </div>
          </div>
          <div className="product-info">
            <h1 className="product-name">{productData.name}</h1>
            <hr className="product-divider"/>
            <p className="product-price">{currency}{productData.price}</p>
            <p className="product-description">{productData.description}</p>
            <div className="size-selector">
              <p>Select Size</p>
              <div className="size-buttons">
                {productData.sizes.map((item, index) => (
                  <button 
                    key={index} 
                    onClick={() => setSize(item)} 
                    className={`size-button ${item === size ? 'active-size' : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <hr className="product-divider"/>
            <div className="product-policy">
              <p>Free Delivery</p>
              <p>Seamless and Secure Payment</p>
              <p>Several payment options available</p>
            </div>
            <button 
              onClick={handleAddToCart} 
              className="add-to-cart-btn"
              disabled={!size}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="description-review-sect">
          <div className="tabs">
            <b className="tab active">Description</b>
            <p className="tab">Reviews</p>
          </div>
          <div className="description-content">
            <p>{productData.description}</p>
          </div>
        </div>
        <RelatedProduct category={productData.category}/>
      </div>
    </div>
  );
};

export default ProductDetails;