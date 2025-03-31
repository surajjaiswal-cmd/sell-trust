"use client";

import { useCart } from "@/context/cartcontext";
import { FaCheck } from "react-icons/fa";

const CartSummary: React.FC = () => {
  const { cart } = useCart();

  // ✅ Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  return (
    <div className="border rounded-sm shadow-sm p-4  mb-3">
      <h2 className="text-lg font-semibold mb-3">Cart Summary</h2>
      {cart.length > 0 ? (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b pb-2">
              <p className="flex justify-center items-center gap-2 ">
                {" "}
                <FaCheck /> {item.name}
              </p>
              <p className="font-semibold">₹{item.price.toFixed(2)}</p>{" "}
              {/* Show item price */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}

      {/* ✅ Display total price */}
      <div className="mt-3 font-bold text-lg">
        Total: ₹{totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default CartSummary;
