import { BeforeInsert, Column, Entity, getRepository, Like, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Barcode {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  barcode: string;

}