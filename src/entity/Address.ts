import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Country } from "./Country";
import { City } from "./City";
import { District } from "./District";
import { Town } from "./Town";

enum type {
  JOB = "iş",
  HOME = "ev",
}

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: type, default: type.HOME })
  addressType: type;

  @Column()
  addressLine: string;

  @Column()
  street: string;

  @Column()
  post_code: string;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.id) //! bir çok adres bir kullanıcıya ait olabilir, bu veriler veritabanına veya req.body tarafına elle girilen veriler değil. id verileri req.body ye elle veri girdiğimizde otomatik olarak oluşur.
  @JoinColumn()
  user: User;

  @ManyToOne(() => Country, (country) => country.id)
  @JoinColumn()
  country: Country;

  @ManyToOne(() => City, (city) => city.id)
  @JoinColumn()
  city: City;

  @ManyToOne(() => District, (district) => district.id)
  @JoinColumn()
  district: District;

  @ManyToOne(() => Town, (town) => town.id)
  @JoinColumn()
  town: Town;
}
