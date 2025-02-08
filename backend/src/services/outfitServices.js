const getOutfitRecommendation = (temp) => {
    let outfit;
  
    if (temp < 10) {
      outfit = "Wear a heavy jacket, sweater, and boots.";
    } else if (temp >= 10 && temp < 20) {
      outfit = "Wear a light jacket, jeans, and sneakers.";
    } else if (temp >= 20 && temp < 30) {
      outfit = "Wear a t-shirt, shorts, and sandals.";
    } else {
      outfit = "Wear a tank top, shorts, and sunglasses.";
    }
  
    return outfit;
  };
  
  module.exports = { getOutfitRecommendation };
  