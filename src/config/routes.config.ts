import { GlobalModuleConfig } from '@global/index';
import { UserModule } from '@user/index';
import { Application } from 'express';

export default function configureRoutes(app: Application): GlobalModuleConfig[] {
  const modules: GlobalModuleConfig[] = [];

  modules.push(new UserModule(app));

  return modules;
}
