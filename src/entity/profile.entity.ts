import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export default class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    picture: string;

    @Column('simple-json')
    details: {};

}