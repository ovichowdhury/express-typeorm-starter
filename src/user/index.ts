import { GlobalModuleConfig } from '@global/index';
import { Application } from 'express';
import userRouter from '@user/routes/user.route';

export class UserModule extends GlobalModuleConfig {
  constructor(app: Application) {
    super(app, 'user');
  }

  init() {
    this.app.use(this.pathVx('/'), userRouter);
  }
}
