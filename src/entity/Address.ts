import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

enum type { JOB = "iş", HOME= "ev", OTHER = "diğer", SCHOOL = "okul"}


@Entity ()
export class Address {

    @PrimaryGeneratedColumn()
    id : number;

    @Column( {type: "enum", enum: type, default: type.HOME})
    addressType : type;;

    @Column()
    addressLine: string; 

    @Column()
    post_code : string;
    
    @Column()
    location : string;

    @ManyToOne(() => User, user => user.id)  //! bir çok adres bir kullanıcıya ait olabilir
    user : User;

}