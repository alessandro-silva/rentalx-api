import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '../../../dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '../../../repositories/IUsersTokensRepository';
import { UserToken } from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserToken | undefined> {
    const userToken = await this.repository.findOne({
      refresh_token,
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined> {
    const userToken = await this.repository.findOne({
      user_id,
      refresh_token,
    });

    return userToken;
  }

  // async list(): Promise<UserToken[]> {
  //   const users = await this.repository.find();

  //   return users;
  // }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokensRepository };
