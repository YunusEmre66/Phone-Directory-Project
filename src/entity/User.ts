import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Address } from "./Address";
import { Phone } from "./Phone";

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

  @Column()
  email: string;

  @OneToMany(() => Address, (address) => address.user)
  address: Address;

  @OneToMany(() => Phone, (phone) => phone.user)
  phone: Phone;

  
}
