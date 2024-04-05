import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { District } from "./District";
import { Address } from "./Address";

@Entity()
export class Town {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => District, (district) => district.town)
  district: District;

  @OneToMany(() => Address, (address) => address.town)
  address: Address;
}
