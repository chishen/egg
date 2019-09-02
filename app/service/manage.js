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
  async postLogin (params) {
    const md5 = crypto.createHash('md5');
    const passwordMD5 = md5.update(params.password).digest('hex');
    const result = await this.MANAGE.select('user', {
      where: {name: params.name || ''}
    });
    if (result.length) {
      if(result[0].time > 0) {
        if (passwordMD5 === result[0].password) {
          const row = {
            time: 3
          }
          const options = {
            where: {
              name: params.name
            }
          }
          const update = await this.MANAGE.update('user', row, options);
          const updateSuccess = update.affectedRows === 1;
          if(updateSuccess){
            return { 
              code: '0000',
              msg: null,
              userName: result[0].name
            }
          }
        } else {
          let time = result[0].time - 1
          const row = {
            time: time
          }
          const options = {
            where: {
              name: params.name
            }
          }
          const update = await this.MANAGE.update('user', row, options);
          const updateSuccess = update.affectedRows === 1;
          if(updateSuccess) {
            return { 
              code: '0001',
              msg: `密码错误，剩余${time}次机会`,
              userName: null
            }
          }
        }
      }else {
        return { 
          code: '0001',
          msg: '该账户已锁定',
          userName: null
        }
      }
    } else {
      return { 
        code: '0001',
        msg: '用户不存在',
        userName: null
      }
    }
  }
}

module.exports = ManageService;
