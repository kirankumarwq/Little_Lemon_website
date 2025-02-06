import chefsMarioAndAdrian1Img from "./assets/chefs-mario-and-adrian_1.jpg";
import chefsMarioAndAdrian2Img from "./assets/chefs-mario-and-adrian_2.jpg";
import "./OurStory.css";

const OurStory = () => {
  return (
    <section className="container grid our-story" id="about">
      <div className="our-story-description">
        <h2>Our Story</h2>
        <p>
        Welcome to Little Lemon Hotel, where comfort meets elegance. Nestled in the heart of the city, our hotel offers a serene escape with a blend of modern luxury and warm hospitality. Whether you're here for business or leisure, we ensure a delightful stay with world-class amenities and personalized services.

At Little Lemon Hotel, we take pride in our exquisite rooms, gourmet dining, and exceptional customer service. Our on-site restaurant serves a selection of fresh, locally sourced dishes, crafted to perfection by our expert chefs. From cozy accommodations to premium facilities, we cater to every traveler’s needs, making your stay truly unforgettable.

Experience tranquility, comfort, and top-notch service—all in one place. Your perfect getaway starts here.
        </p>
      </div>
      <div className="our-story-chefs">
        <img src={chefsMarioAndAdrian1Img} alt="Chefs Mario and Adrian #1" />
        <img src={chefsMarioAndAdrian2Img} alt="Chefs Mario and Adrian #2" />
      </div>
    </section>
  );
};

export default OurStory;
