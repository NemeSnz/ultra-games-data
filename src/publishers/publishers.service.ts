import { Injectable, NotFoundException } from '@nestjs/common';
import {PublisherModel} from './publishers.interface';

@Injectable()
export class PublishersService {
  private publishers: Array<PublisherModel> = [
    {
      id: 1,
      name: 'Ultra Publishing',
      siret: 246,
      phone: '555-555-5555',
    },
  ];

  public findOne(id: number): PublisherModel {
    const publisher = this.publishers.find((item) => item.id === id);

    if(!publisher) {
      throw new NotFoundException();
    }

    return publisher;
  }
}
