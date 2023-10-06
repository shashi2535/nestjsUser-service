import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HeroesService } from 'src/proto-types/user';
import { UserService } from './user.service';

@Controller()
export class UserController implements HeroesService {
  constructor(private userService: UserService) {}
  @GrpcMethod('HeroesService', 'FindOne')
  async FindOne(data) {
    return this.userService.getOneData(data);
  }
}
