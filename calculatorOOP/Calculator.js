class Calculator {
  constructor(operation, numbers) {
    this.operation = operation;
    this.numbers = numbers;
  }

  sum = (operationType, convertedToNumbers) => {
    if (operationType === "sum") {
      const result = convertedToNumbers.reduce((acc, num) => {
        return acc + num;
      }, 0);
      console.log(result);
    }
  };
  sub = (operationType, convertedToNumbers) => {
    if (operationType === "sub") {
      const result = convertedToNumbers.reduce((acc, num) => {
        return acc - num;
      });
      console.log(result);
    }
  };
  mult = (operationType, convertedToNumbers) => {
    if (operationType === "mult") {
      const result = convertedToNumbers.reduce((acc, num) => {
        return acc * num;
      });
      console.log(result);
    }
  };
  div = (operationType, convertedToNumbers) => {
    if (operationType === "div") {
      const result = convertedToNumbers.reduce((acc, num) => {
        return acc / num;
      });
      console.log(result);
    }
  };

  actionHandler = (operation, convertedToNumbers) => {
    switch (operation) {
      case "sum":
        this.sum(operation, convertedToNumbers);
        break;
      case "sub":
        this.sub(operation, convertedToNumbers);
        break;
      case "mult":
        this.mult(operation, convertedToNumbers);
        break;
      case "div":
        this.div(operation, convertedToNumbers);
        break;
      default:
        console.log("Unable to handle operation");
    }
  };

  init = () => {
    this.actionHandler(this.operation, this.numbers);
    console.log(this.operation);
    console.log(this.numbers);
  };
}
console.log("CalculatorOOP");
const [operation, ...numbers] = process.argv.slice(2);
const convertedToNumbers = numbers.map((number) => Number(number));
module.exports = new Calculator(operation, convertedToNumbers).init();
