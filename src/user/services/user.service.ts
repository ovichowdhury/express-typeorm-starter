import BaseService from '@global/types/base.interface';
import { Service } from 'typedi';

@Service()
export default class UserService implements BaseService {
  constructor() {}
  create() {
    throw new Error('Method not implemented.');
  }
  get() {
    throw new Error('Method not implemented.');
  }
}
