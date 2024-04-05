import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()

export class Email {

    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    emailType : string;

    @Column()
    emailAddress: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User;

}