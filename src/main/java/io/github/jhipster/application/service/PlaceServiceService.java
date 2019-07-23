package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.PlaceServiceDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link io.github.jhipster.application.domain.PlaceService}.
 */
public interface PlaceServiceService {

    /**
     * Save a placeService.
     *
     * @param placeServiceDTO the entity to save.
     * @return the persisted entity.
     */
    PlaceServiceDTO save(PlaceServiceDTO placeServiceDTO);

    /**
     * Get all the placeServices.
     *
     * @return the list of entities.
     */
    List<PlaceServiceDTO> findAll();


    /**
     * Get the "id" placeService.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PlaceServiceDTO> findOne(Long id);

    /**
     * Delete the "id" placeService.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
