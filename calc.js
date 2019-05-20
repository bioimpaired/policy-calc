const Calculator = () => {
  const getPolicyEstimate = applicant => {
    let estimate = 100;

    // check for if younger than 18
    const agePremium = getAgePriceIncrease(applicant.age);
    if (agePremium < 0) {
      return "can not give premium to anyone under age 18";
    }
    estimate += agePremium;

    // check for health conditions
    const healthPremium = getHealthPriceIncrease(
      applicant.healthConditions,
      estimate
    );
    estimate += healthPremium;

    // gender check
    const genderPremium = getGenderPriceDecrease(applicant.gender);
    estimate += genderPremium;

    return estimate;
  };

  const getAgePriceIncrease = age => {
    // no decimals allowed
    if (age < 18) {
      return -1;
    }

    let agePriceIncrease = 0;
    let baseAge = age - 18;

    while (baseAge >= 5) {
      baseAge -= 5;
      agePriceIncrease += 20;
    }

    return agePriceIncrease;
  };

  // assumed to be done after age price increase
  const getHealthPriceIncrease = (healthCondition, estimate) => {
    // all conditions in percentages
    const allConditions = {
      allergies: 0.01,
      "sleep apnea": 0.06,
      "heart disease": 0.17
    };

    const percentageIncrease = allConditions[healthCondition];
    const increaseInPrice = estimate * percentageIncrease;
    const roundedPriceIncrease = parseFloat(increaseInPrice.toFixed(2));
    return roundedPriceIncrease;
  };

  const getGenderPriceDecrease = gender => {
    return gender === "f" ? -12 : 0;
  };

  return {
    getPolicyEstimate: getPolicyEstimate,
    getHealthPriceIncrease: getHealthPriceIncrease,
    getAgePriceIncrease: getAgePriceIncrease,
    getGenderPriceDecrease: getGenderPriceDecrease
  };
};

module.exports = Calculator;
