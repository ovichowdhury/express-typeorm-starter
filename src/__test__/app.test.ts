import request from 'supertest';
import app from '../app';

test('[TEST] App health check', function () {
  return request(app).get('/_health').send({}).expect(200);
});
