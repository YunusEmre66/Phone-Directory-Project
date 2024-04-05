import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


enum type { JOB ="iş", HOME = "ev", OTHER = "diğer" }
@Entity()

export class Phone {

    @PrimaryGeneratedColumn()
    id : number;

    @Column( {type : "enum" , enum: type, default: type.HOME})
    phoneType : string; 

    @Column()
    phoneNumber : string;

    @ManyToOne(() => User, user => user.id) //! bir çok telefon bir kullanıcıya ait olabilir
    @JoinColumn() 
    user : User;
}