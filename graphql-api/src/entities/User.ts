import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}
registerEnumType(Roles, {
  name: "Roles",
  description: "Roles for users in this app",
});

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  mail: string;

  @Field()
  @Column()
  hashedPassword: string;

  @Field(() => [Roles])
  @Column("simple-array", { default: Roles.USER })
  roles: Roles[];
}
