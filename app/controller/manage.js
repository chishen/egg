'use strict';
const Controller = require('egg').Controller;
let token = 'kvs25XKdz4kxGXqfvh1FfT4CmJ64WX8P';
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
  // 权限校验
  verify(ctx) {
    let t = ctx.cookies.get('token');
    if(t === token) {
      return true
    }else {
      ctx.body = {
        code: '0001',
        msg: '无访问权限'
      };
      return false
    }
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
    const params = ctx.request.body;
    const result = await ctx.service.manage.postLogin(params);
    if(result.code === '0000'){
      ctx.cookies.set('token', token,{
        maxAge: 7*24*3600*1000
      });
    }
    ctx.body = result;
  }
  // 获取数据
  async getData (ctx) {
    if(this.verify(ctx)) {
      
    }
  }
}

module.exports = ManageController;
