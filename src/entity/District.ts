import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./City";
import { Town } from "./Town";


@Entity() 

export class District {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name : string; 

    @ManyToOne (() => City, (city) => city.id)
    @JoinColumn()
    city : City; 

    @OneToMany(() => Town , (town) => town.district)
    town : Town;







}