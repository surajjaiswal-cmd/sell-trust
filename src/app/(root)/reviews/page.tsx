"use client";
const Reviews = () => {
  const reviews = [
    {
      name: "John Doe",
      review: "Excellent service! The plumber fixed everything quickly.",
    },
    {
      name: "Jane Smith",
      review: "Loved the salon service. Very professional!",
    },
    {
      name: "Jane Smith",
      review: "Loved the salon service. Very professional!",
    },
    {
      name: "Jane Smith",
      review: "Loved the salon service. Very professional!",
    },
    {
      name: "Jane Smith",
      review: "Loved the salon service. Very professional!",
    },
    {
      name: "Jane Smith",
      review: "Loved the salon service. Very professional!",
    },
    {
      name: "Jane Smith",
      review: "Loved the salon service. Very professional!",
    },
  ];

  return (
    <div className="container mx-auto p-6 mt-16">
      <h1 className="text-3xl font-bold mb-4">Customer Reviews</h1>
      {reviews.map((item, index) => (
        <div key={index} className="border p-4 rounded-lg my-2">
          <h2 className="font-semibold">{item.name}</h2>
          <p>{item.review}</p>
        </div>
      ))}
    </div>
  );
};
export default Reviews;
