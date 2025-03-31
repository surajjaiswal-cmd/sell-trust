"use client";
const Terms = () => {
  return (
    <div className="container mx-auto p-6 mt-16">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

      <h2 className="text-xl font-semibold mt-6">Usage Policies</h2>
      <p>
        Users must follow ethical guidelines when booking services. Any misuse
        of services will result in termination.
      </p>

      <h2 className="text-xl font-semibold mt-6">Booking Policies</h2>
      <p>
        All bookings must be made at least 2 hours in advance. Cancellations
        must be done within 24 hours.
      </p>

      <h2 className="text-xl font-semibold mt-6">Refund Policies</h2>
      <p>
        Refunds are issued only if the service provider fails to deliver the
        booked service.
      </p>
    </div>
  );
};
export default Terms;
