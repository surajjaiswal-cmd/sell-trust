"use client";
const Contact = () => {
  return (
    <div className="container mx-auto p-6 mt-16">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p>Need support? Reach out to us.</p>

      <h2 className="text-xl font-semibold mt-6">Support & Help Center</h2>
      <p>Email: support@homeservices.com</p>
      <p>Phone: +91 98765 43210</p>

      <h2 className="text-xl font-semibold mt-6">FAQs</h2>
      <ul className="list-disc pl-6">
        <li>How do I book a service?</li>
        <li>What are the available payment methods?</li>
        <li>How can I cancel my booking?</li>
      </ul>
    </div>
  );
};
export default Contact;
