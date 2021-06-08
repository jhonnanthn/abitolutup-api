import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,  } from "typeorm";
import Product from "./product";

@Entity('product_size', {
    orderBy: {
        id: 'ASC'
    }
})
export default class Size {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: "varchar", length: 2 })
    size: string

    @Column({ type: "boolean", default: false })
    available: boolean

    @ManyToOne(() => Product, (product: Product) => product.id)
    @JoinColumn({name: 'id_product'})
    id_product: Product;

}