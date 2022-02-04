import { PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
