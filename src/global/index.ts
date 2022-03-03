import { Application } from 'express';

export abstract class GlobalModuleConfig {
  constructor(protected app: Application, private moduleName: string) {
    this.init();
  }

  getMoudleName() {
    return this.moduleName;
  }

  pathVx(path: string, version = 'v1') {
    if (path[0] === '/') path = path.substring(1, path.length);
    const pathWithPrefix = `/api/${version}/${this.moduleName}/${path}`;
    return pathWithPrefix;
  }

  abstract init(): void;
}
