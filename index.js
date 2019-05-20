const Calculator = require("./calc");

const calc = Calculator();

let kelly = {
  name: "kelly",
  age: 50,
  gender: "f",
  healthConditions: "allergies"
};

let josh = {
  name: "josh",
  age: 40,
  gender: "m",
  healthConditions: "sleep apnea"
};

let brad = {
  name: "brad",
  age: 20,
  gender: "m",
  healthConditions: "heart disease"
};

const applicants = [kelly, josh, brad];

const totalPremiums = applicants.map(applicant => {
  return {
    name: applicant.name,
    premium: calc.getPolicyEstimate(applicant)
  };
});

console.log(totalPremiums);
