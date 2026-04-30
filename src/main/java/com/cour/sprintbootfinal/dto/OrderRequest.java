package com.cour.sprintbootfinal.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class OrderRequest {

    @NotNull
    private Long productId;

    @NotNull
    @Positive
    private Integer quantite;

    public OrderRequest() {}

    public OrderRequest(Long productId, Integer quantite) {
        this.productId = productId;
        this.quantite = quantite;
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
}
