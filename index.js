const Transport = require('winston-transport');
const Influx = require('influx');

class InfluxDb extends Transport {
  constructor(options = {}) {
    super(options);

    this.initialized = false;

    options.influxDb  = options.influxDb ? options.influxDb : {};
    const port = options.influxDb.port || '8086';
    const host = options.influxDb.host || 'localhost';
    const username = options.influxDb.username || '';
    const password = options.influxDb.password || '';
    this.database = options.influxDb.database || 'logs';
    this.measurement = options.influxDb.database || 'measurement';

    const url = `http://${username}:${password}@${host}:${port}/${this.database}`;
    this.client = new Influx.InfluxDB(url);
  }

  async init() {
    await this.client.createDatabase(this.database);
    this.initialized = true;
  }

  async log(info, callback) {
    if (!this.initialized) {
      await this.init();
    }
    setImmediate(() => {
      this.emit('logged', info);
    });

    const fieldsData = [];
    Object.keys(info).map(k => {
      fieldsData[k] = info[k];
    });

    await this.client.writePoints([{
      measurement: this.measurement,
      fields: fieldsData,
    }]);

    callback();
  }

};

module.exports = InfluxDb;