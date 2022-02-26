import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  password!: string;

  @Column({ unique: true })
  mobile!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  gender!: string;

  @Column()
  createdBy!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createDate!: Date;

  @Column({ nullable: true })
  updatedBy!: string;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
  updateDate!: Date;
}
