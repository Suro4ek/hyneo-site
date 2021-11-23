import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Promocode} from "./Promocode";

export enum Process_Pay{
    IN_PROCCESS="in_proccess",
    PAID="paid",
    give="given"
}

@Entity()
export class Pay{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"longtext"})
    items: string;

    @Column({type: "enum", enum: Process_Pay, default: Process_Pay.IN_PROCCESS})
    process: Process_Pay

    @Column()
    nickname: string;

    @ManyToOne(() => Promocode)
    @JoinColumn()
    promocode: Promocode;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}