import React from "react";
//images
import quickDelivery from "../../assets/images/quickDelivery.png";
import superDine from "../../assets/images/superDine.png";
import easyPickup from "../../assets/images/easyPick.png";

export default function Serve() {
  return (
    <>
    <section >
      <div  className="serveMainContainer mt-5 mb-5">
        <div data-aos="fade-up" className="aboveContainer pb-5">
          <h3 >What we serve</h3>
          <h1>
            Just sit back at home
            <br />
            we will<span style={{ color: "orange" }}> take care</span>
          </h1>
          <p>
          Just sit back at home and savor the moment. Our culinary experts are devoted to crafting delectable dishes, 
            <br /> while our efficient delivery ensures a worry-free experience. Enjoy FoodEase today!
          </p>
        </div>
        <div data-aos="fade-up" className="belowContainer container row mb-5">
          <div className="col-sm boxes">
          <div className="feature1">
            <img src={quickDelivery} className="pb-4"/>
            <h4>Quick Delivery</h4>
            <p className="pt-2">Swift service, bringing your favorite flavors straight to your door!</p>
            </div>
          </div>
          <div className="col-sm boxe ">
          <div className="feature2">
            <img src={superDine} className="pb-4"/>
            <h4>Super Dine In</h4>
            <p className="pt-2">
            Savor superb dining, immerse in delectable dishes and ambiance.
            </p>
            </div>
          </div>
          <div className="col-sm boxe ">
          <div className="feature3">
            <img src={easyPickup} className="pb-4"/>
            <h4>Easy Pick Up</h4>
            <p className="pt-2">
            Hassle-free pick-up. Order ahead, collect culinary delights effortlessly.
            </p>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
