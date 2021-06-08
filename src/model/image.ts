import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,  } from "typeorm";
import Product from "./product";

@Entity('product_image', {
    orderBy: {
        id: 'ASC'
    }
})
export default class Image {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: "varchar", length: 500, nullable: true })
    url: string

    @Column({ type: "int", nullable: true })
    ordenation: string

    @ManyToOne(() => Product, (product: Product) => product.id)
    @JoinColumn({name: 'id_product'})
    id_product: Product;

}