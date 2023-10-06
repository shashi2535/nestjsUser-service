import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HeroesService } from './proto-types/user';

@Controller()
export class HeroesController implements HeroesService {
  @GrpcMethod('HeroesService', 'FindOne')
  async FindOne(data: { id: number }) {
    console.log('data in user service');
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
