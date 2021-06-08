import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,  } from "typeorm";
import Produto from "./product";

@Entity('menu')
export default class Menu {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: "varchar", length: 40, nullable: true })
    name: string

    @Column({ type: "varchar", length: 40, nullable: true })
    category: string

    @Column({ type: "varchar", length: 40, nullable: true })
    type: string
}