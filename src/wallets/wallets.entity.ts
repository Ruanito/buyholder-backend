import { User } from '../users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const typeEnums = ['fii', 'stock', 'brazil_stock'];

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'enum', enum: typeEnums, default: 'brazil_stock' })
  type: string;

  @Column()
  userId: number;

  @OneToMany(() => User, (user) => user.wallets)
  user: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;
}
