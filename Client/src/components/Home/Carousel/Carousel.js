import React from "react";
//
export default function Carousel() {
  const testimonials = [
    {
      id: 1,
      name: "Emily Anderson",
      role: "Customer",
      comment:
        "Absolutely love the diverse menu! FoodEase never fails to exceed expectations with their flavors. A culinary masterpiece every time.",
    },
    {
      id: 2,
      name: "Alex Martinez",
      role: "Customer",
      comment:
        "Impressed by FoodEase's attention to detail and ambiance. A must-visit for those seeking a remarkable dining experience!",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Customer",
      comment: "Convenience meets quality at FoodEase. From quick delivery to dine-in perfection, they've truly mastered the art of culinary satisfaction.",
    },
  ];
  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <p className="d-block w-100">Absolutely love the diverse menu! FoodEase never fails to exceed expectations with their flavors. A culinary masterpiece every time!</p>
            <h4>-Emily Anderson</h4>
          </div>
          <div className="carousel-item">
          <p className="d-block w-100">Impressed by FoodEase's attention to detail and ambiance. A must-visit for those seeking a remarkable dining experience.</p>
          <h4>-Alex Martinez</h4>
          </div>
          <div className="carousel-item">
          <p className="d-block w-100">Convenience meets quality at FoodEase. From quick delivery to dine-in perfection, they've truly mastered the art of culinary satisfaction.</p>
          <h4>-Sarah Johnson</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
