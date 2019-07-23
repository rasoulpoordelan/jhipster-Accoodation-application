package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.service.PlaceTypeService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.service.dto.PlaceTypeDTO;

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
 * REST controller for managing {@link io.github.jhipster.application.domain.PlaceType}.
 */
@RestController
@RequestMapping("/api")
public class PlaceTypeResource {

    private final Logger log = LoggerFactory.getLogger(PlaceTypeResource.class);

    private static final String ENTITY_NAME = "placeType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlaceTypeService placeTypeService;

    public PlaceTypeResource(PlaceTypeService placeTypeService) {
        this.placeTypeService = placeTypeService;
    }

    /**
     * {@code POST  /place-types} : Create a new placeType.
     *
     * @param placeTypeDTO the placeTypeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new placeTypeDTO, or with status {@code 400 (Bad Request)} if the placeType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/place-types")
    public ResponseEntity<PlaceTypeDTO> createPlaceType(@RequestBody PlaceTypeDTO placeTypeDTO) throws URISyntaxException {
        log.debug("REST request to save PlaceType : {}", placeTypeDTO);
        if (placeTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new placeType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlaceTypeDTO result = placeTypeService.save(placeTypeDTO);
        return ResponseEntity.created(new URI("/api/place-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /place-types} : Updates an existing placeType.
     *
     * @param placeTypeDTO the placeTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated placeTypeDTO,
     * or with status {@code 400 (Bad Request)} if the placeTypeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the placeTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/place-types")
    public ResponseEntity<PlaceTypeDTO> updatePlaceType(@RequestBody PlaceTypeDTO placeTypeDTO) throws URISyntaxException {
        log.debug("REST request to update PlaceType : {}", placeTypeDTO);
        if (placeTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlaceTypeDTO result = placeTypeService.save(placeTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, placeTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /place-types} : get all the placeTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of placeTypes in body.
     */
    @GetMapping("/place-types")
    public List<PlaceTypeDTO> getAllPlaceTypes() {
        log.debug("REST request to get all PlaceTypes");
        return placeTypeService.findAll();
    }

    /**
     * {@code GET  /place-types/:id} : get the "id" placeType.
     *
     * @param id the id of the placeTypeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the placeTypeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/place-types/{id}")
    public ResponseEntity<PlaceTypeDTO> getPlaceType(@PathVariable Long id) {
        log.debug("REST request to get PlaceType : {}", id);
        Optional<PlaceTypeDTO> placeTypeDTO = placeTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(placeTypeDTO);
    }

    /**
     * {@code DELETE  /place-types/:id} : delete the "id" placeType.
     *
     * @param id the id of the placeTypeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/place-types/{id}")
    public ResponseEntity<Void> deletePlaceType(@PathVariable Long id) {
        log.debug("REST request to delete PlaceType : {}", id);
        placeTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
