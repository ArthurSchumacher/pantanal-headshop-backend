import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cep: number;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  district: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @ManyToOne(() => User, (user) => user.addresses, { eager: true })
  user: User;
}
