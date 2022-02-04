import { Publisher } from 'src/publishers/publishers.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column('text', { array: true, default: '{}' })
  tags: string[];

  @Column()
  releaseDate: Date;

  @ManyToOne(() => Publisher, (publisher) => publisher.games)
  publisher: Publisher;
}
