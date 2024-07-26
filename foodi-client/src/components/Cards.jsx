import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "../App.css";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import UseCart from "../hooks/UseCart";
import axios from "axios";

const Cards = ({ item }) => {
  const [cart, refetch] = UseCart();
  const [isHeartFillted, setisHeartFillted] = useState(false);
  const { user } = useContext(AuthContext);
  const { name, image, price, recipe, _id } = item;

  const handleHeartClick = () => {
    setisHeartFillted(!isHeartFillted);
  };

  const navigate = useNavigate();
  const location = useLocation();

  // add to cart btn
  const handleAddtoCart = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
      axios
        .post("http://localhost:3000/carts", cartItem)
        .then((response) => {
          if (response) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Food added on the cart.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div
      to={`menu/${item._id}`}
      className="card shadow-xl relative mr-5 md:my-5"
    >
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFillted ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer"></FaHeart>
      </div>
      <Link to={`menu/${item._id}`}></Link>
      <figure>
        <img
          src={item.image}
          alt=""
          className="hover:scale-105 transition-all duration-200 md:h-72"
        />
      </figure>
      <div className="card-body">
        <Link to={`menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold ">
            <span className="text-sm text-red">$</span>
            {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddtoCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
