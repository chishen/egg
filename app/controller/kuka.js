'use strict';

const Controller = require('egg').Controller;

class KukaController extends Controller {
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

  //初始化数据
  async init(ctx) {
    let csrfToken = this.randomString();
    ctx.cookies.set('csrfToken', csrfToken);
    ctx.body = csrfToken;
  }
  //创建用户
  async createUser(ctx) {
    const params = ctx.request.body;
    const result = await ctx.service.kuka.createUser(params);
    ctx.body = result;
  }
  //查询产品列表
  async product(ctx) {
    const query = ctx.query;
    let name = query.name || '';
    const productList = await ctx.service.kuka.product(name);
    const data = {
      List: productList.result
    };
    ctx.body = JSON.stringify(data);
  }
  //新增客户
  async addGuest(ctx) {
    const params = ctx.request.body;
    const result = await ctx.service.kuka.addGuest(params);
    ctx.body = result;
  }
   //查询客户列表
   async guestList(ctx) {
    const query = ctx.query;
    const result = await ctx.service.kuka.guestList(query);
    ctx.body = 'success';
  }
  //查询用户列表
  async userList(ctx) {
    const query = ctx.query;
    console.log(query)
    const user_id = query.user_id || '';
    const result = await ctx.service.kuka.userList(user_id);
    ctx.body = result;
  }
}

module.exports = KukaController;
