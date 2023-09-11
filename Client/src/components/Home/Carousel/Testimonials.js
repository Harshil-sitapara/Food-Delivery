import React from "react";
//gif
import WORLDSVG from "../../../assets/images//WORLD.svg";
//carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carausel from './Carousel'
//images


export default function Testimonials() {
  return (
    <section >
      <div className="mainTestimonial ">
        <div data-aos="fade-right" className="leftTesti ">
          <div  className="leftTopContainer">
            <h4>Testimonial</h4>
            <h3>What our <span style={{color:"orange"}}>customers</span> are saying</h3>
            <p>
            Explore customer experiences: 'Unparalleled flavors, impeccable service. <br/>FoodEase truly elevates dining.' Join the chorus of satisfied voices, sharing in the delight that defines our culinary excellence.!
            </p>
          </div>
          <div className="leftBottomContainer">
          <Carausel/>
          </div>
        </div>
        <div data-aos="zoom-out-up" className="rightTesti">
        <img src={WORLDSVG} alt="Online world" className="onlineWoldImg" />
        </div>
      </div>
    </section>
  );
}
