import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getOneData(data: { id: number }) {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
