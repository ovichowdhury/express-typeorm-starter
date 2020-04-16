import { Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Entity } from "typeorm";
import { Account } from "./account.entity";

@Entity()
export class Applicant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        length: 20
    })
    nid: string;

    @Column()
    verificationDate: Date;

    @CreateDateColumn()
    createDate: Date;

    @ManyToOne(type => Account, account => account.applicants)
    account: Account;
}