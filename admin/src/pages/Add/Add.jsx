import React, { useState, useEffect } from "react";
import upload_img from "../../assets/upload_img.png";
import "./Add.css";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setBestSeller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Clean up object URLs to prevent memory leaks
    return () => {
      [image1, image2, image3, image4].forEach((image) => {
        if (image) URL.revokeObjectURL(image.preview);
      });
    };
  }, [image1, image2, image3, image4]);

  return (
    <form onSubmit={onSubmitHandler} className="form-container">
      <div>
        <p className="form-label">Upload Images</p>
        <div className="image-upload-container">
          {[image1, image2, image3, image4].map((image, index) => (
            <label htmlFor={`image${index + 1}`} key={index}>
              <img
                src={!image ? upload_img : URL.createObjectURL(image)}
                alt=""
                className="upload-preview"
              />
              <input
                onChange={(e) => {
                  if (index === 0) setImage1(e.target.files[0]);
                  if (index === 1) setImage2(e.target.files[0]);
                  if (index === 2) setImage3(e.target.files[0]);
                  if (index === 3) setImage4(e.target.files[0]);
                }}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <p className="form-label">Product name</p>
        <input
          type="text"
          placeholder="Enter product name"
          className="form-input"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <p className="form-label">Product description</p>
        <textarea
          placeholder="Type product description"
          className="form-input"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group-horizontal">
        <div>
          <p className="form-label">Product category</p>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="form-label">Product Price</p>
          <input
            type="number"
            className="form-input price-input"
            placeholder="30"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div>
        <p className="form-label">Product Sizes</p>
        <div className="size-options">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
              className={`size-option ${
                sizes.includes(size) ? "selected" : ""
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
      <div className="checkbox-group">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
          type="checkbox"
          id="bestseller"
          className="check"
        />
        <label htmlFor="bestseller">Add to bestseller</label>
      </div>
      <button type="submit" className="submit-button">
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
