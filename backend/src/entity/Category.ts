import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Item} from "./Item";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    current: boolean;

    @ManyToMany(() => Item)
    @JoinTable()
    items: Item[];
}