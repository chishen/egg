'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class WeixinService extends Service {
  constructor (ctx) {
    super(ctx);
    this.WEIXIN = this.app.mysql.get('db_weixin');
  };
  // 查询组件列表
  async getList () {
    // const weixin = this.app.mysql.get('db_weixin');
    const sql = 'select * from components';
    // const sql = 'SELECT `no`, product, `name`, format, size, shelf_size, height, model, type, high_price, `table`, source, material, bed_box, foot_color, color, info FROM weixin';
    const detail = await this.WEIXIN.select('components', {
      columns: ['id', 'en_name', 'cn_name', 'type']
    });
    return detail;
  }
   // 查询组件详情
   async getDetail (query) {
    let name = query.name;
    let type = query.type;
    const detail = await this.WEIXIN.select('components',{
      where: {
        en_name: name,
        type: type
    }
    });
    return detail;
  }
  // 查询组件Api
  async getApi (id) {
    const detail = await this.WEIXIN.select('api', {
      where: {component_id: parseInt(id)}
    })
    return detail
  }
  // 管理员登录
  async postLogin (params) {
    const md5 = crypto.createHash('md5');
    const passwordMD5 = md5.update(params.password).digest('hex');
    const result = await this.WEIXIN.select('user', {
      where: {name: params.name || ''},
      columns: ['password', 'name']
    });
    if (result.length) {
      if (passwordMD5 === result[0].password) {
        return { 
          code: '0000',
          msg: null,
          userName: result[0].name
        }
      } else {
        return { 
          code: '0001',
          msg: '密码错误',
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
  // 编辑代码
  async postEditCode (params) {
    const row = {
      [params.type]: params.code
    }
    const options = {
      where: {
        id: params.componentId
      }
    }
    const result = await this.WEIXIN.update('components', row, options);
    const updateSuccess = result.affectedRows === 1;
    if (updateSuccess) {
      return {
        code: '0000',
        msg: null
      }
    } else {
      return {
        code: '0001',
        msg: '更新失败'
      }
    }
  }
  // 新增组件
  async postAddComponent (params) {
    const result = await this.WEIXIN.select('components',{
      where: {
        en_name: params.en_name,
        type: params.type
      }
    });
    if (result.length) {
      return {
        code: '0001',
        msg: '该类别的同名组件已存在'
      }
    } else {
      const detail = await this.WEIXIN.insert('components', params);
      if (detail.affectedRows === 1) {
        return {
          code: '0000',
          msg: null
        }
      } else {
        return {
          code: '0001',
          msg: '新增组件失败'
        }
      }
    }
  }
  // 保存Api
  async saveApi (params) {
    let id = parseInt(params.id) || 0;
    const detail = await this.WEIXIN.select('api', {
      where: {id: id}
    })
    if (detail.length) {
      const common = await this.WEIXIN.select('api', {
        where: {
          component_id: params.component_id,
          type: params.type,
          param: params.param
        }
      })
      console.log(common, 'update')
      if (common.length > 1) {
        return {
          code: '0001',
          msg: '已存在同名参数'
        }
      } else {
        const row = {
          param: params.param,
          des: params.des,
          typeof: params.typeof,
          option: params.option,
          default: params.default
        }
        const options = {
          where: {
            id: params.id
          }
        }
        const result = await this.WEIXIN.update('api', row, options)
        if (result.affectedRows === 1) {
          return {
            code: '0000',
            msg: '保存成功'
          }
        } else {
          return {
            code: '0001',
            msg: '保存失败'
          }
        }
      }
    } else {
      const common = await this.WEIXIN.select('api', {
        where: {
          component_id: params.component_id,
          type: params.type,
          param: params.param
        }
      })
      console.log(common, 'insert')
      if (common.length > 0) {
        return {
          code: '0001',
          msg: '已存在同名参数'
        }
      } else {
        const options = {
          param: params.param,
          des: params.des,
          typeof: params.typeof,
          option: params.option,
          default: params.default,
          type: params.type,
          component_id: params.component_id
        }
        const result = await this.WEIXIN.insert('api', options)
        if (result.affectedRows === 1) {
          return {
            code: '0000',
            id: result.insertId,
            msg: '新增成功'
          }
        } else {
          return {
            code: '0001',
            msg: '新增失败'
          }
        }
      }
    }
  }
  // 删除Api
  async deleteApi (params) {
    const result = await this.WEIXIN.delete('api',{
      id: params.id,
    });
    if (result.affectedRows === 1) {
      return {
        code: '0000',
        msg: null
      }
    } else {
      return {
        code: '0001',
        msg: '删除失败'
      }
    }
  }
  // 删除Component
  async deleteComponent (id) {
    const component = await this.WEIXIN.delete('components',{
      id: id,
    });
    const api = await this.WEIXIN.delete('api',{
      component_id: id,
    });
    if (component.affectedRows === 1) {
      return {
        code: '0000',
        msg: null
      }
    } else {
      return {
        code: '0001',
        msg: '组件未成功删除'
      }
    }
  }
}

module.exports = WeixinService;
