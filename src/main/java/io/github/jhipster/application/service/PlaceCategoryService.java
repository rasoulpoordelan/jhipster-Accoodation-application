package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.PlaceCategoryDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link io.github.jhipster.application.domain.PlaceCategory}.
 */
public interface PlaceCategoryService {

    /**
     * Save a placeCategory.
     *
     * @param placeCategoryDTO the entity to save.
     * @return the persisted entity.
     */
    PlaceCategoryDTO save(PlaceCategoryDTO placeCategoryDTO);

    /**
     * Get all the placeCategories.
     *
     * @return the list of entities.
     */
    List<PlaceCategoryDTO> findAll();


    /**
     * Get the "id" placeCategory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PlaceCategoryDTO> findOne(Long id);

    /**
     * Delete the "id" placeCategory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
