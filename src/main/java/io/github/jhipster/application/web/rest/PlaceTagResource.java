package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.service.PlaceTagService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.service.dto.PlaceTagDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.application.domain.PlaceTag}.
 */
@RestController
@RequestMapping("/api")
public class PlaceTagResource {

    private final Logger log = LoggerFactory.getLogger(PlaceTagResource.class);

    private static final String ENTITY_NAME = "placeTag";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlaceTagService placeTagService;

    public PlaceTagResource(PlaceTagService placeTagService) {
        this.placeTagService = placeTagService;
    }

    /**
     * {@code POST  /place-tags} : Create a new placeTag.
     *
     * @param placeTagDTO the placeTagDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new placeTagDTO, or with status {@code 400 (Bad Request)} if the placeTag has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/place-tags")
    public ResponseEntity<PlaceTagDTO> createPlaceTag(@RequestBody PlaceTagDTO placeTagDTO) throws URISyntaxException {
        log.debug("REST request to save PlaceTag : {}", placeTagDTO);
        if (placeTagDTO.getId() != null) {
            throw new BadRequestAlertException("A new placeTag cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlaceTagDTO result = placeTagService.save(placeTagDTO);
        return ResponseEntity.created(new URI("/api/place-tags/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /place-tags} : Updates an existing placeTag.
     *
     * @param placeTagDTO the placeTagDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated placeTagDTO,
     * or with status {@code 400 (Bad Request)} if the placeTagDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the placeTagDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/place-tags")
    public ResponseEntity<PlaceTagDTO> updatePlaceTag(@RequestBody PlaceTagDTO placeTagDTO) throws URISyntaxException {
        log.debug("REST request to update PlaceTag : {}", placeTagDTO);
        if (placeTagDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlaceTagDTO result = placeTagService.save(placeTagDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, placeTagDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /place-tags} : get all the placeTags.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of placeTags in body.
     */
    @GetMapping("/place-tags")
    public ResponseEntity<List<PlaceTagDTO>> getAllPlaceTags(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of PlaceTags");
        Page<PlaceTagDTO> page = placeTagService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /place-tags/:id} : get the "id" placeTag.
     *
     * @param id the id of the placeTagDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the placeTagDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/place-tags/{id}")
    public ResponseEntity<PlaceTagDTO> getPlaceTag(@PathVariable Long id) {
        log.debug("REST request to get PlaceTag : {}", id);
        Optional<PlaceTagDTO> placeTagDTO = placeTagService.findOne(id);
        return ResponseUtil.wrapOrNotFound(placeTagDTO);
    }

    /**
     * {@code DELETE  /place-tags/:id} : delete the "id" placeTag.
     *
     * @param id the id of the placeTagDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/place-tags/{id}")
    public ResponseEntity<Void> deletePlaceTag(@PathVariable Long id) {
        log.debug("REST request to delete PlaceTag : {}", id);
        placeTagService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
