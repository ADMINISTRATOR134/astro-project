// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import errorHandler from './utils/errorHandler.js'; // обработчик ошибок
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Функция запуска сервера
async function start() {
  try {
    // Подключение к MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/astro-project', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Подключено к MongoDB');

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Маршруты
    app.use('/api/auth', authRoutes);

    // Тестовый маршрут
    app.get('/', (req, res) => {
      res.send('🚀 Сервер работает!');
    });

    // Глобальный обработчик ошибок
    app.use(errorHandler);

    // Запуск сервера
    app.listen(PORT, () => console.log(`✅ Сервер запущен на порту: ${PORT}`));
  } catch (error) {
    console.error('❌ Ошибка запуска сервера:', error.message);
    process.exit(1);
  }
}

start();
