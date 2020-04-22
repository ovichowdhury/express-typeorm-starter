import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from "typeorm";
import { Person } from "./person.entity";


@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @Column({
        type: "simple-array"
    })
    rolePrivileges: string[];

    @CreateDateColumn()
    createDate: Date;

    @ManyToMany(type => Person, person => person.roles)
    persons: Person[];
}