package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.PlaceAreaDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link io.github.jhipster.application.domain.PlaceArea}.
 */
public interface PlaceAreaService {

    /**
     * Save a placeArea.
     *
     * @param placeAreaDTO the entity to save.
     * @return the persisted entity.
     */
    PlaceAreaDTO save(PlaceAreaDTO placeAreaDTO);

    /**
     * Get all the placeAreas.
     *
     * @return the list of entities.
     */
    List<PlaceAreaDTO> findAll();


    /**
     * Get the "id" placeArea.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PlaceAreaDTO> findOne(Long id);

    /**
     * Delete the "id" placeArea.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
