'use strict';

const Controller = require('egg').Controller;
class WeixinController extends Controller {
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

  //初始化接口
  async init (ctx) {
    let csrfToken = ctx.request.header.cookie;
    console.log(csrfToken)
    // let csrfToken = ctx.cookies.get('csrfToken');
    // ctx.cookies.set('csrfToken', 'yh2GHvCPIBvOG2nw6fI9sGDU');
    // ctx.session.csrfToken = 'yh2GHvCPIBvOG2nw6fI9sGDU';
    // let csrfToken = this.randomString();
    ctx.cookies.set('csrfToken', csrfToken);
    ctx.body = csrfToken;
  }
  // 查询组件列表
  async getList (ctx) {
    let List = await ctx.service.weixin.getList();
    ctx.body = List
  }
  // 查询组件详情
  async getDetail (ctx) {
    const query = ctx.query;
    const result = await ctx.service.weixin.getDetail(query);
    ctx.body = result;
  }
  // 查询组件Api
  async getApi (ctx) {
    const query = ctx.query;
    const id = query.id || '';
    const result = await ctx.service.weixin.getApi(id);
    ctx.body = result;
  }
  // 管理员登录
  async postLogin (ctx) {
    const params = ctx.request.body;
    const result = await ctx.service.weixin.postLogin(params);
    ctx.body = result;
  }
  // 编辑代码
  async postEditCode (ctx) {
    const params = ctx.request.body;
    const result = await ctx.service.weixin.postEditCode(params);
    ctx.body = result;
  }
  // 新增组件
  async postAddComponent (ctx) {
    const params = ctx.request.body;
    const result = await ctx.service.weixin.postAddComponent(params);
    ctx.body = result;
  }
  // 保存Api
  async saveApi (ctx) {
    const params = ctx.request.body;
    const result = await ctx.service.weixin.saveApi(params);
    ctx.body = result;
  }
  // 删除Api
  async deleteApi (ctx) {
    const params = ctx.request.body;
    const result = await ctx.service.weixin.deleteApi(params);
    ctx.body = result;
  }
  // 删除Component
  async deleteComponent (ctx) {
    const params = ctx.request.body;
    let id = params.id || '';
    const result = await ctx.service.weixin.deleteComponent(id);
    ctx.body = result;
  }
}

module.exports = WeixinController;
