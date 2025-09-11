import React from "react";
import "./PC_Components.css"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PC_Components() {
  const location = useLocation();
  const category = location?.state?.category || "No category selected";
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [typer, setTyper] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Use a state to hold the products that will be rendered after filtering
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
  axios.get("https://bbuildmypc.onrender.com/products/")
    .then((response) => {
      const fetchedProducts = response.data;
      console.log("Fetched Products:", fetchedProducts); // ADD THIS
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}, []);

  // This effect runs whenever the `products`, `maxPrice`, or `typer` state changes

      function handleCart(product) {
            navigate("/Shoping_cart", { state: { url: product.image_url ,title:product.title,type:product.type,price:product.original_price } });
            axios.post("https://bbuildmypc.onrender.com/addCart/", {
                title: product.title,
                image_url: product.image_url,
                brand:product.brand,
                type: product.type,
                original_price: product.original_price,
                discounted_price: product.discounted_price
            })
            .then(response => {
                console.log("Saved to Django:", response.data);
            })
            .catch(error => {
                console.error("Failed to send data:", error);
            });
        }

  return (
    <>
    <div style={{backgroundColor:"black",height:"60px",width:"100%",fontSize:"30px",color:"white",textAlign:"center",fontWeight:"bold"}}>Pre-Build PC</div>
    <input 
      type="text"
      placeholder="Search by title..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search_box"
    />

      <div className="Outerdiv">
        <div className="Filtering">
          <div style={{ padding: "20px 40px" }}>
            <label>Max Price: ₹{maxPrice}</label>
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", marginTop: "8px" }}
            />
          </div>
          <select disabled onChange={(e) => setTyper(e.target.value)} name="branch" className="border p-2 rounded">
            <option value="">Select Branch</option>
            <option value="Processor">Processor</option>
            <option value="MEMORY / RAM">RAM</option>
            <option value="SSD">SSD</option>
            <option value="PC Cabinet">PC Cabinet</option>
            <option value="Cabinet Fan">Cabinet Fan</option>
            <option value="Cooler">Cooler</option>
            <option value="Graphics Card">Graphics Card</option>
            <option value="Power Supply">Power Supply</option>
            <option value="Monitor">Monitor</option>

          </select>
        </div>
        <div className="mainpage">
          
          {filteredProducts.filter(p => p.type === "Pre-Build PC" &&parseFloat(p.original_price.replace(/[^0-9.]/g, "")) <= parseFloat(maxPrice) && p.title.toLowerCase().includes(searchTerm.toLowerCase()) // 🔹 search filter
          ).map((product) => (
            <div key={product.id} className="PC_Components_Select_items">
              <img className="PC_Components_Select_items_images" src={product.image_url} alt="" />
              <p className="PC_Components_Select_items_title">{product.title}</p>
              <div className="PC_Components_Select_items_inner">
                <p style={{color:"red",fontSize:"20px"}}>{product.original_price}</p>
                <button onClick={() => handleCart(product)}  className="add_to_cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PC_Components;