package com.pcforge.tienda_api.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.pcforge.tienda_api.dtos.ProductoDTO;
import com.pcforge.tienda_api.entities.Producto;
import com.pcforge.tienda_api.models.ProductoResponseModel;

@Component
public class ProductoMapper {
    public ProductoDTO toProductoDTO(Producto producto) {
        if (producto == null) {
            return null;
        }

        return new ProductoDTO(
            producto.getId(),
            producto.getNombre(),
            producto.getDescripcion(),
            producto.getCategoria(),
            producto.getPrecio(),
            producto.getStock(),
            producto.getImagen()
        );
    }

    public List<ProductoDTO> toProductoDTOList(List<Producto> productos) {
        if (productos == null) {
            return null;
        }

        return productos.stream()
            .map(this::toProductoDTO)
            .collect(Collectors.toList());
    }
    
    public ProductoResponseModel toProductoResponseModel(ProductoDTO productoDTO) {
        if (productoDTO == null) {
            return null;
        }

        return new ProductoResponseModel(
            productoDTO.idProducto(),
            productoDTO.nombre(),
            productoDTO.descripcion(),
            productoDTO.categoria(),
            productoDTO.precio(),
            productoDTO.stock(),
            productoDTO.imagen()
        );
    }

    public List<ProductoResponseModel> toProductoResponseModelList(List<ProductoDTO> productoDTOS) {
        if (productoDTOS == null) {
            return null;
        }

        return productoDTOS.stream()
            .map(this::toProductoResponseModel)
            .collect(Collectors.toList());
    }
}
