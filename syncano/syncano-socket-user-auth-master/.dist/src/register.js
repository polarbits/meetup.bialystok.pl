'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require('@syncano/core');

var _core2 = _interopRequireDefault(_core);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async ctx => {
  const { users, response, logger } = new _core2.default(ctx);
  const { username, password } = ctx.args;

  console.log(ctx.args);

  const { debug } = logger('user:auth:register');

  if ((0, _helpers.isEmail)(username)) {
    let user;
    try {
      // Try to find user with this username
      user = await users.where('username', 'eq', username).first();
      if (user) {
        // If there is a user, we can't register him
        return response.json({ username: 'User already exists.' }, 400);
      } else {
        // Let's try to create user account
        user = await users.create({ username, password });
        return response.json({
          id: user.id,
          token: user.user_key,
          username: user.username
        });
      }
    } catch (err) {
      // When something went wrong
      debug(err);
      return response.json({ message: err.message }, 400);
    }
  } else {
    return response.json({ username: 'Given email is invalid.' }, 400);
  }
};