package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.PlaceTypeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link io.github.jhipster.application.domain.PlaceType}.
 */
public interface PlaceTypeService {

    /**
     * Save a placeType.
     *
     * @param placeTypeDTO the entity to save.
     * @return the persisted entity.
     */
    PlaceTypeDTO save(PlaceTypeDTO placeTypeDTO);

    /**
     * Get all the placeTypes.
     *
     * @return the list of entities.
     */
    List<PlaceTypeDTO> findAll();


    /**
     * Get the "id" placeType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PlaceTypeDTO> findOne(Long id);

    /**
     * Delete the "id" placeType.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
