const { sum, sub, mult, div } = require("./operations");
const actionHandler = (operation, convertedToNumbers) => {
  switch (operation) {
    case "sum":
      sum(operation, convertedToNumbers);
      break;
    case "sub":
      sub(operation, convertedToNumbers);
      break;
    case "mult":
      mult(operation, convertedToNumbers);
      break;
    case "div":
      div(operation, convertedToNumbers);
      break;
    default:
      console.log("Unable to handle operation");
  }
};
module.exports = actionHandler;
