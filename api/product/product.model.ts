import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    handle: string;

    @Column("text")
    title: string;

    @Column("text")
    description: string;

    @Column("bigint")
    sku: number;

    @Column("double")
    grams: number;

    @Column("int")
    stock: number;

    @Column("int")
    price: number;

    @Column("int")
    compare_price: number;

    @Column("bigint")
    barcode: number;

}