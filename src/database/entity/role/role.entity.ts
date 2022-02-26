import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  createdBy!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createDate!: Date;

  @Column({ nullable: true })
  updatedBy!: string;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
  updateDate!: Date;
}
