import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Home/Navbar";
import TransparentImage from "../components/Food/TransparentImage";
//
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
//
import { CartContext } from "../App";
import Footer from "../components/Home/Footer";

export default function Cart() {
  const [mycart, setMyCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { setCartSize } = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartData();
    setCartSize(mycart.length);
  }, [mycart.length]);

  useEffect(()=>{
    document.title = "FoodEase - cart"
  },[])

  const fetchCartData = async () => {
   try {
    const responce = await fetch("http://localhost:8080/mycart", {
      method: "GET",
    });
    const data = await responce.json();
    setMyCart(data);
    console.log("mycart", data);
   } catch (error) {
        console.log("Error while fetch data",error)
   }
  };

  const removeCartData=async()=>{
     try {
    const responce = await fetch("http://localhost:8080/deleteCart", {
      method: "DELETE",
    });
    const data = await responce.json();
    setMyCart(data);
   } catch (error) {
        console.log("Error while fetch data",error)
   }
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    mycart.forEach((item) => {
      totalPrice += item.price * getQuantities(item._id);
    });
    return totalPrice;
  };

  const handleProceedToCheckout = () => {
    const totalAmount = calculateTotalPrice();
    navigate(`/checkout?total=${totalAmount}`);
    removeCartData()
  };

  const getQuantities = (ItemId) => {
    return quantities[ItemId] || 1;
  };

  const incrementQuantityForItem = (ItemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ItemId]: (prevQuantities[ItemId] || 1) + 1,
    }));
  };

  const decrementQulitiForItem = (ItemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ItemId]: Math.max((prevQuantities[ItemId] || 1) - 1, 1),
    }));
  };

  const Tr = (props) => {
    const { id, _id, image, name, price } = props.item;
    const quantity = getQuantities(_id);
    const handleDelete = async (dbId) => {
      try {
        const response = await fetch(`http://localhost:8080/deleteitem`, {
          method: "POST",
          body: JSON.stringify({ itemId: dbId }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const res = await response.json();
        if (res) {
          console.log("Deleted");
          setMyCart((prevCartData) =>
            prevCartData.filter((cval) => cval._id !== dbId)
          );
        }
      } catch (error) {
        console.log("Error while delete", error);
      }
    };
    return (
      <tr>
        <td className="text-center cart__img-box">
          <img src={image} />
        </td>
        <td className="text-center">{name}</td>
        <td className="text-center">{price}/-</td>
        <td className="text-center">
          <div className="qua">
            <RemoveIcon
              style={{
                fontSize: "19px",
                backgroundColor: "#c4c4c4",
                borderRadius: "50%",
                margin: "0px 5px",
                cursor: "pointer",
              }}
              onClick={() => {
                decrementQulitiForItem(_id);
              }}
            />
            {quantity}
            <AddIcon
              style={{
                fontSize: "19px",
                backgroundColor: "#c4c4c4",
                borderRadius: "50%",
                margin: "0px 5px",
                cursor: "pointer",
              }}
              onClick={() => {
                incrementQuantityForItem(_id);
              }}
            />
          </div>
        </td>
        <td className="text-center cart__item-del">
          <DeleteIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => handleDelete(_id)}
          />
        </td>
      </tr>
    );
  };

  return (
    <>
    <div>
      <Navbar />
      <TransparentImage name="Your Cart" />
      <div className="main-cart-container mb-5">
        <table className="table  table-bordered mt-5 ">
          <thead className="thead-dark">
            <tr>
              <th>Image</th>
              <th>Product Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {mycart == "" ? (
              <h3 className="empty-cart-text">Cart is Empty!</h3>
            ) : (
              mycart.map((item) => <Tr item={item} key={item.id} />)
            )}
          </tbody>
        </table>
        <div className="priceContainer">
          <h5>
            Subtotal:
            <span className="price-text">{calculateTotalPrice()}</span>
          </h5>
          <p>Taxes and shipping will calculate at checkout</p>
          <div className="card-btns">
            <NavLink to="/foods">
              <button className="cartBtn">Continue Shopping</button>
            </NavLink>
            <button
              className="cartBtn"
              onClick={() => {
                handleProceedToCheckout();
              }}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
