"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes/routes"));

var _loggers = require("./logging/loggers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = 3500;
app.use(_express.default.json());
app.use(_routes.default);
app.listen(port, () => {
  _loggers.logger.info(`Server listening on ${port}`);
});