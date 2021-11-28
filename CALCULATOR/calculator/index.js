const actionHandler = require("./actionHandler");

const [operation, ...numbers] = process.argv.slice(2);
const convertedToNumbers = numbers.map((number) => Number(number));
actionHandler(operation, convertedToNumbers);
