// server/utils/errorHandler.js
export default function errorHandler(err, req, res, next) {
  console.error('Ошибка:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Что-то пошло не так',
  });
}
