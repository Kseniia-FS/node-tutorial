const { connect } = require("mongoose");

const connectDb = async () => {
  const db = await connect(process.env.MONGODB_URI);
  const { host, port, name } = db.connection;
  console.log(
    `MongoDb are connected on port: ${port}, on host: ${host}, with name: ${name}`
      .green.italic.bold
  );
};

module.exports = connectDb;
