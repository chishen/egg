'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(ctx) {
    const userInfo = await ctx.service.index.find();
    const data = {
      List: userInfo.detail,
    };
    ctx.body = JSON.stringify(data);
  }
  async album(ctx) {
    const datas = {
      lessonInfo: {
        total: 64,
        pageSize: 5,
        pageNum: 1,
      },
      lessonList: [{
        title: '教练式父母课堂《自信孩子养成长记录》教练式父母课堂《自信孩子养成长记录》',
        teacher: '周杰伦',
        pageviews: '1.5',
        price: '100',
        imgUrl: '/static/images/icon_home_home.png',
      }, {
        title: '教练式父母课堂《自信孩子养成长记录》教练式父母课堂《自信孩子养成长记录》',
        teacher: '周杰伦',
        pageviews: '1.5',
        price: '100',
        imgUrl: '/static/images/icon_home_home.png',
      }, {
        title: '教练式父母课堂《自信孩子养成长记录》教练式父母课堂《自信孩子养成长记录》',
        teacher: '周杰伦',
        pageviews: '1.5',
        price: '100',
        imgUrl: '/static/images/icon_home_home.png',
      }],
    };
    ctx.body = JSON.stringify(datas);
  }
}

module.exports = HomeController;
