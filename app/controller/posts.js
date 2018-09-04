'use strict';

exports.index = async ctx => {
  ctx.body = 'index';
};

exports.new = async ctx => {
  ctx.body = `user: ${ctx.params[0]}`;
};

exports.create = async () => {};

exports.show = async () => {};

exports.edit = async () => {};

exports.update = async () => {};

exports.destroy = async () => {};

exports.album = async ctx => {
  ctx.body = 'hello';
};