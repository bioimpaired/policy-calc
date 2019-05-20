const chai = require("chai");
var expect = chai.expect;
const Calculator = require("../calc");

describe("Calculator", () => {
  const calc = Calculator();
  const underAgeErrorMessage = "can not give premium to anyone under age 18";

  let underAge = {
    name: "under age",
    age: 8,
    gender: "f",
    healthConditions: "allergies"
  };

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

  describe("getPolicyEstimate", () => {
    it("does not give an estimate of any under age 18", () => {
      expect(calc.getPolicyEstimate(underAge)).to.be.equal(
        underAgeErrorMessage
      );
    });

    it("gets the correct estimate", () => {
      expect(calc.getPolicyEstimate(kelly)).to.be.equal(210.2);
    });

    it("gets the correct estimate", () => {
      expect(calc.getPolicyEstimate(josh)).to.be.equal(190.8);
    });

    it("gets the correct estimate", () => {
      expect(calc.getPolicyEstimate(brad)).to.be.equal(117);
    });
  });

  describe("age premium estimator", () => {
    it("does not give a price increase estimate for any under age 18", () => {
      expect(calc.getAgePriceIncrease(17)).to.be.equal(-1);
    });

    it("gets correct price increase for a 50 year old", () => {
      expect(calc.getAgePriceIncrease(50)).to.be.equal(120);
    });

    it("gets correct price increase of an 18 year old", () => {
      expect(calc.getAgePriceIncrease(18)).to.be.equal(0);
    });
  });

  describe("health condition premium estimator", () => {
    it("gets the correct sleep apnea premium increase given current estimate", () => {
      expect(calc.getHealthPriceIncrease("sleep apnea", 100)).to.be.equal(6);
    });

    it("gets the correct allergies premium increase given current estimate", () => {
      expect(calc.getHealthPriceIncrease("allergies", 100)).to.be.equal(1);
    });

    it("gets the correct heart disease premium increase given current estimate", () => {
      expect(calc.getHealthPriceIncrease("heart disease", 100)).to.be.equal(17);
    });

    it("applies a premium rounded in cents", () => {
      expect(calc.getHealthPriceIncrease("heart disease", 117)).to.be.equal(
        19.89
      );
    });
  });

  describe("gender premium estimator", () => {
    it("does not apply a female discount if male", () => {
      expect(calc.getGenderPriceDecrease("m")).to.be.equal(0);
    });
    it("does apply a female discount to a female", () => {
      expect(calc.getGenderPriceDecrease("f")).to.be.equal(-12);
    });
  });
});
