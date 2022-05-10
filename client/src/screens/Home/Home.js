import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Flight1 from "../../assets/flight1.jpg";
import Flight2 from "../../assets/flight2.jpeg";
import Flight3 from "../../assets/flight3.jpeg";

const Home = () => {
  return (
    <div>
      <Carousel
        autoPlay
        swipeable
        emulateTouch
        infiniteLoop
        showStatus={false}
        renderThumbs={() => {}}
      >
        <div style={{ height: 800, borderRadius: 10, overflow: "hidden" }}>
          <img
            style={{ objectFit: "cover", height: "100%" }}
            src={Flight1}
            alt="flight 1"
          />
        </div>
        <div style={{ height: 800, borderRadius: 10, overflow: "hidden" }}>
          <img
            style={{ objectFit: "cover", height: "100%" }}
            src={Flight2}
            alt="flight 2"
          />
        </div>
        <div style={{ height: 800, borderRadius: 10, overflow: "hidden" }}>
          <img
            style={{ objectFit: "cover", height: "100%" }}
            src={Flight3}
            alt="flight 3"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
