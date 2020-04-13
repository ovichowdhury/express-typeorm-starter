import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import Profile from "./profile.entity";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToOne(type => Profile, {
        cascade: true
    })
    @JoinColumn()
    profile: Profile;

}