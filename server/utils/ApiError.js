// server/utils/ApiError.js

export class ApiError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  
    static badRequest(message = 'Некорректный запрос') {
      return new ApiError(400, message);
    }
  
    static unauthorized(message = 'Не авторизован') {
      return new ApiError(401, message);
    }
  
    static forbidden(message = 'Доступ запрещен') {
      return new ApiError(403, message);
    }
  
    static notFound(message = 'Не найдено') {
      return new ApiError(404, message);
    }
  
    static internal(message = 'Внутренняя ошибка сервера') {
      return new ApiError(500, message);
    }
  }
  