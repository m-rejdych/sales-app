import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import Sale from './Sale';

@Entity()
@ObjectType()
class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column('numeric')
  @Field()
  price: number;

  @ManyToOne(() => Sale, (sale) => sale.products, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Sale)
  sale: Sale;
}

export default Product;
