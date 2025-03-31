"use client";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// Define TypeScript interface for reviews
interface Review {
  id: number;
  name: string;
  date: string;
  details: string;
  rating: number;
}

// Mock reviews data
const initialReviews: Review[] = [
  {
    id: 1,
    name: "Sandhya",
    date: "2025-03-01",
    details: "Quick work and knowledgeable staff.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul",
    date: "2025-02-28",
    details: "Excellent service, very satisfied!",
    rating: 5,
  },
  {
    id: 3,
    name: "Aisha",
    date: "2025-02-27",
    details: "Good experience, will come again.",
    rating: 4,
  },
  {
    id: 4,
    name: "John",
    date: "2025-02-26",
    details: "Friendly staff, but a bit slow.",
    rating: 3,
  },
  {
    id: 5,
    name: "Emily",
    date: "2025-02-25",
    details: "Highly recommended!",
    rating: 5,
  },
  {
    id: 6,
    name: "David",
    date: "2025-02-24",
    details: "Decent, but could be better.",
    rating: 4,
  },
  {
    id: 7,
    name: "Priya",
    date: "2025-02-23",
    details: "Very helpful, great service!",
    rating: 5,
  },
  {
    id: 8,
    name: "Vikram",
    date: "2025-02-22",
    details: "Average experience.",
    rating: 3,
  },
  {
    id: 9,
    name: "Sophia",
    date: "2025-02-21",
    details: "Loved it!",
    rating: 5,
  },
  {
    id: 10,
    name: "Michael",
    date: "2025-02-20",
    details: "Fast and efficient.",
    rating: 5,
  },
  {
    id: 11,
    name: "Anita",
    date: "2025-02-19",
    details: "It was okay.",
    rating: 4,
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({
    name: "",
    details: "",
    rating: 5,
  });
  const [visibleCount, setVisibleCount] = useState(7);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Newest First");

  // Handle form submission for new reviews
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.details) return;

    const reviewToAdd: Review = {
      id: reviews.length + 1,
      name: newReview.name,
      date: new Date().toISOString().split("T")[0], // Get YYYY-MM-DD format
      details: newReview.details,
      rating: newReview.rating,
    };

    setReviews([reviewToAdd, ...reviews]); // Add new review at the top
    setNewReview({ name: "", details: "", rating: 5 });
  };

  // Handle filtering
  const sortReviews = (filterType: string) => {
    const sortedReviews = [...reviews];

    switch (filterType) {
      case "Highest Rating":
        sortedReviews.sort((a, b) => b.rating - a.rating);
        break;
      case "Lowest Rating":
        sortedReviews.sort((a, b) => a.rating - b.rating);
        break;
      case "Newest First":
        sortedReviews.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "Oldest First":
        sortedReviews.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      default:
        break;
    }

    setReviews(sortedReviews);
    setSelectedFilter(filterType);
    setFilterOpen(false); // Close dropdown after selecting
  };

  return (
    <div className="relative">
      {/* Write a Review Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Write Your Review</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded-sm shadow-sm"
            value={newReview.name}
            onChange={(e) =>
              setNewReview({ ...newReview, name: e.target.value })
            }
          />
          <textarea
            placeholder="Write your review here..."
            className="w-full p-2 border rounded-sm shadow-sm"
            value={newReview.details}
            onChange={(e) =>
              setNewReview({ ...newReview, details: e.target.value })
            }
          />
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewReview({ ...newReview, rating: star })}>
                {star <= newReview.rating ? (
                  <AiFillStar className="text-yellow-500 text-xl" />
                ) : (
                  <AiOutlineStar className="text-gray-400 text-xl" />
                )}
              </button>
            ))}
          </div>
          <button type="submit" className="btn btn-secondary rounded-sm">
            Submit Review
          </button>
        </form>
      </div>

      <hr className="my-3" />

      {/* Filter Dropdown */}
      <div className="flex justify-between items-center relative">
        <h3 className="text-xl font-semibold mb-3">All Reviews</h3>
        <div className="relative">
          <button
            className="rounded-sm mb-3 btn btn-secondary flex items-center"
            onClick={() => setFilterOpen(!filterOpen)}>
            Filter ▾
          </button>
          {filterOpen && (
            <div className="absolute right-0 bg-white shadow-md rounded-sm shadow-sm w-48 mt-1 z-10">
              <ul className="p-2">
                {[
                  "Highest Rating",
                  "Lowest Rating",
                  "Newest First",
                  "Oldest First",
                ].map((option) => (
                  <li
                    key={option}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      selectedFilter === option ? "font-bold" : ""
                    }`}
                    onClick={() => sortReviews(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      {reviews.slice(0, visibleCount).map((review) => (
        <div key={review.id} className="">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{review.name}</h4>
            <span className="bg-[#208963] flex justify-around items-center text-white w-8 rounded-sm text-sm">
              ★ {review.rating}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {new Date(review.date).toDateString()}
          </p>
          <p className="mt-2 text-gray-700">{review.details}</p>
          <hr className="my-3" />
        </div>
      ))}

      {/* See More Button */}
      {visibleCount < reviews.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-secondary rounded-sm"
            onClick={() => setVisibleCount(reviews.length)}>
            See More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
