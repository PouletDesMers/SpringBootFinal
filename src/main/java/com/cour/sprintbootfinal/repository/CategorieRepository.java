package com.cour.sprintbootfinal.repository;

import com.cour.sprintbootfinal.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategorieRepository extends JpaRepository<Categorie, Long> {

    Optional<Categorie> findByName(String name);

    boolean existsByName(String name);
}
