import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';
import { SignInInfoDto } from './dto/sign-in-info.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createToken({
    id,
    login,
    password,
  }: UserEntity): Promise<SignInInfoDto> {
    const user: UserDto = { id, login, password };
    const secret = process.env.JWT_SECRET;
    return { access_token: await jwt.sign(user, secret) };
  }

  async createUser(login: string, password: string) {
    return await this.userRepository.create({ login, password }).save();
  }

  async getUserByLogin(login: string) {
    return await this.userRepository.findOne({ login });
  }

  async signInService(login: string, password: string) {
    let user = await this.getUserByLogin(login);

    if (!user) {
      user = await this.createUser(login, password);
    }
    return this.createToken(user);
  }
}
