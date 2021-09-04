import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async list(): Promise<User[]> {
    const all = this.users;

    return all;
  }

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);

    return user;
  }

  async save({
    id,
    email,
    name,
    password,
    driver_license,
    avatar,
  }: ICreateUserDTO): Promise<User> {
    const user = this.users.find(user => user.id === id);

    user.name = name;
    user.email = email;
    user.password = password;
    user.driver_license = driver_license;
    user.avatar = avatar;

    return user;
  }
}

export { UsersRepositoryInMemory };
