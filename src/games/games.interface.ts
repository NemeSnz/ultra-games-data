export interface GameModel {
  id: number;
  title: string;
  price: number;
  // publisher;
  tags: string[];
  releaseDate: Date;
  publisherId: number;
}
