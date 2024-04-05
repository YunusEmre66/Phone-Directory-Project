import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  age: number;

  // @Column()
  // email: string;

  // @Column()
  // phone: string;

  // @Column((address) => Address, { prefix: "address" })
  // address: Address;


}
