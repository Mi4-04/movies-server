import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  createToken({ id, login, password }: UserEntity) {
    const user: UserDto = { id, login, password };
    const secret = process.env.JWT_SECRET;
    return jwt.sign(user, secret);
  }

  createUser(login: string, password: string) {
    return this.userRepository.create({ login, password }).save();
  }

  getUserByLogin(login: string) {
    return this.userRepository.findOne({ login });
  }
}
