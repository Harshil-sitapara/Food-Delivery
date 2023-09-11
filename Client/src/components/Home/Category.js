import React from "react";
import "../../App.css"
// food icon
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';

export default function Category() {
  return (
    <>
      <div data-aos="fade-up" className="row ml-4 mr-4 categoryContainer">
        <div className="mb-5 col-6 col-sm-6 col-md-2 col-lg-3 pt-4 pb-2 firstBox box">
          <div className="firstImage pl-3"><LunchDiningOutlinedIcon style={{fontSize:"33px"}}/></div>
          <p className="pl-4">Fastfood</p>
        </div>
        <div className="mb-5 col-6 col-sm-6 col-md-2 col-lg-3 pt-4 pb-2 secondBox box">
          <div className="secondImage pl-3 "><LocalPizzaOutlinedIcon style={{fontSize:"33px"}}/></div>
          <p className="pl-4">Pizza</p>
        </div>
        <div className="mb-5 col-6 col-sm-6 col-md-2 col-lg-3 pt-4 pb-2 thirdBox box">
          <div className="thirdImage pl-3 "><RestaurantOutlinedIcon style={{fontSize:"33px"}}/></div>
          <p className="pl-4">Punjabi</p>
        </div>
      </div>
    </>
  );
}
