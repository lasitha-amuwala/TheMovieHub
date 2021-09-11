const express = require('express');

const createRouter = (routes) => {
  const router = express.Router();
  routes.forEach(([method, path, controller]) => {
    router[method](path, controller);
  });
  return router;
};

module.exports = createRouter;
