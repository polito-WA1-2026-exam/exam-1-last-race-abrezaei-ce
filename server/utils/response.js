export const sendSuccess = (res, data = null, message = "", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data: data,
    message: message,
  });
};

export const sendError = (res, message = "Error", statusCode = 500, data = null) => {
  return res.status(statusCode).json({
    success: false,
    data: data,
    message: message,
  });
};