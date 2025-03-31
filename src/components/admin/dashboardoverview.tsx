const DashboardOverview = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-200 shadow-md rounded-md text-center">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="p-6 bg-green-200 shadow-md rounded-md text-center">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold">340</p>
        </div>
        <div className="p-6 bg-yellow-200 shadow-md rounded-md text-center">
          <h2 className="text-xl font-semibold">Service Providers</h2>
          <p className="text-2xl font-bold">15</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
