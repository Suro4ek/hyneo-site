import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Promocode{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    discount: number
}