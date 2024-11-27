import { Pedido } from "src/modules/pedido/entities/pedido.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";
//import { Categoria } from "src/modules/categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PedidoProducto } from "../../pedido/entities/pedidoproducto.entity";

@Entity('productos')

export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar', length:250})
    nombre:string;

    @Column({type:'decimal',precision:10,scale:2})
    precio:number;

    @Column({type:'int'})
    stock:number;

    @Column({type:'varchar', length:250, nullable:true})
    image:string;

    @Column()
    descripción:string;

    @Column()
    estado:boolean;

    @ManyToOne(()=>Categoria, (cat)=>cat.producto)
    categoria:Categoria;

    @OneToMany(()=>PedidoProducto,pedprod=>pedprod.producto )
    pedidoProducto: PedidoProducto[];

}
