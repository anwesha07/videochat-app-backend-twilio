const httpServer = require('./app');
require('./db');

httpServer.listen(8000, () => {
  console.log('server started at port 8000');
});
