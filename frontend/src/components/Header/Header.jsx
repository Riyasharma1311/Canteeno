import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Discover a vibrant menu at our college canteen, offering an exciting
          mix of delicious meals and refreshing snacks. Crafted to satisfy your
          taste buds and keep you energized, our canteen ensures every break
          feels special, turning everyday moments into flavorful memories.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
