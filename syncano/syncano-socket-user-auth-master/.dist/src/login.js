'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require('@syncano/core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async ctx => {
  const { users, response, logger } = new _core2.default(ctx);
  const { username, password } = ctx.args;

  const { debug } = logger('user:auth:login');

  try {
    const authorizedUser = await users.login({ username, password });

    response.json({
      token: authorizedUser.user_key,
      username: authorizedUser.username
    });
  } catch (err) {
    debug(err);
    response.json({ message: 'Given credentials are invalid.' }, 400);
  }
};