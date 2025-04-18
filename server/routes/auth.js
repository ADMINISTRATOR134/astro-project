// server/routes/auth.js
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

// Регистрация
router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('Заполните все поля');
      error.status = 400;
      throw error;
    }

    const candidate = await User.findOne({ email });

    if (candidate) {
      const error = new Error('Такой пользователь уже существует');
      error.status = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Регистрация успешна' });
  } catch (error) {
    next(error);
  }
});

// Логин
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('Заполните все поля');
      error.status = 400;
      throw error;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('Пользователь не найден');
      error.status = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error('Неверный пароль');
      error.status = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id },
      'secret-key', // потом обязательно заменить на ENV переменную
      { expiresIn: '1h' }
    );

    res.json({ message: 'Успешный вход', token });
  } catch (error) {
    next(error);
  }
});

export default router;
