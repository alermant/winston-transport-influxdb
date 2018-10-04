# winston-transport-influxdb

```javascript
const Transport = require('./index');
const logger = createLogger({
  transports: [new Transport()]
});
logger.warn({"message": "my message"});
```