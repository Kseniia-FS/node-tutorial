const sum = (operationType, convertedToNumbers) => {
  if (operationType === "sum") {
    const result = convertedToNumbers.reduce((acc, num) => {
      return acc + num;
    }, 0);
    console.log(result);
  }
};
module.exports = sum;
