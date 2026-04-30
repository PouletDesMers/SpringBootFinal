package com.cour.sprintbootfinal.service;

import com.cour.sprintbootfinal.dto.OrderRequest;
import com.cour.sprintbootfinal.dto.OrderResponse;
import com.cour.sprintbootfinal.entity.Order;
import com.cour.sprintbootfinal.entity.Product;
import com.cour.sprintbootfinal.entity.User;
import com.cour.sprintbootfinal.repository.OrderRepository;
import com.cour.sprintbootfinal.repository.ProductRepository;
import com.cour.sprintbootfinal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public OrderResponse createOrder(String username, OrderRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'id: " + request.getProductId()));

        if (product.getStockQuantity() < request.getQuantite()) {
            throw new RuntimeException("Stock insuffisant. Stock disponible: " + product.getStockQuantity());
        }

        // Calculer le montant total
        double totalAmount = product.getPrice() * request.getQuantite();

        // Créer la commande
        Order order = new Order(user, totalAmount, product, request.getQuantite());

        // Mettre à jour le stock
        product.setStockQuantity(product.getStockQuantity() - request.getQuantite());
        productRepository.save(product);

        order = orderRepository.save(order);
        return toOrderResponse(order);
    }

    public List<OrderResponse> getMyOrders(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        return orderRepository.findByUserOrderByOrderDateDesc(user)
                .stream()
                .map(this::toOrderResponse)
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc()
                .stream()
                .map(this::toOrderResponse)
                .collect(Collectors.toList());
    }

    private OrderResponse toOrderResponse(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getUser().getUsername(),
                order.getOrderDate(),
                order.getTotalAmount(),
                order.getStatus(),
                order.getProduit().getName(),
                order.getProduit().getId(),
                order.getQuantite(),
                order.getProduit().getPrice()
        );
    }
}
