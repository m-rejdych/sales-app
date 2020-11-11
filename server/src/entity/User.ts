import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Root, ID } from 'type-graphql';

import Sale from './Sale';

@Entity()
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @OneToMany(() => Sale, (sale) => sale.user, {
    cascade: ['insert', 'update'],
  })
  @Field(() => [Sale])
  sales: Sale[];

  @Column()
  password: string;

  @Field()
  fullName(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
}

export default User;
