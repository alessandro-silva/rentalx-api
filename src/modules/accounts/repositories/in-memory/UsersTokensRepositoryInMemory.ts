import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { UserToken } from '../../infra/typeorm/entities/UserToken';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserToken[] = [];

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(userToken => userToken.id === id);

    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }
  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      userToken => userToken.refresh_token === refresh_token,
    );

    return userToken;
  }

  // async findById(id: string): Promise<UserToken> {
  //   const user = this.usersTokens.find(user => user.id === id);

  //   return user;
  // }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      userToken =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token,
    );

    return userToken;
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
