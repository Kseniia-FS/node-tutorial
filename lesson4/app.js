// Регистрация - сохранение пользователя в базе данных
// Аутетификация - проверка логина и пароля на валидность (совпадает ли с тем что есть в базе)
// Авторизация - проверка прав и доступов на выполнение определенных действий и к ресурсам сайта

const express = require("express");
const app = express();
const connectDb = require("./config/db");
require("dotenv").config({ path: "./config/.env" });

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./model/user");
const { create } = require("express-handlebars");

const sendEmail = require("./services/sendEmail");

app.use(express.json());

const urlEncodedParser = express.urlencoded({ extended: false });
app.use(urlEncodedParser);

const hbs = create({});

//Set handlebar
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// app.set("views", "./views");

//Work with real flowFrom:
// app.get("/contact", async (req, res) => {
//   res.render("contact", { msg: "Kseniia" });
// });

// app.post("/send", async (req, res) => {
//   const emailSuccesMessage = await sendEmail(req.body);
//   if (emailSuccesMessage) {
//     return res.status(200).redirect("/contact");
//   }

//   return res.status(400).send("Неудалось отправить имейл");
// });

//Set authRouter
const authRouter = require("./routers/authRouter");
// console.log(authRouter);
app.use("/", authRouter);

connectDb();

const { PORT = 5050 } = process.env;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error, _) => {
  console.log(`Error: ${error.message}`);
  server.close(() => {
    return process.exit(1);
  });
});
