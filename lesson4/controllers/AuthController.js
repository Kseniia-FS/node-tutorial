const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { validationResult } = require("express-validator");

class AuthController {
  async register(req, res) {
    const { email, password, firstName, lastName } = req.body;
    // if (!email || !firstName || !password || !lastName) {
    //   return res.status(400).send("Введите все поля корректно!");
    // }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Ошибка регистрации", errors });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(409)
        .send("Пользователь уже существует. Совершите вход");
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
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Введите все поля корректно!");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("Пожалуйста зарегистрируйтесь");
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword || email !== user.email) {
      res.status(401).send("Неправильный логин или пароль");
    }

    if (!req.headers.authorization) {
      return res.status(401).send("Пользователь не авторизирован");
    }

    const [bearer, tokenFromHeaders = ""] =
      req.headers.authorization.split(" ");

    if (!tokenFromHeaders && !bearer) {
      return res.status(401).send("Пользователь не авторизирован");
    }

    try {
      const { user_id } = jwt.decode(
        tokenFromHeaders,
        process.env.TOKEN_SECRET_KEY
      );

      if (user_id === user._id) {
        return res.status(200).send("Пользователь успешно залогинился");
      } else {
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
  }

  async logout(req, res) {
    if (!req.headers.authorization) {
      return res.status(401).send("Пользователь не авторизирован");
    }

    const [bearer, tokenFromHeaders = ""] =
      req.headers.authorization.split(" ");

    if (!tokenFromHeaders && !bearer) {
      return res.status(401).send("Пользователь не авторизирован");
    }

    try {
      const { user_id } = jwt.verify(
        tokenFromHeaders,
        process.env.TOKEN_SECRET_KEY
      );
      const user = await User.findByIdAndUpdate(user_id, { token: null });
      return res.status(200).send("Пользователь успешно разлогинился");
    } catch (error) {
      return res.status(401).send("Токен не валидный (срок истек)");
    }
  }
}

module.exports = new AuthController();
