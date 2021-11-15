import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    username: string

    @Column()
    password: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}