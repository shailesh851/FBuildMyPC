import React from "react";
import "./PCbuild.css"
import FooterImage from "./Footer.jpg"
import { Link } from "react-router-dom";
//import PCbuild_Select from "./PCbuild_Select";

import { useEffect, useState } from "react";
import axios from "axios";
function PCbuild(){

    //-------------
  
   

  //-----------------
    
    const [cart_status, setCartStatus] = useState("");



  ///---------------


    
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    


    useEffect(() => {
    axios.get("http://localhost:4000/getSelectedproducts/")
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
}, [products]);


    const handleRemove = (productType) => {
  axios
    .delete("http://localhost:4000/removeSelectedItem/",{data: { type: productType }})
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
      console.error("Errorr removing product:", error);
    });
};

    
    
    const handleSend = async (action) => {
  try {
    const res = await axios.post("http://localhost:4000/addToCart/", {
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
        

        <div className="PCbuild-div">
            <div className="PCbuild-internal">
                <h1>build your PC online | Customize your PC</h1>
                <p className="buildPCParagraph">Welcome to BuildMyPC, a smart and interactive platform crafted by Shailesh Kushwah to revolutionize the way users create their own computers. With BuildMyPC, you can easily design and customize your dream PC from scratch—choosing processors, motherboards, graphics cards, and high-performance gaming components with just a few clicks. The platform is powered by an intelligent AI chatbot that guides you throughout the process, making PC building simpler and more accessible than ever. You can seamlessly add components to your cart, compare options, and generate instant quotations to match your budget. BuildMyPC is not just a tool—it’s your personal PC studio where technology meets creativity, helping you bring your ultimate setup to life.</p>
                <h3 style={{color:"gray",marginLeft:"15px"}}>made by - Shailesh</h3>
                <div className="content-div">
                    <div className="order_div">
                        <div className="BuildPCTotal" >Total : ₹ {totalPrice.toLocaleString()}</div>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}> {product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>{product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>{product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>{product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>{product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}> {product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>{product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}> {product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}> {product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>{product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>{product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>{product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>{product.original_price}</p>
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
                                    <p className="selectedProductsPrice" style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>{product.original_price}</p>
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
