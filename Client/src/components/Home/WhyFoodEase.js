import React from "react";
import foodEase from "../../assets/images/whyFoodEase.png";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

export default function WhyFoodEase() {
  return (
    <section className="mx-5 ">
      <div className="WhyMainContainer">
        <div data-aos="fade-right" className="left-con">
          <img className="ml-5" src={foodEase} />
        </div>
        <div data-aos="fade-left" className="right-con mt-5">
          <h2>Why <span style={{color:"orange"}}>Food Ease?</span></h2>
          <p>
          Discover the FoodEase difference: meticulously crafted menus, tantalizing flavors, seamless service. We're dedicated to making every dining moment exceptional. Join us in redefining your culinary experience.!
          </p>
          <div className="other">
            <p className="first_para"><CheckCircleOutlinedIcon style={{fontSize:"22px",position:"relative",top:"4px",right:"2px"}}/>Fresh and tasty foods</p>
            <p>
            Indulge in our offerings: a symphony of freshness and exquisite taste.
            </p>
            <p className="second_para"><CheckCircleOutlinedIcon style={{fontSize:"22px",position:"relative",top:"4px",right:"2px"}}/>Quality support</p>
            <p>
            Reliable assistance ensuring your satisfaction throughout your dining journey.
            </p>
            <p className="third_para"><CheckCircleOutlinedIcon style={{fontSize:"22px",position:"relative",top:"4px",right:"2px"}}/>Order from any location</p>
            <p>
            Seamless access, place orders effortlessly no matter where you are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
