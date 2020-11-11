import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

import User from './User';

@Entity()
@ObjectType()
class Sale extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  subject: string;

  @ManyToOne(() => User, (user) => user.sales, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}

export default Sale;
