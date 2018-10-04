const Transport = require('../index');
const { createLogger  } = require('winston');

describe('transport', function () {
  it('should log', function () {
    const transport = new Transport();
    transport.log({level: 'info', message: 'test'}, () => {});
  });

  it('should log using winston', function () {
    const logger = createLogger({
      transports: [new Transport()]
    });
    logger.log({level: 'info', message: 'message'});
    logger.warn({"message": "my message"});
  })
});