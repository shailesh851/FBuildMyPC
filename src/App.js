// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./navbar";
import PCbuild from "./PCbuild";
import SelectProcessor from "./PCbuild_Processor";
import PCbuild_Select from "./PCbuild_Select";
import Pre_Build_PC from "./Pre_Build_PC";
import PC_Components from "./PC_Components"
import AI_powered_bot from "./AI_powered_bot"
import ShoppingCart from "./ShopingCart";
import PC_Peripherals from "./PC_Peripherals";
function App() {
  return (
  
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<PCbuild />} />
        <Route path="/Pre_Build_PC" element={<Pre_Build_PC />} />
        <Route path="/PC_Components" element={<PC_Components />} />
        <Route path="/click" element={<PCbuild_Select />} />
        <Route path="/chatbot" element={<AI_powered_bot/>} />
        <Route path="/Shoping_cart" element={<ShoppingCart/>} />
        <Route path="/Peripherals" element={<PC_Peripherals/>} />
      </Routes>
    </Router>
  
  );
}

export default App;
