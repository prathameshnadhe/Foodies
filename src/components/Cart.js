import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "./CartItems";
import infoImg from "./../utils/images/info.png";
import cartEmptyImg from "./../utils/images/cart_empty.png";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [showTooltip, setShowTooltip] = useState(false);
  const dispatch = useDispatch();

  const [subtotal, setSubtotal] = useState(0);
  const [itemTotals, setItemTotals] = useState({});
  const deliveryCharges = 40;
  const packagingCharges = 5;
  const taxes = subtotal * 0.05;
  const totalTaxes = taxes + packagingCharges;

  const updateItemTotal = (itemId, itemTotalPrice) => {
    setItemTotals((prevTotals) => ({
      ...prevTotals,
      [itemId]: itemTotalPrice,
    }));
  };

  useEffect(() => {
    // Calculate new subtotal based on itemTotals
    const newSubtotal = cartItems.reduce((acc, item) => {
      const itemTotal = itemTotals[item.card?.info?.id] || 0;
      return acc + itemTotal;
    }, 0);

    setSubtotal(newSubtotal);
  }, [itemTotals, cartItems]);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center m-4 p-4 bg-[#fff] mt-20 ">
        <img
          src={cartEmptyImg}
          className="mx-auto my-0 w-[17rem] h-[16rem]"
          alt=""
        />
        <p className="text-2xl font-bold mb-2 mt-5 opacity-[0.8]">
          Good food is always cooking
        </p>
        <p className="text-base font-semibold mb-2 opacity-[0.8]">
          No orders yet! Discover more restaurants on the home page.
        </p>
        <Link to="/">
          <p className="bg-orange-600 w-[18rem] mt-6 mx-auto my-0 p-2 px-6 text-white font-bold uppercase">
            See restaurants near you
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-0 p-8 w-9/12 max-tablet:p-4 max-laptop:w-full">
      <h1 className="text-3xl font-bold mb-8 text-center uppercase opacity-[0.9]">
        Secure Checkout
      </h1>
      <div className="grid grid-cols-1 laptop:grid-cols-3 mx-auto my-0 gap-8">
        <div className="laptop:col-span-2">
          {cartItems.map((item) => (
            <CartItems
              key={item.card?.info?.id}
              item={item}
              onUpdateItemTotal={updateItemTotal}
            />
          ))}
          <button
            className="bg-gray-600 text-lg text-white p-2 px-4 font-bold opacity-[0.9] mt-2 rounded-lg hover:bg-gray-700"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg ">
          <h2 className="text-xl font-bold mb-6">Bill Details</h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Item Total</p>
            <p className="font-medium">₹ {subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Delivery Fee</p>
            <p className="font-medium">₹ {deliveryCharges.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-wrap items-center relative">
              <p className="text-gray-600">GST and Restaurant Charges</p>
              <button
                type="button"
                className="text-white font-medium rounded-lg text-sm mx- text-center ml-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img src={infoImg} alt="info" className="w-4 h-4" />
              </button>

              {/* Tooltip */}
              <div
                id="tooltip-default"
                role="tooltip"
                className={`absolute z-10 w-64 p-3 ml-[6.5rem] text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-lg transition-opacity duration-300 ${
                  showTooltip ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                style={{
                  top: "calc(100% + 0.5rem)",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <h3 className="mb-2 font-bold">GST and Restaurant Charges</h3>
                <div className="flex justify-between mb-1">
                  <span>Restaurant Packaging</span>
                  <span>₹ {packagingCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Restaurant GST</span>
                  <span>₹ {taxes.toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-xs mb-1">
                  Foodies plays no role in taxes and charges levied by the govt.
                  and restaurant
                </p>
                {/* Tooltip Arrow */}
                <div
                  className="absolute w-3 h-3 bg-white border-l border-t border-gray-300 transform rotate-45 -top-1.5 left-1/2"
                  style={{
                    transform: "translateX(-50%) rotate(45deg)",
                  }}
                ></div>
              </div>
            </div>
            <p className="font-medium">₹ {totalTaxes.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center text-lg font-bold mb-6">
            <p>Order total</p>
            <p>₹ {(subtotal + deliveryCharges + totalTaxes).toFixed(2)}</p>
          </div>
          <button className="bg-green-600 text-white border-green-900 font-bold text-xl w-full py-3 rounded-lg hover:bg-green-700">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
