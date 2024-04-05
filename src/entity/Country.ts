import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./City";
import { Address } from "./Address";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => City, (city) => city.country)  //! bir ülkenin bir çok şehri olabilir
  city: City;

  @OneToMany(() => Address, (address) => address.country)  //! bir ülkenin bir çok adresi olabilir
  address: Address;
}
