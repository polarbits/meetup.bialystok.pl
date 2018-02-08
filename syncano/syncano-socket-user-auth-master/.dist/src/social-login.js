'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fb = require('fb');

var _fb2 = _interopRequireDefault(_fb);

var _syncanoServer = require('syncano-server');

var _syncanoServer2 = _interopRequireDefault(_syncanoServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ctx => {
  const { users, response, logger } = (0, _syncanoServer2.default)(ctx);
  const { debug } = logger('hello script');

  // const network = ctx.args.network
  const accessToken = ctx.args.access_token;

  _fb2.default.api('me', { fields: 'id,name', access_token: accessToken }, async res => {
    debug('fb response', res);
    try {
      debug('finding user');
      const user = await users.fields('id', 'user_key', 'full_name', 'groups', 'created_at').firstOrCreate({
        username: res.id
      }, {
        username: res.id,
        password: Math.random().toString(36).slice(-8),
        full_name: res.name
      });
      debug('user', user);
      return response.json(user);
    } catch (err) {
      debug('user not found');
      return response.json({ msg: 'Error!' }, 400);
    }
  });
};