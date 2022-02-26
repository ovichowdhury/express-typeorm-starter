import appConfig from '@config/app.config';
import app from 'app';
import * as http from 'http';

(async function () {
  const server: http.Server = http.createServer(app);

  server.listen(appConfig.port, () => {
    // eslint-disable-next-line no-console
    console.log('Environment: ', appConfig.env);
    // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${appConfig.port}`);
  });
})();
