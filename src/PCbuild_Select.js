import React from "react";
import "./PCbuild_Select.css"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PCbuild from "./PCbuild";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function PCbuild_Select() {
    const location = useLocation();
    const category = location?.state?.category || "No category selected";
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        axios.get("http://localhost:4000/products/",{ withCredentials: true})
        .then((response) => {
        const filteredProducts = response.data.filter(
          (item) => item.type === category);
        setProducts(filteredProducts);
        setLoading(false);
        })
        .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

        

        function handlePick(product) {
            navigate("/", { state: { url: product.image_url ,title:product.title,type:product.type,price:product.original_price } });
            axios.post("http://localhost:4000/productSelected/", {
                title: product.title,
                image_url: product.image_url,
                brand:product.brand,
                type: product.type,
                original_price: product.original_price,
                discounted_price: product.discounted_price
            },{ withCredentials: true})
            .then(response => {
              if(response.data.status=="redirect"){
                navigate("/signup")
              }
                console.log("Saved :", response.data);
            })
            .catch(error => {
                console.error("Failed to send data:", error);
            });
        }
 if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "200px" }}>
        <div style={{
          border: "6px solid #f3f3f3",
          borderTop: "6px solid #4a2ff7",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          margin: "0 auto 10px",
          animation: "spin 1s linear infinite"
        }} />
        <p>Loading products...</p>
      </div>
    );
  }

        return(
            <>
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search_box"
/>

            <div className="PCbuild_Select_div">
                    
                    
                            {products.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                                <>
                                <div className="PCbuild_Select_items">
                                    <img width="80" height="80" className="PCbuild_Select_items_images" src={product.image_url} alt=""/>
                                    <p className="PCbuild_Select_items_title">{product.title}</p>
                                    <div className="PCbuild_Select_items_inner" >
                                        <p>{product.original_price}</p>
                                        <button onClick={() => handlePick(product)} className="items_pick_button">Click to Pick</button>

                                        
                                    </div>
                                </div>
                                </>
                                ))}
                                
        
            </div>
            
            </>
        )
}
    




export default PCbuild_Select;
