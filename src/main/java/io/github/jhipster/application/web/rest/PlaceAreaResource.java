package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.service.PlaceAreaService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.service.dto.PlaceAreaDTO;

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
 * REST controller for managing {@link io.github.jhipster.application.domain.PlaceArea}.
 */
@RestController
@RequestMapping("/api")
public class PlaceAreaResource {

    private final Logger log = LoggerFactory.getLogger(PlaceAreaResource.class);

    private static final String ENTITY_NAME = "placeArea";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlaceAreaService placeAreaService;

    public PlaceAreaResource(PlaceAreaService placeAreaService) {
        this.placeAreaService = placeAreaService;
    }

    /**
     * {@code POST  /place-areas} : Create a new placeArea.
     *
     * @param placeAreaDTO the placeAreaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new placeAreaDTO, or with status {@code 400 (Bad Request)} if the placeArea has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/place-areas")
    public ResponseEntity<PlaceAreaDTO> createPlaceArea(@RequestBody PlaceAreaDTO placeAreaDTO) throws URISyntaxException {
        log.debug("REST request to save PlaceArea : {}", placeAreaDTO);
        if (placeAreaDTO.getId() != null) {
            throw new BadRequestAlertException("A new placeArea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlaceAreaDTO result = placeAreaService.save(placeAreaDTO);
        return ResponseEntity.created(new URI("/api/place-areas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /place-areas} : Updates an existing placeArea.
     *
     * @param placeAreaDTO the placeAreaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated placeAreaDTO,
     * or with status {@code 400 (Bad Request)} if the placeAreaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the placeAreaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/place-areas")
    public ResponseEntity<PlaceAreaDTO> updatePlaceArea(@RequestBody PlaceAreaDTO placeAreaDTO) throws URISyntaxException {
        log.debug("REST request to update PlaceArea : {}", placeAreaDTO);
        if (placeAreaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlaceAreaDTO result = placeAreaService.save(placeAreaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, placeAreaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /place-areas} : get all the placeAreas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of placeAreas in body.
     */
    @GetMapping("/place-areas")
    public List<PlaceAreaDTO> getAllPlaceAreas() {
        log.debug("REST request to get all PlaceAreas");
        return placeAreaService.findAll();
    }

    /**
     * {@code GET  /place-areas/:id} : get the "id" placeArea.
     *
     * @param id the id of the placeAreaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the placeAreaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/place-areas/{id}")
    public ResponseEntity<PlaceAreaDTO> getPlaceArea(@PathVariable Long id) {
        log.debug("REST request to get PlaceArea : {}", id);
        Optional<PlaceAreaDTO> placeAreaDTO = placeAreaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(placeAreaDTO);
    }

    /**
     * {@code DELETE  /place-areas/:id} : delete the "id" placeArea.
     *
     * @param id the id of the placeAreaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/place-areas/{id}")
    public ResponseEntity<Void> deletePlaceArea(@PathVariable Long id) {
        log.debug("REST request to delete PlaceArea : {}", id);
        placeAreaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
