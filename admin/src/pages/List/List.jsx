// import React, { useEffect, useState } from "react";
// import { backendUrl, currency } from "../../App";
// import { toast } from "react-toastify";
// import { MdDeleteForever } from "react-icons/md";
// import axios from "axios";
// import './List.css'

// const List = ({ token }) => {
//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/api/product/list", {
//         headers: { token },
//       });
//       if (response.data.success) {
//         setList(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const removeProduct = async (_id) => {
//     try {
//       const response = await axios.post(
//         backendUrl + "/api/product/remove",
//         { _id },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         console.log(response.data.message);

//         await fetchList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect((e) => {
//     fetchList();
//   }, []);

//   return (
//     <div>
//       <p className="product-title">Product List</p>
//       <div className="product-list-container">
//         <div className="product-table-title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className="action-title">Action</b>
//         </div>
//         {/* Product list */}
//         {list.map((item, index) => (
//           <div className="product-row" key={index}>
//             <img className="product-image" src={item.image[0]} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>
//               {currency}
//               {item.price}
//             </p>
//             <MdDeleteForever
//               onClick={() => removeProduct(item._id)}
//               className="product-action"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default List;

// import React, { useEffect, useState } from "react";
// import { backendUrl, currency } from "../../App";
// import { toast } from "react-toastify";
// import { MdDeleteForever } from "react-icons/md";
// import axios from "axios";
// import './List.css'

// const List = () => {
//   const [list, setList] = useState([]);
//   const token = localStorage.getItem('token');

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/api/product/list`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         // Check data structure from API response
//         console.log("API Response:", response.data);
//         const products = response.data.data || [];
//         setList(products);
//       } else {
//         toast.error(response.data.message || "Failed to fetch products");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       toast.error(error.response?.data?.message || "Error fetching products");
//     }
//   };

//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/product/remove`,
//         { _id: id },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       if (response.data.success) {
//         toast.success("Product deleted successfully");
//         fetchList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error deleting product");
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchList();
//     }
//   }, []);

//   return (
//     <div>
//       <p className="product-title">Product List</p>
//       <div className="product-list-container">
//         <div className="product-table-title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className="action-title">Action</b>
//         </div>
        
//         {Array.isArray(list) && list.length > 0 ? (
//           list.map((item) => (
//             <div className="product-row" key={item._id}>
//               <img 
//                 className="product-image" 
//                 src={item.image?.[0]} 
//                 alt={item.name}
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = '/placeholder-image.jpg';
//                 }}
//               />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{currency}{item.price}</p>
//               <MdDeleteForever
//                 onClick={() => removeProduct(item._id)}
//                 className="product-action"
//               />
//             </div>
//           ))
//         ) : (
//           <div className="no-products">
//             <p>No products found</p>
//             <button onClick={fetchList}>Refresh List</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default List;


import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../../App";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import './List.css'

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const products = response.data.data || [];
        setList(products);
      } else {
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.response?.data?.message || "Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { _id: id }, // Changed from _id to id to match backend
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success("Product deleted successfully");
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Admin access required");
      } else {
        toast.error(error.response?.data?.message || "Error deleting product");
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchList();
    }
  }, [token]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div>
      <p className="product-title">Product List</p>
      <div className="product-list-container">
        <div className="product-table-title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="action-title">Action</b>
        </div>
        
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item) => (
            <div className="product-row" key={item._id}> {/* Changed from _id to id */}
              <img 
                className="product-image" 
                src={item.image?.[0]} 
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <MdDeleteForever
                onClick={() => removeProduct(item._id)} 
                className="product-action"
              />
            </div>
          ))
        ) : (
          <div className="no-products">
            <p>No products found</p>
            <button onClick={fetchList}>Refresh List</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;