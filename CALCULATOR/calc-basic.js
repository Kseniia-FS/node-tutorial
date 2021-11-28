// sum
// sub
// mult
// div

const [operation, ...numbers] = process.argv.slice(2);

const convertedToNumbers = numbers.map((number) => Number(number));
// console.log(convertedToNumbers);
// if (operation === "sum") {
//   const result = convertedToNumbers.reduce((acc, num) => {
//     return acc + num;
//   }, 0);
//   console.log(result);
// }
// if (operation === "sub") {
//   const result = convertedToNumbers.reduce((acc, num) => {
//     return acc - num;
//   });
//   console.log(result);
// }
// if (operation === "mult") {
//   const result = convertedToNumbers.reduce((acc, num) => {
//     return acc * num;
//   });
//   console.log(result);
// }
// if (operation === "div") {
//   const result = convertedToNumbers.reduce((acc, num) => {
//     return acc / num;
//   });
//   console.log(result);
// }

const sum = (operationType, convertedToNumbers) => {
  if (operationType === "sum") {
    const result = convertedToNumbers.reduce((acc, num) => {
      return acc + num;
    }, 0);
    console.log(result);
  }
};

const sub = (operationType, convertedToNumbers) => {
  if (operationType === "sub") {
    const result = convertedToNumbers.reduce((acc, num) => {
      return acc - num;
    });
    console.log(result);
  }
};
const mult = (operationType, convertedToNumbers) => {
  if (operationType === "mult") {
    const result = convertedToNumbers.reduce((acc, num) => {
      return acc * num;
    });
    console.log(result);
  }
};
const div = (operationType, convertedToNumbers) => {
  if (operationType === "div") {
    const result = convertedToNumbers.reduce((acc, num) => {
      return acc / num;
    });
    console.log(result);
  }
};
// function setOperationType(operation) {
//   if (operation === "sum") {
//     return "+";
//   }
//   if (operation === "sub") {
//     return "-";
//   }
// }
// console.log(setOperationType("mult"));

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
