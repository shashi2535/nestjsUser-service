import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from 'src/dto/createUserDto';
import { User } from 'src/model';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async Signup(request: UserCreateDto) {
    try {
      console.log('singup function');
      const { email, name, password } = request;
      const userData = await this.userRepository.findOne({
        where: { email: email },
      });
      if (userData) {
        return {
          statusCode: 400,
          message: 'User Already Exist',
          result: {},
        };
      }
      const data = this.userRepository.create({
        email,
        name,
        password,
        userUuid: uuid(),
      });
      const result = await this.userRepository.save(data);
      const completeUser = await this.userRepository.findOne({
        where: { userUuid: result.userUuid },
      });
      console.log('result', completeUser);
      const obj = {
        statusCode: 200,
        message: 'User Signup Successfully',
        result: {
          name: result.name,
          email: result.email,
          userUuid: result.userUuid,
          password: result.password,
          createdAt: result?.createdAt?.toISOString(),
          updatedAt: result?.updatedAt?.toISOString(),
        },
      };
      return obj;
    } catch (err) {
      console.log('errrr>>>', err);
      throw new Error(err.message);
    }
  }
}
