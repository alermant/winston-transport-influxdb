const Transport = require('../index');

describe('transport', function () {
  it('should log', function () {
    const transport = new Transport();
    transport.log({level: 'info', message: 'test'}, () => {});
  });
});