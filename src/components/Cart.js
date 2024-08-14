import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "./CartItems";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const [subtotal, setSubtotal] = useState(0);
  const [itemTotals, setItemTotals] = useState({});
  const deliveryCharges = 40;
  const taxes = subtotal * 0.05;

  const updateItemTotal = (itemId, itemTotalPrice) => {
    setItemTotals((prevTotals) => ({
      ...prevTotals,
      [itemId]: itemTotalPrice,
    }));
  };

  useEffect(() => {
    const newSubtotal = cartItems.reduce((acc, item) => {
      const itemTotal =
        itemTotals[item.card?.info?.id] ||
        (item.card?.info?.defaultPrice || item.card?.info?.price) / 100;
      return acc + itemTotal;
    }, 0);
    setSubtotal(newSubtotal);
  }, [itemTotals, cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="text-center m-4 p-4">
        <h1>Your cart is empty</h1>
        <h5>You can go to the home page to view more restaurants</h5>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 w-8/12 max-laptop:p-0 max-laptop:w-fullc">
      <h1 className="text-3xl font-bold mb-8 text-center">Cart</h1>
      <div className="grid grid-cols-1 laptop:grid-cols-3 gap-8 max-laptop:mx-auto max-laptop:my-0">
        <div className="laptop:col-span-2">
          {cartItems.map((item) => (
            <CartItems
              key={item.card?.info?.id}
              item={item}
              onUpdateItemTotal={updateItemTotal}
            />
          ))}
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-6">Order summary</h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-medium">₹ {subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Shipping estimate</p>
            <p className="font-medium">₹ {deliveryCharges.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">Tax estimate</p>
            <p className="font-medium">₹ {taxes.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center text-lg font-bold mb-6">
            <p>Order total</p>
            <p>₹ {(subtotal + deliveryCharges + taxes).toFixed(2)}</p>
          </div>
          <button className="bg-green-600 text-white font-bold text-xl w-full py-3 rounded-lg hover:bg-green-700">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
