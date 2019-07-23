package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.PlaceType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PlaceType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlaceTypeRepository extends JpaRepository<PlaceType, Long> {

}
