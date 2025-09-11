import React from "react";
import "./PCbuild.css"
import FooterImage from "./Footer.jpg"
import { Link } from "react-router-dom";
//import PCbuild_Select from "./PCbuild_Select";

import { useEffect, useState } from "react";
import axios from "axios";
function PCbuild(){

    //-------------
    const [budget, setBudget] = useState("");
    const [usage, setUsage] = useState("");
    const [preferences, setPreferences] = useState("");
    const [result, setResult] = useState("");
  //-----------------
    
    const [cart_status, setCartStatus] = useState("");



  ///---------------


    
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    
    

    useEffect(() => {
    axios.get("https://bbuildmypc.onrender.com/getSelectedproducts/")
        .then((response) => {
            const productList = response.data;
            setProducts(productList);

            const total = productList.reduce((sum, product) => {
                // Clean string if needed and parse safely
                const price = parseFloat(String(product.original_price).replace(/[₹,]/g, '')) || 0;
                return sum + price;
            }, 0);

            setTotalPrice(total);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
}, []);


    const handleRemove = (productType) => {
  axios
    .delete("https://bbuildmypc.onrender.com/removeSelectedItem/",{data: { type: productType }})
    .then((response) => {
      if (response.data) {
        setProducts(prev => prev.filter(p => p.type !== productType));
        setTotalPrice(prev => {
          const removedProduct = products.find(p => p.type === productType);
          const price = parseFloat(String(removedProduct.original_price).replace(/[₹,]/g, '')) || 0;
          return prev - price;
        });
      } else {
        alert(response.data.message);
      }
    })
    .catch((error) => {
      console.error("Error removing product:", error);
    });
};

    
    
    const handleSend = async (action) => {
  try {
    const res = await axios.post("https://bbuildmypc.onrender.com/addToCart/", {
      status_msg: action,
    });
    setCartStatus(res.data);   // Show status message           // Show toast

    // Wait a bit before refreshing (optional: gives time to show toast)
    
    window.location.reload();          // Refresh the page
    

  } catch (err) {
    setCartStatus("Something went wrong.");

    setTimeout(() => {
      window.location.reload();
    }, 1000); // refresh even on error
  }
};




    


    return(
        <>
        <div style={{backgroundColor:"black",height:"30px",width:"100%",fontSize:"30px",color:"white",textAlign:"center",fontWeight:"bold"}}></div>
        <div className="PCbuild-div">
            <div className="PCbuild-internal">
                <h1>build your PC online | Customize your PC</h1>
                <p>Welcome to Ankit Infotech – PC Studio, your trusted destination for PC builds and customization. With a rich legacy of 25 years in the computer and gaming peripheral market, we offer you the expertise and resources to create your perfect PC. Our user-friendly online platform allows you to unleash your creativity and build your own PC from the scratch starting from Processor, Motherboard, Graphics Card etc. Choose from a wide range of high-quality components, including processors, motherboards, graphics cards, and monitors. Customize every aspect of your PC build with ease, and enjoy the convenience of instant quotations. Experience the joy of personalized computing with Ankit Infotech – PC Studio, where PC building meets limitless possibilities.</p>
                <div className="content-div">
                     
                    <div className="order_div">
                        <h3 style={{paddingRight:"100px",fontSize:"20px"}}>Total : ₹ {totalPrice.toLocaleString()}</h3>
                        <Link to="Shoping_cart/"><button onClick={()=>{handleSend("ADD")}}  className="Add_to_cart_button" >Add to cart</button></Link><br></br><br></br>
                        <button onClick={()=>{handleSend("REMOVE")}} className="Remove_all_button" >Remove all</button><br></br><br></br>
                        <div style={{color:"green"}}>{cart_status}</div>
                    </div>
                    <div className="content-items">
                        <h4>Select Processor</h4>
                            {products.filter(p => p.type === "Processor").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "Processor").length === 0 && (
                                <p style={{ color: "gray" }}>No Processor selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/processor-caticon.svg" alt="processor_LOGO" />
                            <Link to="/click" state={{ category: "Processor" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "Processor").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>

                    <br></br>
                    
                    <div className="content-items">
                        <h4>Select Motherboard</h4>
                            {products.filter(p => p.type === "Motherboard").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "Motherboard").length === 0 && (
                                <p style={{ color: "gray" }}>No Motherboard selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/motherboard-caticon.svg" alt="motherboard_LOGO" />
                            <Link to="/click" state={{ category: "Motherboard" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "Motherboard").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>
                    
                    <br></br>
                    <div className="content-items">
                        <h4>Select RAM</h4>
                            {products.filter(p => p.type === "MEMORY / RAM").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "MEMORY / RAM").length === 0 && (
                                <p style={{ color: "gray" }}>No MEMORY / RAM selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/ram-caticon.svg" alt="MEMORY / RAM" />
                            <Link to="/click" state={{ category: "MEMORY / RAM" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "MEMORY / RAM").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                            
                    </div>
                    
                    <br></br>

                    <div className="content-items">
                        <h4>Select storage 1</h4>
                            {products.filter(p => p.type === "SSD").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "SSD").length === 0 && (
                                <p style={{ color: "gray" }}>No SSD selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/storage-caticon.svg" alt="SSD" />
                            <Link to="/click" state={{ category: "SSD" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "SSD").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>
                    
                    <br></br>

                    <div className="content-items">
                        <h4>Select storage 2</h4>
                            {products.filter(p => p.type === "SSD").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "SSD").length === 0 && (
                                <p style={{ color: "gray" }}>No SSD selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/storage-caticon.svg" alt="SSD" />
                            <Link to="/click" state={{ category: "SSD" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "SSD").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>
                    <br></br>

                    <div className="content-items">
                        <h4>Select cabinet</h4>
                            {products.filter(p => p.type === "PC Cabinets").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "PC Cabinets").length === 0 && (
                                <p style={{ color: "gray" }}>No PC Cabinets selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/cabinets-caticon.svg" alt="PC Cabinets" />
                            <Link to="/click" state={{ category: "PC Cabinets" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "PC Cabinets").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>
                    
                    <br></br>

                    <div className="content-items">
                        <h4>Select Cabinet Fan</h4>
                            {products.filter(p => p.type === "Cabinet Fan").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "Cabinet Fan").length === 0 && (
                                <p style={{ color: "gray" }}>No Cabinet Fan selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/cabinetfan-caticon.svg" alt="Cabinet Fan" />
                            <Link to="/click" state={{ category: "Cabinet Fan" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "Cabinet Fan").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>

                    
                    <br></br>

                    <div className="content-items">
                        <h4>Select Cooler</h4>
                            {products.filter(p => p.type === "CPU Cooler").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "CPU Cooler").length === 0 && (
                                <p style={{ color: "gray" }}>No CPU Cooler selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/cooler-caticon.svg" alt="CPU Cooler" />
                            <Link to="/click" state={{ category: "CPU Cooler" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "CPU Cooler").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>

                    
                    <br></br>

                    <div className="content-items">
                        <h4>Select Graphics Card</h4>
                            {products.filter(p => p.type === "Graphics Card").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "Graphics Card").length === 0 && (
                                <p style={{ color: "gray" }}>No Graphics Card selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/graphiccard-caticon.svg" alt="Graphics Card" />
                            <Link to="/click" state={{ category: "Graphics Card" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "Graphics Card").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>

                    <br></br>

                    <div className="content-items">
                        <h4>Select Power Supply Unit</h4>
                            {products.filter(p => p.type === "Power Supply").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "Power Supply").length === 0 && (
                                <p style={{ color: "gray" }}>No Power Supply selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/powersupply-caticon.svg" alt="Power Supply" />
                            <Link to="/click" state={{ category: "Power Supply" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "Power Supply").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>
                   
                    <br></br>
                    <div className="content-items">
                        <h4>Select Monitor</h4>
                            {products.filter(p => p.type === "Monitor").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "Monitor").length === 0 && (
                                <p style={{ color: "gray" }}>No Monitor selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/monitor-caticon.svg" alt="Monitor" />
                            <Link to="/click" state={{ category: "Monitor" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "Monitor").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>
                    
                    <br></br>

                    <div className="content-items">
                        <h4>Select Keyboard</h4>
                            {products.filter(p => p.type === "Keyboard").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "Keyboard").length === 0 && (
                                <p style={{ color: "gray" }}>No Keyboard selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/keyboard-caticon.svg" alt="Keyboard" />
                            <Link to="/click" state={{ category: "Keyboard" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "Keyboard").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>
                    
                    <br></br>

                <div className="content-items">
                        <h4>Select Mouse</h4>
                            {products.filter(p => p.type === "Mouse").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "Mouse").length === 0 && (
                                <p style={{ color: "gray" }}>No Mouse selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/mouse-caticon.svg" alt="Mouse" />
                            <Link to="/click" state={{ category: "Mouse" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "Mouse").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>
                    
                    <br></br>

                <div className="content-items">
                        <h4>Select Accessories</h4>
                            {products.filter(p => p.type === "Accessories").map((product, index) => (
                                <div key={index} className="selected_product">
                                    <img className="select_product_image" src={product.image_url} alt="img" />
                                    <p style={{ width: "500px" }}>{product.title}</p>
                                    <p style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>Price: {product.original_price}</p>
                                </div>
                            ))}
                            {Array.isArray(products) && products.filter(p => p.type === "Accessories").length === 0 && (
                                <p style={{ color: "gray" }}>No Accessories selected yet</p>
                            )}
                            <img className="content-image" src="https://www.pcstudio.in/wp-content/uploads/2021/04/gaminglaptop-caticon.svg" alt="Accessories" />
                            <Link to="/click" state={{ category: "Accessories" }}>
                                <button className="content-button">Select</button>
                            </Link>
                            {products.filter(p => p.type === "Accessories").map((product, index) => (
                            <button  className="content-button" key={`remove-${index}`} onClick={() => handleRemove(product.type)}  style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} >Remove</button>))}
                    </div>
                    <br></br>
                </div>
            </div>
        </div>
        <div className="PCbuild-footer">
            <img className="Footer_image" src={FooterImage} alt="FOOTER"></img>
        </div>
        <div>
        </div>
        </>
        
    )
}
export default PCbuild;
