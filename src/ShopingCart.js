import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShoppingCart.css";
import { useNavigate } from "react-router-dom";


const ShoppingCart = () => {
  const [products1, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [shippingCharge, setShippingCharge] = useState(50); // Flat rate
  const [orderAddress,setOderAddress]=useState("Proceed")
  const [open , setOpen]=useState(true)
  const [logincheck,setlogincheck]=useState(true)
  const navigate = useNavigate();
  const [cartTotal,setCartTotal]=useState(0)
  const [paymentMethod,setPaymentMethod]=useState(false)
  const [color,setColor]=useState("blue")
  const [color1,setColor1]=useState("red")
  const [visibilityTimer,setVisibilityTimer]=useState(true)

  useEffect(() => {
    fetchCartProducts();
  }, [products1]);



  const fetchCartProducts = () => {
    axios
      .get("http://localhost:4000/getCartproducts/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

const handleRemove = (productId) => {
  axios
    .delete("http://localhost:4000/removeCart", { data: { _id: productId } })
    .then(() => {
      setProducts(products1.filter((product) => product._id !== productId));
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
    });
};


  const subtotal = products1.reduce((acc, item) => {
  const price = parseFloat(item.original_price?.replace(/[^0-9.]/g, "")) || 0;
  return acc + price;
}, 0);


  const totalItems = products1.length;
  const total = subtotal + shippingCharge+(totalItems*10);

  function addressManage(e){
    e.preventDefault();
    setTimeout(()=>{
      setAddress("")
    },5000)
    if(orderAddress==="Proceed"){
      axios.get("http://localhost:4000/logincheck",{ withCredentials: true })
      .then(res=>{
        
        if (!res.data.status&&res.data.redirect) {
          navigate(res.data.redirect);
        }
        else{
          if(res.data.message==="filled"){
            setOderAddress("Update")
            setOpen(false)
          }
          else if(res.data.message==="notfilled"){
            setOderAddress("Save")
            setOpen(false)
          }
        }
      })
      .catch(console.error("error"))
      setOderAddress("Update")
      setOpen(false)
    }
  
    else if(orderAddress==="Save"||orderAddress==="Update"){
      
        axios.post("http://localhost:4000/addressSave",formData,{ withCredentials: true })
        .then(res=>{
            setAddress(res.data.message)
            if(res.data.message==="Address saved successfully!"){
              setTimeout(() => window.location.reload(), 1000);
              setColor1("green")
              setOderAddress("Place Order")
              setOpen(true)
            }
        })
        .catch(console.error("error"))
        
        
    }else if(orderAddress==="Place Order"){
      if (paymentMethod===true){
        setOderAddress("Order Placed successfully")
        setColor("green")
      }
      else{
        alert("Please Select Payment Method")

      }
      
      
    }
    
      
  }

  function addressManageSkip(e){
      if(orderAddress==="Update"){
        setOderAddress("Place Order")
        setOpen(true)
      }
      else{
        setOderAddress("Proceed")
        setOpen(true)
      }
      
  }

  function paymentOption(e){

    if(e.target.value==="check"){
      setPaymentMethod(true)
    }
    
  }
  

  

  const [formData, setFormData] = useState({
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };




    



  return (
    <>
      <div style={{backgroundColor:"black",height:"30px",width:"100%",fontSize:"20px",color:"white",textAlign:"center",fontWeight:"bold"}}>Shopping Cart</div>
      <div className="main_div1">
        <div  className="Cart_product">
          <table className="cart_product">
            <thead>
              <tr style={{backgroundColor: "lightgray" }}>
                <th></th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products1.map((product) => (
                <tr key={product._id}>
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
                    <p className="select_items_price" >{product.original_price}</p>
                  </td>
                  <td>
                    <button className="cart_remove_button" onClick={() => handleRemove(product._id)}>
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
            <input onClick={paymentOption} value="check"  type="radio"/><label style={{fontWeight:"bold",marginLeft:"4px"}}>Cash on Delivery</label>
            <div style={{height:open?"0px":"200px",contentVisibility:open?"hidden":""}} className="addressDiv">
              <form >
            <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="orderSummaryForm"
              />

              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state"
                className="orderSummaryForm"
              />

              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter your pincode"
                className="orderSummaryForm"
              />

              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="orderSummaryForm"
              />
        

        
            </form>
            </div>
          </div>
            <p  style={{color:color1,marginLeft:"30px",contentVisibility:visibilityTimer?"":"hidden"}}>{address}</p>
            <div className="cartButtons">
              <button style={{backgroundColor:color}} onClick={addressManage} type="button">{orderAddress}</button>
              <div style={{height:"30px",contentVisibility:open?"hidden":""}}><button style={{backgroundColor:"blue"}} onClick={addressManageSkip}  type="button">Skip</button></div>
            </div>
            <p style={{color:"red",marginLeft:"30px",contentVisibility:orderAddress==="Order Placed successfully"?"":"hidden"}}>Your Order has been delivered under 3 to 5 days</p>
        </div>
        
      </div>
    </>
  );
}

export default ShoppingCart;
