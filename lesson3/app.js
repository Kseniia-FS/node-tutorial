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

app.use(express.json());

app.post("/register", async (req, res) => {
  // получаем данные от пользователя (имейл, пароль, имя...)
  // делаем валидацию полей от пользователя
  // проверяем есть ли пользователь в базе
  // если есть - сообщаем что пользовател есть
  // если нет - шифруем пароль
  // поле шифрования, создаем пользователя в базе данных
  // генерим токен для пользователя
  // отправляем ответ клиенту что все ок с регистрацией

  const { email, password, firstName, lastName } = req.body;
  if (!email || !firstName || !password || !lastName) {
    return res.status(400).send("Введите все поля корректно!");
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).send("Пользователь уже существует. Совершите вход");
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { user_id: newUser._id },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "2h" }
  );

  newUser.token = token;
  await newUser.save();

  res.status(201).json({ newUser });
});
app.post("/login", async (req, res) => {
  // получаем данные от пользователя (имейл, пароль, имя...)
  // делаем валидацию полей от пользователя
  // проверяем есть ли пользователь в базе
  // если нет пользователя в базе - сообщаем что нужно зарегистрироваться
  // если есть - проверяем логин и пароль на валидность
  // проверяем вдруг пользователь уже залогинен. У него есть токен в базе и токен валидный. Т.е делаем проверку токена на валидность.
  // если логин или пароль не совпадает - выдаем ошибку аутентификации
  // если логин и пароль совпадают - делаем ответ клиенту УСПЕХ

  // получаем данные от пользователя (имейл, пароль, имя...)
  const { email, password } = req.body;
  // делаем валидацию полей от пользователя
  if (!email || !password) {
    return res.status(400).send("Введите все поля корректно!");
  }
  // проверяем есть ли пользователь в базе
  const user = await User.findOne({ email });
  // если нет пользователя в базе - сообщаем что нужно зарегистрироваться
  if (!user) {
    return res.status(401).send("Пожалуйста зарегистрируйтесь");
  }
  // если есть - проверяем логин и пароль на валидность
  const correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword || email !== user.email) {
    res.status(401).send("Неправильный логин или пароль");
  }

  // проверяем вдруг пользователь уже залогинен. У него есть токен в базе и токен валидный. Т.е делаем проверку токена на валидность.
  // проверяем предали ли заголовки
  // делаем проверку валидности токена из заголовков
  // расшифровываем токен
  // если в токене есть айди то токен валидный и пользователь может быть залогинен
  // если в токене нет айди то токен не действительныйб тогда выдаем новй токен

  //проверяем предали ли заголовки
  if (!req.headers.authorization) {
    return res.status(401).send("Пользователь не авторизирован");
  }
  // делаем проверку валидности токена из заголовков
  const [bearer, tokenFromHeaders = ""] = req.headers.authorization.split(" ");

  if (!tokenFromHeaders && !bearer) {
    return res.status(401).send("Пользователь не авторизирован");
  }

  try {
    // расшифровываем токен
    const { user_id } = jwt.decode(
      tokenFromHeaders,
      process.env.TOKEN_SECRET_KEY
    );
    // если в токене есть айди то токен валидный и пользователь может быть залогинен
    if (user_id === user._id) {
      return res.status(200).send("Пользователь успешно залогинился");
    } else {
      // если в токене нет айди то токен не действительныйб тогда выдаем новй токен
      const token = jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "2h" }
      );
      user.token = token;
      await user.save();
      return res.status(200).send("Пользователь успешно залогинился");
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/logout", async (req, res) => {
  // получаем токен из заголовков
  // расшифровуем токен
  // если в токене есть айди - то в базе у юзера удаляем токен
  // если айди нет - токен не валидный (срок истек)

  // получаем токен из заголовков
  if (!req.headers.authorization) {
    return res.status(401).send("Пользователь не авторизирован");
  }
  // делаем проверку валидности токена из заголовков
  const [bearer, tokenFromHeaders = ""] = req.headers.authorization.split(" ");

  if (!tokenFromHeaders && !bearer) {
    return res.status(401).send("Пользователь не авторизирован");
  }

  try {
    // расшифровываем токен
    const { user_id } = jwt.verify(
      tokenFromHeaders,
      process.env.TOKEN_SECRET_KEY
    );
    const user = await User.findByIdAndUpdate(user_id, { token: null });
    return res.status(200).send("Пользователь успешно разлогинился");
  } catch (error) {
    // если айди нет - токен не валидный (срок истек)
    return res.status(401).send("Токен не валидный (срок истек)");
  }
});

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
