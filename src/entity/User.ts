import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Address } from "./Address";
import { Phone } from "./Phone";
import { Email } from "./Email";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToMany(() => Email, (email) => email.user)
  email: Email;

  @OneToMany(() => Address, (address) => address.user)
  address: Address;

  @OneToMany(() => Phone, (phone) => phone.user)
  phone: Phone;
}
