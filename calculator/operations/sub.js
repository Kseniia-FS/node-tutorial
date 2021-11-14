const sub = (operationType, convertedToNumbers) => {
  if (operationType === "sub") {
    const result = convertedToNumbers.reduce((acc, num) => {
      return acc - num;
    });
    console.log(result);
  }
};

module.exports = sub;
