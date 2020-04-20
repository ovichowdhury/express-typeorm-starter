import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class ApplicantPicture {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "bytea"
    })
    data: Buffer;

    @Column()
    mimeType: string;

    @CreateDateColumn()
    createDate: Date;
}