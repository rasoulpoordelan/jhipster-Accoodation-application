package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.PlaceTagDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link io.github.jhipster.application.domain.PlaceTag}.
 */
public interface PlaceTagService {

    /**
     * Save a placeTag.
     *
     * @param placeTagDTO the entity to save.
     * @return the persisted entity.
     */
    PlaceTagDTO save(PlaceTagDTO placeTagDTO);

    /**
     * Get all the placeTags.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PlaceTagDTO> findAll(Pageable pageable);


    /**
     * Get the "id" placeTag.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PlaceTagDTO> findOne(Long id);

    /**
     * Delete the "id" placeTag.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
