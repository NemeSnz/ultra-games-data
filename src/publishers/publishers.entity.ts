import { Game } from '../games/games.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  siret: number;

  @Column()
  phone: string;

  @OneToMany(() => Game, (game) => game.publisher)
  games: Game[];
}
