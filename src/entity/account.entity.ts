import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Applicant } from "./applicant.entity";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        default: "s"
    })
    type: string;

    @CreateDateColumn()
    createDate: Date;

    @OneToMany(type => Applicant, applicant => applicant.account, {
        cascade: true
    })
    applicants: Applicant[];
}