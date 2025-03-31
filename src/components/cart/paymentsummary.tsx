"use client";
import { useState } from "react";
import { useCart } from "@/context/cartcontext";

const PaymentSummary: React.FC = () => {
  const { cart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // ✅ Ensure prices are numbers
  const totalPrice: number = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  const discountedPrice: number = totalPrice - (totalPrice * discount) / 100;

  const applyPromoCode = () => {
    if (promoCode.trim().toUpperCase() === "DISCOUNT10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  return (
    <div className="p-4 border rounded-sm shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Payment Summary</h2>

      {/* ✅ Always show prices in two decimal places */}
      <p className="text-gray-500 my-2">Total: ₹{totalPrice.toFixed(2)}</p>

      {discount > 0 && (
        <p className="text-green-500">Discount Applied: {discount}%</p>
      )}

      <p className="text-black font-semibold">
        Final Total: ₹{discountedPrice.toFixed(2)}
      </p>

      {/* Promo Code Section */}
      <div className="mt-4 flex justify-between items-end ">
        <input
          type="text"
          className="border p-2 w-[80%]"
          placeholder="Enter Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button
          className="btn btn-secondary py-1 rounded-sm"
          onClick={applyPromoCode}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default PaymentSummary;
