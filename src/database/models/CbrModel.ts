import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: 'cbr_currency'
})

export class CbrModel{

    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    prefix: string;

    @Column({type: "float", nullable: false})
    value: number

    @CreateDateColumn()
    createdAt: Date

    @Column()
    updatedAt: string
}

