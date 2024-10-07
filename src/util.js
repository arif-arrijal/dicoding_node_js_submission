module.exports = {
  apiCreated: (h, message, data) => {
    const response = h.response({
      status: 'success',
      message,
      data,
    });

    response.code(201);
    return response;
  },

  apiSuccess: (h, message, data) => {
    const response = h.response({
      status: 'success',
      message,
      data,
    });

    response.code(200);
    return response;
  },

  apiError: (h, message) => {
    const response = h.response({
      status: 'fail',
      message,
    });

    response.code(400);
    return response;
  },

  apiNotFound: (h, message) => {
    const response = h.response({
      status: 'fail',
      message,
    });

    response.code(404);
    return response;
  },
};
