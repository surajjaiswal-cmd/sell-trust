import Image from "next/image";
import React from "react";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price?: number;
    image?: string;
    time?: string;
    reviwes?: string;
    vendor?: string;
    categories?: string;
    selectedDate?: string;
    selectedTime?: string;
  };
  removeItem: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, removeItem }) => {
  return (

      <div className="flex items-center justify-start  w-full border rounded-sm shadow-sm p-3 " >
        {/* Product Image */}
        <Image
          width={500}
          height={500}
          priority
          src={item.image || "iamge"}
          alt={item.name}
          className="w-24 h-20 object-cover rounded-sm shadow-sm"
        />

        {/* Product Details */}
        <div className=" px-3 w-full">
          <h2 className="text-[1rem] text-gray-500">{item.name}</h2>
          <p className="text-gray-400 text-sm">
            Date -{item.selectedDate ?? "No Date Selected"} at{" "}
            {item.selectedTime ?? "No Time Selected"}
          </p>
          <div className="flex justify-between items-end">
            <p className="text-gray-400 text-sm">₹{item.price}.00 </p>{" "}
            <button
              onClick={() => removeItem(item.id)}
              className="btn btn-secondary p-0.5 text-[.7rem] rounded-sm shadow-sm ">
              Remove
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default CartItem;
