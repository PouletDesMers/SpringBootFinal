package com.cour.sprintbootfinal.dto;

import com.cour.sprintbootfinal.entity.OrderStatus;

import java.time.LocalDateTime;

public class OrderResponse {

    private Long id;
    private String username;
    private LocalDateTime orderDate;
    private Double totalAmount;
    private OrderStatus status;
    private String productName;
    private Long productId;
    private Integer quantite;
    private Double productPrice;

    public OrderResponse() {}

    public OrderResponse(Long id, String username, LocalDateTime orderDate, Double totalAmount,
                         OrderStatus status, String productName, Long productId, Integer quantite, Double productPrice) {
        this.id = id;
        this.username = username;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.productName = productName;
        this.productId = productId;
        this.quantite = quantite;
        this.productPrice = productPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Double productPrice) {
        this.productPrice = productPrice;
    }
}
