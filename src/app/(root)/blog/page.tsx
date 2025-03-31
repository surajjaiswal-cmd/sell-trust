"use client";
const Blog = () => {
  const articles = [
    {
      title: "How to Maintain Your Plumbing System",
      content: "Plumbing issues? Here are some maintenance tips...",
    },
    {
      title: "Best Home Cleaning Practices",
      content: "Keep your home sparkling with these tips...",
    },
  ];

  return (
    <div className="container mx-auto p-6 mt-16">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      {articles.map((article, index) => (
        <div key={index} className="border p-4 rounded-lg my-2">
          <h2 className="font-semibold">{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};
export default Blog;
