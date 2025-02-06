import "./TestimonialCard.css";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

const TestimonialCard = ({ customer }) => {
  return (
    <article className="testimonial-card">
      <img src={customer.image} alt={customer.fullName} />
      <h4>{customer.fullName}</h4>
      <span>
        {customer.rating.map((ratingPoint, idx) =>
          ratingPoint === 1 ? (
            <IoMdStar key={idx} />
          ) : ratingPoint === 0.5 ? (
            <IoMdStarHalf key={idx} />
          ) : ratingPoint === 0 ? (
            <IoMdStarOutline key={idx} />
          ) : null
        )}
      </span>
      <blockquote>
        <p>"{customer.says}"</p>
      </blockquote>
    </article>
  );
};

export default TestimonialCard;
