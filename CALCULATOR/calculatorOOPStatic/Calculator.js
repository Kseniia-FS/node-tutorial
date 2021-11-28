class Calculator {
  static operation = process.argv.slice(2)[0];
  static numbers = process.argv.slice(3);
  static convertedToNumbers = this.numbers.map((number) => Number(number));
  static sum = (operationType, convertedToNumbers) => {
    if (operationType === "sum") {
      const result = this.convertedToNumbers.reduce((acc, num) => {
        return acc + num;
      }, 0);
      console.log(result);
    }
  };
  static sub = (operationType, convertedToNumbers) => {
    if (operationType === "sub") {
      const result = this.convertedToNumbers.reduce((acc, num) => {
        return acc - num;
      });
      console.log(result);
    }
  };
  static mult = (operationType, convertedToNumbers) => {
    if (operationType === "mult") {
      const result = this.convertedToNumbers.reduce((acc, num) => {
        return acc * num;
      });
      console.log(result);
    }
  };
  static div = (operationType, convertedToNumbers) => {
    if (operationType === "div") {
      const result = this.convertedToNumbers.reduce((acc, num) => {
        return acc / num;
      });
      console.log(result);
    }
  };

  static actionHandler = (operation, convertedToNumbers) => {
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

  static init = () => {
    this.actionHandler(this.operation, this.numbers);
  };
}
console.log("CalculatorOOPStatic");

module.exports = Calculator.init();
