package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.PlaceTag;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PlaceTag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlaceTagRepository extends JpaRepository<PlaceTag, Long> {

}
