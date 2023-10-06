import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  IUserService,
  signupRequest,
  signupResponse,
} from 'src/proto-types/src/proto/user';
import { UserService } from './user.service';

@Controller()
export class UserController implements IUserService {
  constructor(private userService: UserService) {}
  @GrpcMethod('UserService', 'Signup')
  async Signup(request: signupRequest): Promise<signupResponse> {
    return this.userService.Signup(request);
  }
}
