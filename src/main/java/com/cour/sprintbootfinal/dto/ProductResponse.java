package com.cour.sprintbootfinal.dto;

public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private String categoryName;
    private Long categoryId;
    private Integer stockQuantity;
    private String lienImage;

    public ProductResponse() {}

    public ProductResponse(Long id, String name, String description, Double price,
                           String categoryName, Long categoryId, Integer stockQuantity, String lienImage) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryName = categoryName;
        this.categoryId = categoryId;
        this.stockQuantity = stockQuantity;
        this.lienImage = lienImage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getLienImage() {
        return lienImage;
    }

    public void setLienImage(String lienImage) {
        this.lienImage = lienImage;
    }
}
