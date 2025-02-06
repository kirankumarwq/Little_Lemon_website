import "./Testimonials.css";
import TestimonialCard from "./TestimonialCard";

const customers = [
  {
    fullName: "Anthony",
    image:
      "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: [1, 1, 1, 1, 0.5],
    says: "Little Lemon Hotel exceeded all my expectations! The rooms were spotless, the staff was incredibly welcoming, and the food was simply divine. Can’t wait to visit again!",
  },
  {
    fullName: "Mary",
    image:
      "https://images.unsplash.com/photo-1573497491765-dccce02b29df?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: [1, 1, 1, 1, 0],
    says: "From the moment we arrived, we felt at home. The attention to detail and the cozy ambiance made our stay unforgettable. Highly recommended",
  },
  {
    fullName: "John",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: [1, 1, 1, 1, 0.5],
    says: "The perfect blend of luxury and relaxation. The restaurant’s fresh, locally sourced dishes were a highlight of our trip!",
  },
  {
    fullName: "Sarah",
    image:
      "https://images.unsplash.com/photo-1581714161666-dade083654ae?q=80&w=2786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: [1, 1, 1, 1, 1],
    says: "The staff went above and beyond to ensure we had a fantastic stay. Truly a home away from home!",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container grid">
        <h2>Testimonials</h2>
        {customers.map((customer, index) => (
          <TestimonialCard key={index} customer={customer} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
