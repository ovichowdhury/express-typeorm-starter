import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable} from "typeorm";
import { Role } from "./role.entity";


@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createDate: Date;

    @ManyToMany(type => Role, role => role.persons)
    @JoinTable()
    roles: Role[];
}