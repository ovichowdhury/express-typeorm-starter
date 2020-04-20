import { Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Entity, OneToOne, JoinColumn } from "typeorm";
import { Account } from "./account.entity";
import { ApplicantPicture } from "./applicant-picture.entity";

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

    @OneToOne(type => ApplicantPicture, {
        cascade: true
    })
    @JoinColumn()
    applicantPicture: ApplicantPicture;
}