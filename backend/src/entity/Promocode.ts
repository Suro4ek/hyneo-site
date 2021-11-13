import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Promocode{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    discount: number

    @Column()
    count: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}