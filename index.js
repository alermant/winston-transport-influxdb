const Transport = require('winston-transport');
const Influx = require('influx');

class InfluxDb extends Transport {
  constructor(options = {}) {
    super(options);

    const port = options.influxDb.port || '8086';
    const host = options.influxDb.host || 'localhost';
    const username = options.influxDb.username || '';
    const password = options.influxDb.password || '';
    const database = options.influxDb.database || 'logs';
    this.measurement = options.influxDb.database || 'measurement';

    const url = `http://${username}:${password}@${host}:${port}/${database}`;
    this.client = new Influx.InfluxDB(url);
  }

  async log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    await this.client.writePoints([{
      measurements: this.measurement,
      fields: Object.values(info),
    }]);

    callback();
  }

};

module.exports = InfluxDb;