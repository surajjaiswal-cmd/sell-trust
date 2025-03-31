const ManageOrders = () => {
  const orders = [
    { id: 1, item: "Bee Removal Service", status: "Pending" },
    { id: 2, item: "Beehive Setup", status: "Completed" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Manage Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order) => (
            <li key={order.id} className="p-4 bg-white border shadow-md rounded-md">
              {order.item} -{" "}
              <span className="text-gray-600">{order.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageOrders;
