Installation:

1. Git clone
2. npm install
3. npm run start

npm run start will return an array of objects that include name and premium
eg. {name: "kelly", premium: 210.2}

There is a basic calculator module that can take in an object containing the applicants attributes
eg. {
name: "kelly",
age: 50,
gender: "male",
healthCondition: "sleep apnea"

}
getPolicyEstimate in calc module will return the overall premium

tests only cover getPolicyEstimate and other individual characteristic price changes.
