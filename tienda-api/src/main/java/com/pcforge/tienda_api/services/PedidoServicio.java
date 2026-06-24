package com.pcforge.tienda_api.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pcforge.tienda_api.dtos.Detalle_PedidoDTO;
import com.pcforge.tienda_api.dtos.PedidoCompletoDTO;
import com.pcforge.tienda_api.dtos.PedidoDTO;
import com.pcforge.tienda_api.dtos.PedidoRequestDTO;
import com.pcforge.tienda_api.entities.Pedido;
import com.pcforge.tienda_api.entities.Producto;
import com.pcforge.tienda_api.entities.Detalle_Pedido;
import com.pcforge.tienda_api.exceptions.ApiException;
import com.pcforge.tienda_api.mappers.Detalle_PedidoMapper;
import com.pcforge.tienda_api.mappers.PedidoMapper;
import com.pcforge.tienda_api.repositories.Detalle_PedidoRepository;
import com.pcforge.tienda_api.repositories.PedidoRepository;
import com.pcforge.tienda_api.repositories.ProductoRepository;

@Service
public class PedidoServicio implements IPedidoService {
    private static final String ESTADO_INICIAL = "Pendiente";
    private static final Set<String> ESTADOS_VALIDOS = Set.of("Pendiente", "Procesando", "Enviado", "Entregado", "Cancelado");

    private final PedidoRepository pedidoRepository;
    private final Detalle_PedidoRepository detallePedidoRepository;
    private final ProductoRepository productoRepository;
    private final IUsuarioService usuarioService;
    private final PedidoMapper pedidoMapper;
    private final Detalle_PedidoMapper detallePedidoMapper;

    public PedidoServicio(
        PedidoRepository pedidoRepository,
        Detalle_PedidoRepository detallePedidoRepository,
        ProductoRepository productoRepository,
        IUsuarioService usuarioService,
        PedidoMapper pedidoMapper,
        Detalle_PedidoMapper detallePedidoMapper
    ) {
        this.pedidoRepository = pedidoRepository;
        this.detallePedidoRepository = detallePedidoRepository;
        this.productoRepository = productoRepository;
        this.usuarioService = usuarioService;
        this.pedidoMapper = pedidoMapper;
        this.detallePedidoMapper = detallePedidoMapper;
    }

    @Override
    public List<PedidoDTO> listarPedidos() {
        return pedidoMapper.toPedidoDTOList(pedidoRepository.findAll());
    }

    @Override
    public List<PedidoDTO> listarPedidosPorUsuario(Integer idUsuario) {
        usuarioService.obtenerEntidad(idUsuario);
        return pedidoMapper.toPedidoDTOList(pedidoRepository.findByIdUsuario(idUsuario));
    }

    @Override
    public PedidoCompletoDTO obtenerPedido(Integer idPedido) {
        Pedido pedido = obtenerEntidad(idPedido);
        return toPedidoCompletoDTO(pedido);
    }

    @Override
    @Transactional
    public PedidoCompletoDTO crearPedido(PedidoRequestDTO request) {
        usuarioService.obtenerEntidad(request.getIdUsuario());

        Pedido pedido = Pedido.builder()
            .idUsuario(request.getIdUsuario())
            .fecha(LocalDate.now())
            .total(BigDecimal.ZERO)
            .estado(ESTADO_INICIAL)
            .build();

        Pedido pedidoGuardado = pedidoRepository.save(pedido);
        BigDecimal total = BigDecimal.ZERO;

        for (var detalleRequest : request.getDetalles()) {
            Producto producto = productoRepository.findById(detalleRequest.getIdProducto())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Producto no encontrado: " + detalleRequest.getIdProducto()));

            if (producto.getStock() < detalleRequest.getCantidad()) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "Stock insuficiente para el producto: " + producto.getNombre());
            }

            producto.setStock(producto.getStock() - detalleRequest.getCantidad());
            productoRepository.save(producto);

            Detalle_Pedido detalle = Detalle_Pedido.builder()
                .idPedido(pedidoGuardado.getId())
                .idProducto(producto.getId())
                .cantidad(detalleRequest.getCantidad())
                .precioUnitario(producto.getPrecio())
                .build();

            detallePedidoRepository.save(detalle);
            total = total.add(producto.getPrecio().multiply(BigDecimal.valueOf(detalleRequest.getCantidad())));
        }

        pedidoGuardado.setTotal(total);
        Pedido pedidoActualizado = pedidoRepository.save(pedidoGuardado);
        return toPedidoCompletoDTO(pedidoActualizado);
    }

    @Override
    public PedidoDTO actualizarEstado(Integer idPedido, String estado) {
        String estadoNormalizado = normalizarEstado(estado);
        Pedido pedido = obtenerEntidad(idPedido);
        pedido.setEstado(estadoNormalizado);
        return pedidoMapper.toPedidoDTO(pedidoRepository.save(pedido));
    }

    private Pedido obtenerEntidad(Integer idPedido) {
        return pedidoRepository.findById(idPedido)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Pedido no encontrado."));
    }

    private PedidoCompletoDTO toPedidoCompletoDTO(Pedido pedido) {
        List<Detalle_PedidoDTO> detalles = detallePedidoMapper.toDetalle_PedidoDTOList(
            detallePedidoRepository.findByIdPedido(pedido.getId())
        );

        return new PedidoCompletoDTO(
            pedido.getId(),
            pedido.getIdUsuario(),
            pedido.getFecha(),
            pedido.getTotal(),
            pedido.getEstado(),
            detalles
        );
    }

    private String normalizarEstado(String estado) {
        return ESTADOS_VALIDOS.stream()
            .filter(valor -> valor.equalsIgnoreCase(estado.trim()))
            .findFirst()
            .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Estado de pedido inválido."));
    }
}
