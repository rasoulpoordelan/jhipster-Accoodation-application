package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.service.PlaceCategoryService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.service.dto.PlaceCategoryDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.application.domain.PlaceCategory}.
 */
@RestController
@RequestMapping("/api")
public class PlaceCategoryResource {

    private final Logger log = LoggerFactory.getLogger(PlaceCategoryResource.class);

    private static final String ENTITY_NAME = "placeCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlaceCategoryService placeCategoryService;

    public PlaceCategoryResource(PlaceCategoryService placeCategoryService) {
        this.placeCategoryService = placeCategoryService;
    }

    /**
     * {@code POST  /place-categories} : Create a new placeCategory.
     *
     * @param placeCategoryDTO the placeCategoryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new placeCategoryDTO, or with status {@code 400 (Bad Request)} if the placeCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/place-categories")
    public ResponseEntity<PlaceCategoryDTO> createPlaceCategory(@RequestBody PlaceCategoryDTO placeCategoryDTO) throws URISyntaxException {
        log.debug("REST request to save PlaceCategory : {}", placeCategoryDTO);
        if (placeCategoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new placeCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlaceCategoryDTO result = placeCategoryService.save(placeCategoryDTO);
        return ResponseEntity.created(new URI("/api/place-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /place-categories} : Updates an existing placeCategory.
     *
     * @param placeCategoryDTO the placeCategoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated placeCategoryDTO,
     * or with status {@code 400 (Bad Request)} if the placeCategoryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the placeCategoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/place-categories")
    public ResponseEntity<PlaceCategoryDTO> updatePlaceCategory(@RequestBody PlaceCategoryDTO placeCategoryDTO) throws URISyntaxException {
        log.debug("REST request to update PlaceCategory : {}", placeCategoryDTO);
        if (placeCategoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlaceCategoryDTO result = placeCategoryService.save(placeCategoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, placeCategoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /place-categories} : get all the placeCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of placeCategories in body.
     */
    @GetMapping("/place-categories")
    public List<PlaceCategoryDTO> getAllPlaceCategories() {
        log.debug("REST request to get all PlaceCategories");
        return placeCategoryService.findAll();
    }

    /**
     * {@code GET  /place-categories/:id} : get the "id" placeCategory.
     *
     * @param id the id of the placeCategoryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the placeCategoryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/place-categories/{id}")
    public ResponseEntity<PlaceCategoryDTO> getPlaceCategory(@PathVariable Long id) {
        log.debug("REST request to get PlaceCategory : {}", id);
        Optional<PlaceCategoryDTO> placeCategoryDTO = placeCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(placeCategoryDTO);
    }

    /**
     * {@code DELETE  /place-categories/:id} : delete the "id" placeCategory.
     *
     * @param id the id of the placeCategoryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/place-categories/{id}")
    public ResponseEntity<Void> deletePlaceCategory(@PathVariable Long id) {
        log.debug("REST request to delete PlaceCategory : {}", id);
        placeCategoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
