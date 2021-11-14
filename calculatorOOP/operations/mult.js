const mult = (operationType, convertedToNumbers) => {
  if (operationType === "mult") {
    const result = convertedToNumbers.reduce((acc, num) => {
      return acc * num;
    });
    console.log(result);
  }
};
module.exports = mult;
