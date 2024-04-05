import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./Country";
import { District } from "./District";
import { Address } from "./Address";


@Entity()

export class City {
    
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    name : string;

    @ManyToOne(() => Country, (country) => country.city)
    @JoinColumn()
    country: Country;

    @OneToMany(() => District, (district) => district.city)
    district: District;

    @OneToMany(() => Address, (address) => address.city)
    address: Address;

}