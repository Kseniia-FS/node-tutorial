const div = (operationType, convertedToNumbers) => {
  if (operationType === "div") {
    const result = convertedToNumbers.reduce((acc, num) => {
      return acc / num;
    });
    console.log(result);
  }
};
module.exports = div;
