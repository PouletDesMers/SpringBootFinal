package com.cour.sprintbootfinal.controller;

import com.cour.sprintbootfinal.dto.OrderRequest;
import com.cour.sprintbootfinal.dto.OrderResponse;
import com.cour.sprintbootfinal.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(Authentication authentication,
                                          @Valid @RequestBody OrderRequest request) {
        try {
            String username = authentication.getName();
            OrderResponse response = orderService.createOrder(username, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderResponse>> getMyOrders(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(orderService.getMyOrders(username));
    }
}
