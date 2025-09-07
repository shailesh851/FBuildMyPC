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

     useEffect(() => {
        axios.get("https://buildmypcbackend-6.onrender.com/api/products/")
        .then((response) => {
        const filteredProducts = response.data.products.filter(
          (item) => item.type === category);
        setProducts(filteredProducts);
        })
        .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

        

        function handlePick(product) {
            navigate("/", { state: { url: product.image_url ,title:product.title,type:product.type,price:product.original_price } });
            axios.post("https://buildmypcbackend-6.onrender.com/api/selected-parts/", {
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

        return(
            <>
            <div style={{backgroundColor:"black",height:"60px",width:"100%",fontSize:"30px",color:"white",textAlign:"center",fontWeight:"bold",justifyContent:"center",display:"flex"}}>{category}s</div>
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
                                    <img className="PCbuild_Select_items_images" src={product.image_url} style={{border:"2px solid black",height:"180px",width:"180px"}}alt=""/>
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
