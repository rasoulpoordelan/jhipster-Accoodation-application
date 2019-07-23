package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.PlaceCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PlaceCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlaceCategoryRepository extends JpaRepository<PlaceCategory, Long> {

}
