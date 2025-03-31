"use client";
import CartItem from "@/components/cart/cartitem";
import CartSummary from "@/components/cart/cartsummary";
import LinkLoad from "@/components/loadingbar/linkload";
import PaymentSummary from "@/components/cart/paymentsummary";
import { useCart } from "@/context/cartcontext";
import { LuShoppingCart } from "react-icons/lu";

const CartPage: React.FC = () => {
  const { cart, removeItem } = useCart();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length > 0 ? (
        <div className="flex justify-between gap-6 flex-col md:flex-row">
          <div className=" w-full md:w-[60%] ">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} removeItem={removeItem} />
            ))}
          </div>
          <div className=" w-full md:w-[35%]">
            <CartSummary />

            <PaymentSummary />
            <div className="mt-4">
              <LinkLoad
                href="/checkout"
                className="btn btn-info w-full rounded-none">
                Proceed to Checkout
              </LinkLoad>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[100vh] w-full text-center shadow-sm">
          <div className="text-gray-600 text-3xl  mt-48 flex justify-center items-center ">
            <LuShoppingCart /> <p className="ms-2">Your cart is empty.</p>
          </div>
          <LinkLoad
            href="/services"
            className="btn border text-blue-600 mt-4 rounded-sm">
            Explore Services
          </LinkLoad>
        </div>
      )}
    </div>
  );
};

export default CartPage;
