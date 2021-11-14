import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Item{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    price: number;

    @Column()
    discprice: number;

    @Column()
    desc: String;

    @Column()
    img: String;

    @Column({
        default: '0'
    })
    count: Number

    @Column()
    command: String
}