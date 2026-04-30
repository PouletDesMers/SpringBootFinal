package com.cour.sprintbootfinal.service;

import com.cour.sprintbootfinal.dto.ProductRequest;
import com.cour.sprintbootfinal.dto.ProductResponse;
import com.cour.sprintbootfinal.entity.Categorie;
import com.cour.sprintbootfinal.entity.Product;
import com.cour.sprintbootfinal.repository.CategorieRepository;
import com.cour.sprintbootfinal.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategorieRepository categorieRepository;

    public ProductService(ProductRepository productRepository, CategorieRepository categorieRepository) {
        this.productRepository = productRepository;
        this.categorieRepository = categorieRepository;
    }

    public Page<ProductResponse> getAllProducts(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return productRepository.findAll(pageable)
                .map(this::toProductResponse);
    }

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'id: " + id));
        return toProductResponse(product);
    }

    public Page<ProductResponse> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.searchByKeyword(keyword, pageable)
                .map(this::toProductResponse);
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setLienImage(request.getLienImage());

        if (request.getCategoryId() != null) {
            Categorie category = categorieRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Catégorie non trouvée avec l'id: " + request.getCategoryId()));
            product.setCategory(category);
        }

        product = productRepository.save(product);
        return toProductResponse(product);
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'id: " + id));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setLienImage(request.getLienImage());

        if (request.getCategoryId() != null) {
            Categorie category = categorieRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Catégorie non trouvée avec l'id: " + request.getCategoryId()));
            product.setCategory(category);
        }

        product = productRepository.save(product);
        return toProductResponse(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Produit non trouvé avec l'id: " + id);
        }
        productRepository.deleteById(id);
    }

    public List<ProductResponse> getAllProductsByCategory(Long categoryId) {
        Categorie category = categorieRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Catégorie non trouvée"));
        return productRepository.findByCategory(category)
                .stream()
                .map(this::toProductResponse)
                .collect(Collectors.toList());
    }

    // ===== GESTION DES CATEGORIES =====

    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    @Transactional
    public Categorie createCategory(String name) {
        if (categorieRepository.existsByName(name)) {
            throw new RuntimeException("Cette catégorie existe déjà");
        }
        return categorieRepository.save(new Categorie(name));
    }

    @Transactional
    public void deleteCategory(Long id) {
        Categorie categorie = categorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Catégorie non trouvée"));
        // Détacher les produits de cette catégorie
        List<Product> products = productRepository.findByCategory(categorie);
        for (Product p : products) {
            p.setCategory(null);
            productRepository.save(p);
        }
        categorieRepository.deleteById(id);
    }

    private ProductResponse toProductResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getCategory() != null ? product.getCategory().getName() : null,
                product.getCategory() != null ? product.getCategory().getId() : null,
                product.getStockQuantity(),
                product.getLienImage()
        );
    }
}
