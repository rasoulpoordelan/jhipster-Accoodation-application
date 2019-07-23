package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.service.PlaceServiceService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.service.dto.PlaceServiceDTO;

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
 * REST controller for managing {@link io.github.jhipster.application.domain.PlaceService}.
 */
@RestController
@RequestMapping("/api")
public class PlaceServiceResource {

    private final Logger log = LoggerFactory.getLogger(PlaceServiceResource.class);

    private static final String ENTITY_NAME = "placeService";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlaceServiceService placeServiceService;

    public PlaceServiceResource(PlaceServiceService placeServiceService) {
        this.placeServiceService = placeServiceService;
    }

    /**
     * {@code POST  /place-services} : Create a new placeService.
     *
     * @param placeServiceDTO the placeServiceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new placeServiceDTO, or with status {@code 400 (Bad Request)} if the placeService has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/place-services")
    public ResponseEntity<PlaceServiceDTO> createPlaceService(@RequestBody PlaceServiceDTO placeServiceDTO) throws URISyntaxException {
        log.debug("REST request to save PlaceService : {}", placeServiceDTO);
        if (placeServiceDTO.getId() != null) {
            throw new BadRequestAlertException("A new placeService cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlaceServiceDTO result = placeServiceService.save(placeServiceDTO);
        return ResponseEntity.created(new URI("/api/place-services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /place-services} : Updates an existing placeService.
     *
     * @param placeServiceDTO the placeServiceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated placeServiceDTO,
     * or with status {@code 400 (Bad Request)} if the placeServiceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the placeServiceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/place-services")
    public ResponseEntity<PlaceServiceDTO> updatePlaceService(@RequestBody PlaceServiceDTO placeServiceDTO) throws URISyntaxException {
        log.debug("REST request to update PlaceService : {}", placeServiceDTO);
        if (placeServiceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlaceServiceDTO result = placeServiceService.save(placeServiceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, placeServiceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /place-services} : get all the placeServices.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of placeServices in body.
     */
    @GetMapping("/place-services")
    public List<PlaceServiceDTO> getAllPlaceServices() {
        log.debug("REST request to get all PlaceServices");
        return placeServiceService.findAll();
    }

    /**
     * {@code GET  /place-services/:id} : get the "id" placeService.
     *
     * @param id the id of the placeServiceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the placeServiceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/place-services/{id}")
    public ResponseEntity<PlaceServiceDTO> getPlaceService(@PathVariable Long id) {
        log.debug("REST request to get PlaceService : {}", id);
        Optional<PlaceServiceDTO> placeServiceDTO = placeServiceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(placeServiceDTO);
    }

    /**
     * {@code DELETE  /place-services/:id} : delete the "id" placeService.
     *
     * @param id the id of the placeServiceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/place-services/{id}")
    public ResponseEntity<Void> deletePlaceService(@PathVariable Long id) {
        log.debug("REST request to delete PlaceService : {}", id);
        placeServiceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
