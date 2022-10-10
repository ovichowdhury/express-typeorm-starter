import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  mobile!: string;

  @Column()
  email!: string;

  @Column()
  gender!: string;

  //later added
  @Column({ nullable: true })
  age!: number;

  @Column()
  createdBy!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createDate!: Date;

  @Column({ nullable: true })
  updatedBy!: string;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
  updateDate!: Date;
}
