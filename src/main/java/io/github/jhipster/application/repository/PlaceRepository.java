package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Place entity.
 */
@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {

    @Query(value = "select distinct place from Place place left join fetch place.placeAtts left join fetch place.places",
        countQuery = "select count(distinct place) from Place place")
    Page<Place> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct place from Place place left join fetch place.placeAtts left join fetch place.places")
    List<Place> findAllWithEagerRelationships();

    @Query("select place from Place place left join fetch place.placeAtts left join fetch place.places where place.id =:id")
    Optional<Place> findOneWithEagerRelationships(@Param("id") Long id);

}
