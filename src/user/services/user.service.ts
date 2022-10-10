import User from '@database/entity/user/user.entity';
import AppDataSource from '@database/index';
import BaseService from '@global/types/base.interface';
import { ICreateUser, IUpdateUser } from '@user/types/user.interface';
import { Service } from 'typedi';
import { EntityManager } from 'typeorm';

@Service()
export default class UserService implements BaseService {
  constructor() {}
  // create a new user
  async create(data: ICreateUser, tem?: EntityManager): Promise<User> {
    const manager: EntityManager = tem || AppDataSource.manager;
    let newUser: User = await manager.getRepository(User).create({
      ...data,
    });
    newUser = await manager.getRepository(User).save(newUser);
    return newUser;
  }
  // get user list
  async get(tem?: EntityManager): Promise<User[]> {
    const manager: EntityManager = tem || AppDataSource.manager;
    return await manager.getRepository(User).find({
      order: { createDate: 'DESC' },
    });
  }
  // update user data
  async update(id: number, data: IUpdateUser, tem?: EntityManager): Promise<User | null> {
    const manager: EntityManager = tem || AppDataSource.manager;
    return await manager
      .createQueryBuilder()
      .update(User)
      .set({ ...data })
      .where('id = :id', {
        id,
      })
      .returning('*')
      .execute()
      .then((response) => {
        return response.raw[0];
      });
  }
  // delete a user
  async delete(id: number, tem?: EntityManager): Promise<number> {
    const manager: EntityManager = tem || AppDataSource.manager;
    await manager.getRepository(User).delete(id);
    return id;
  }
}
