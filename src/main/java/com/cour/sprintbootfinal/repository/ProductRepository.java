package com.cour.sprintbootfinal.repository;

import com.cour.sprintbootfinal.entity.Categorie;
import com.cour.sprintbootfinal.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    List<Product> findByCategory(Categorie category);

    @Query(value = "SELECT * FROM products p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "(p.category_id IS NOT NULL AND LOWER((SELECT c.name FROM categories c WHERE c.id = p.category_id)) LIKE LOWER(CONCAT('%', :keyword, '%')))",
           countQuery = "SELECT count(*) FROM products p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "(p.category_id IS NOT NULL AND LOWER((SELECT c.name FROM categories c WHERE c.id = p.category_id)) LIKE LOWER(CONCAT('%', :keyword, '%')))",
           nativeQuery = true)
    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
