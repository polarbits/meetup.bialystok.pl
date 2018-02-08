'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require('@syncano/core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ctx => {
  const { response, data, users } = new _core2.default(ctx);
  console.log(ctx.meta);
  if (ctx.args.title && ctx.args.description) {
    data.meetups.create({
      title: ctx.args.title,
      description: ctx.args.description
    });
    response.json({
      message: `OK ${ctx.args.title} ${ctx.args.description}!`
    });
  } else {
    response.json({
      message: 'You have to send "firstname" and "lastname" arguments!'
    }, 400);
  }
};