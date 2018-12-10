'use strict';
const Controller = require('egg').Controller;
class ManageController extends Controller {
  // 生成随机token
  randomString (len) {
    len = len || 32;
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var maxPos = chars.length;
    var token = '';
    for (let i = 0; i < len; i++) {
		  // 0~32的整数
      token += chars.charAt(Math.floor(Math.random() * (maxPos+1)));
    }
    return token;
  }

  // 查询组件Api
//   async getApi (ctx) {
//     const query = ctx.query;
//     const id = query.id || '';
//     const result = await ctx.service.manage.getApi(id);
//     ctx.body = result;
//   }
  // 管理员登录
  async postLogin (ctx) {
    // const params = ctx.request.body;
    // console.log(params,999)
    // const result = await ctx.service.manage.postLogin(params);
    let csrfToken = this.randomString();
    ctx.cookies.set('csrfToken', csrfToken);
    ctx.body = csrfToken;
    // ctx.body = '111';
  }
}

module.exports = ManageController;
