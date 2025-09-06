import React from "react";
import {Link } from "react-router-dom";
import App from "./HomePage"
import LOGO from "./BuildMyPClogo.png"
import "./navbar.css";
import PCbuild from "./PCbuild"
import { FaShoppingCart } from "react-icons/fa"; 

function Navbar(){
    return(
        <>
        <div className="navbar-div">
            <img src={LOGO} className="navbar-Logo"/>
            
                <div className='main-route'>
                    
                    <ul>

                        <li><Link to="/">PC Build</Link></li>
                        <li><Link to="/Pre_Build_PC">Pre-Build PC</Link></li>
                        <li><Link to="/PC_Components">PC Components</Link></li>
                        <li><Link to="/Peripherals">PC Peripherals</Link></li>
                        <li><Link to="/chatbot">AI Powered Bot</Link></li>
                        <li>
                        <Link to="/Shoping_cart" className="cart-link">
                            <FaShoppingCart size={20} style={{ marginRight: "5px" }} />
                            
                        </Link>
            </li>
                    </ul>
                </div>
                {/* <Routes>
                    <Route path="/d" element={<PCbuild/>}/>
                    <Route path="/contact" element={<App/>}/>
                    <Route path="/shop" element={<App/>}/>
                    <Route path="*" element={<App/>}/>
                </Routes> */}
            
        </div>
        </>
    )
}
export default Navbar;