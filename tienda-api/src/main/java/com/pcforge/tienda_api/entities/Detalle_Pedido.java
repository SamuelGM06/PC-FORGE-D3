package com.pcforge.tienda_api.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name = "detalle_pedido")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Detalle_Pedido {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id_detalle")
    private Integer id;

    @Column (name = "id_pedido")
    private Integer idPedido;

    @Column (name = "id_producto")
    private Integer idProducto;

    @Column (name = "cantidad")
    private int cantidad;

    @Column (name = "precio_unitario")
    private java.math.BigDecimal precioUnitario;
}
