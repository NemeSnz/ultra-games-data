import { Publisher } from '../publishers/publishers.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';

export const arrayTransformer = {
  to: (value: string[]): string =>
    '{' + value.filter((str) => str).join(',') + '}',
  from: (concatenated: string): string[] => {
    if (Array.isArray(concatenated)) return concatenated;
    return concatenated
      .replace(/\{|\}/g, '')
      .split(',')
      .filter((str) => str);
  },
};

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column('text', { array: true, default: '[]', transformer: arrayTransformer })
  tags: string[];

  @Column()
  releaseDate: Date;

  @ManyToOne(() => Publisher, (publisher) => publisher.games)
  publisher: Publisher;
}
