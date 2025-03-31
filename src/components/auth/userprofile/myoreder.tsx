import React from "react";

interface Order {
  id: number;
  item: string;
  status: string;
  date: string;
}


interface MyOrdersProps {
  orders: Order[];
}

const MyOrders: React.FC<MyOrdersProps> = ({ orders }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="p-4 border rounded-md shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{order.item}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}>
                    {order.status}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </>
  );
};


export default MyOrders;
