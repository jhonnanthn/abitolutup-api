import { AfterLoad, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,  } from "typeorm";
import Image from "./image";
import Menu from "./menu";
import Size from "./size";
//import Produto from "./Produto";
//import Recibo from "./Recibo";
//import Usuario from "./Usuario";

@Entity('product')
export default class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column({ type: "varchar", length: 500, nullable: true })
    description: string
 
    @Column({ type: "varchar", length: 500 })
    instruction: string
 
    @Column({ type: "int", nullable: true })
    maxParcel: number
 
    @Column({type: 'boolean', default: false})
    isSale: boolean
 
    @Column({type: 'boolean', default: false})
    isNew: boolean
 
    @Column({ type: "int", nullable: true })
    price: number
 
    @Column({ type: "int" })
    lastPrice: number
 
    @OneToOne(() => Menu, menu => menu.id)
    @JoinColumn({name: 'menu'})
    menu: Menu
 
    @OneToMany(() => Image, (image: Image) => image.id_product)
    images: Image[]

    @OneToMany(() => Size, (size: Size) => size.id_product)
    size: Size[]

    /*
    @Column()
    preco_unitario: number

    @Column()
    total_pontos_pr: number

    // Usuario.Vendedor que receberá pontos pela venda
    @ManyToOne(()=> Usuario, vendedor => vendedor.produto_recibos)
    @JoinColumn({name: 'vendedor'})
    vendedor: Usuario
    
    // Recibo pai
    @ManyToOne(()=> Recibo, recibo => recibo.produtos_recibo)
    @JoinColumn({name: 'recibo'})
    recibo: Recibo
    */

}