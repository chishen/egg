'use strict';

const Service = require('egg').Service;

class KukaService extends Service {
  constructor(ctx) {
    super(ctx);
    this.KUKA = this.app.mysql.get('db_kuka');
  };
  async find() {
    // const KUKA = this.app.mysql.get('db_kuka');
    const sql = 'select * from kuka';
    // const sql = 'SELECT `no`, product, `name`, format, size, shelf_size, height, model, type, high_price, `table`, source, material, bed_box, foot_color, color, info FROM kuka';
    const detail = await this.KUKA.query(sql);
    return { detail };
  }
}

module.exports = KukaService;
