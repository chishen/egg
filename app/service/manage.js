'use strict';
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const Service = require('egg').Service;
const crypto = require('crypto');

class ManageService extends Service {
  constructor (ctx) {
    super(ctx);
    this.MANAGE = this.app.mysql.get('db_manage');
  };
  
  // 查询组件Api
//   async getApi (id) {
//     const detail = await this.MANAGE.select('api', {
//       where: {component_id: parseInt(id)}
//     })
//     return detail
//   }

  // 管理员登录
//   async postLogin (params) {
//     const md5 = crypto.createHash('md5');
//     const passwordMD5 = md5.update(params.password).digest('hex');
//     const result = await this.MANAGE.select('user', {
//       where: {name: params.name || ''},
//       columns: ['password', 'name']
//     });
//     if (result.length) {
//       if (passwordMD5 === result[0].password) {
//         return { 
//           code: '0000',
//           msg: null,
//           userName: result[0].name
//         }
//       } else {
//         return { 
//           code: '0001',
//           msg: '密码错误',
//           userName: null
//         }
//       }
//     } else {
//       return { 
//         code: '0001',
//         msg: '用户不存在',
//         userName: null
//       }
//     }
//   }
}

module.exports = ManageService;
