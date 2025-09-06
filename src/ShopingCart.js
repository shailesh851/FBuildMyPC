import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const [products1, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [shippingCharge, setShippingCharge] = useState(50); // Flat rate

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const fetchCartProducts = () => {
    axios
      .get("http://127.0.0.1:8000/cart_product_list/")
      .then((response) => {
        setProducts(response.data.products1);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleRemove = (productId) => {
    axios
      .delete(`http://127.0.0.1:8000/delete_cart_product/${productId}/`)
      .then(() => {
        setProducts(products1.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const subtotal = products1.reduce(
    (acc, item) => acc + parseFloat(item.original_price.replace(/[^0-9.]/g, "")),
    0
  );

  const totalItems = products1.length;
  const total = subtotal + shippingCharge;

  return (
    <>
      <div style={{backgroundColor:"black",height:"60px",width:"100%",fontSize:"30px",color:"white",textAlign:"center",fontWeight:"bold"}}>Shopping Cart</div>
      <div className="main_div">
        <div className="Cart_product">
          <table className="cart_product">
            <thead>
              <tr style={{ backgroundColor: "lightgray" }}>
                <th></th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products1.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      className="Select_items_images1"
                      src={product.image_url}
                      alt=""
                    />
                  </td>
                  <td>
                    <p className="Select_items_title1">{product.title}</p>
                  </td>
                  <td>
                    <p style={{color:"orange",fontSize:"20px",fontWeight:"bold"}}>{product.original_price}</p>
                  </td>
                  <td>
                    <button onClick={() => handleRemove(product.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="Cart_manage">
          <h3 style={{textAlign:"center"}}>Order Summary</h3>
          <hr ></hr>
          <div>
            <table className="Cart_manage_details" >

              <tr>
                <td>Subtotal:</td>
                <td>₹{subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Total Items:</td>
                <td>{totalItems}</td>
              </tr>
              <tr>
                <td>Shipping Charge:</td>
                <td>₹{shippingCharge+totalItems*10}</td>
              </tr>
              <tr>
                <td>Total Payable:</td>
                <td>₹{total.toFixed(2)}</td>
              </tr>

            </table>
            
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
