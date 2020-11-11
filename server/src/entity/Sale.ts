import { ObjectType, Field, ID } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import User from './User';
import Product from './Product';

@Entity()
@ObjectType()
class Sale extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
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

  @OneToMany(() => Product, (product) => product.sale, {
    cascade: ['insert', 'update'],
  })
  @Field(() => [Product])
  products: Product[];
}

export default Sale;
